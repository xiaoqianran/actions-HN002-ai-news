---
title: "Bringing Nunchaku 4-bit Diffusion Inference to Diffusers"
originalUrl: "https://huggingface.co/blog/nunchaku-diffusers"
date: "2026-07-23T23:37:15.406Z"
---

# Bringing Nunchaku 4-bit Diffusion Inference to Diffusers  
# 将 Nunchaku 4-bit 扩散推理引入 Diffusers

Large diffusion transformers can create stunning images (or even videos, audio snippets, and now text), but loading a modern text-to-image model in BF16 precision often requires 20-30 GB of VRAM, which puts these models out of reach of most consumer GPUs.  
大型扩散 Transformer 能够生成惊艳的图像（甚至视频、音频片段，如今还有文本），但以 BF16 精度加载现代文生图模型通常需要 20-30 GB 的显存，这使得大多数消费级 GPU 无法运行这些模型。

Quantization is a powerful solution to this problem, and Diffusers already integrates several quantization backends such as bitsandbytes, GGUF, torchao, and Quanto, which we covered in Exploring Quantization Backends in Diffusers.  
量化是解决此问题的有效方案，而 Diffusers 已集成多种量化后端，如 bitsandbytes、GGUF、torchao 和 Quanto（我们在《探索 Diffusers 中的量化后端》中已介绍过）。

Most of these backends are weight-only. This means that they store the weights in low precision and dequantize them back to high precision at compute time. This reduces memory usage significantly, but it usually does not make inference faster, and can even add a small latency overhead.  
这些后端大多仅对权重进行量化。这意味着它们在计算时将低精度存储的权重反量化为高精度。这显著减少了内存占用，但通常不会加速推理，甚至可能增加少量延迟开销。

SVDQuant, the quantization method behind the popular Nunchaku inference engine, takes a different approach. It runs the main transformer layers with 4-bit weights and activations (W4A4), reducing memory while also speeding up the denoising loop.  
流行的 Nunchaku 推理引擎背后的量化方法 SVDQuant 采用了不同思路。它以 4-bit 权重和激活（W4A4）运行主 Transformer 层，在减少内存的同时加速去噪循环。

The details are covered below, but until now, using these checkpoints required a separate inference library. With current Diffusers, loading a Nunchaku checkpoint is as simple as calling `from_pretrained()`, with no local CUDA compilation required thanks to the kernels package.  
细节将在下文介绍，但直到现在，使用这些检查点仍需单独的推理库。借助当前版本的 Diffusers，加载 Nunchaku 检查点只需调用 `from_pretrained()`，得益于 kernels 包，无需本地编译 CUDA 代码。

In addition, the companion `diffuse-compressor` toolkit lets you quantize new architectures yourself and publish them as regular Diffusers repositories.  
此外，配套的 `diffuse-compressor` 工具包允许您自行量化新架构，并将其作为常规 Diffusers 仓库发布。

## Table of Contents  
## 目录

## Getting started with Nunchaku Lite  
## 快速开始使用 Nunchaku Lite

First, install the requirements. You need a recent version of Diffusers and the Hugging Face kernels package:  
首先，安装依赖项。您需要最新版本的 Diffusers 和 Hugging Face kernels 包：

```bash
pip install -U diffusers transformers accelerate kernels bitsandbytes
```

Then load a pre-quantized pipeline like any other Diffusers model:  
然后像加载其他 Diffusers 模型一样加载预量化管道：

```python
import torch
from diffusers import ErnieImagePipeline

pipe = ErnieImagePipeline.from_pretrained(
    "lite-infer/ERNIE-Image-Turbo-nunchaku-lite-nvfp4_r32-bnb4-text-encoder",
    torch_dtype=torch.bfloat16,
).to("cuda")

image = pipe(
    prompt="A cinematic portrait of a red fox in a misty forest at sunrise, "
           "detailed fur, volumetric light",
    height=1024,
    width=1024,
    num_inference_steps=8,
    guidance_scale=1.0,
    generator=torch.Generator("cuda").manual_seed(42),
).images[0]

image.save("output.png")
```

No custom pipeline class or separate inference engine is needed, and there is nothing to compile locally. The NVFP4 kernels are downloaded from the Hub through the Nunchaku Lite kernels page the first time they are used.  
无需自定义管道类或单独的推理引擎，也无需本地编译。NVFP4 内核首次使用时将通过 Nunchaku Lite 内核页面从 Hub 自动下载。

This checkpoint pairs a Nunchaku NVFP4 transformer with a bitsandbytes NF4 text encoder, and generates a 1024x1024 image in about 1.7 seconds on an RTX 5090 with a peak memory usage of about 12 GB, compared with about 24 GB for the BF16 pipeline.  
该检查点将 Nunchaku NVFP4 Transformer 与 bitsandbytes NF4 文本编码器配对，在 RTX 5090 上生成 1024x1024 图像仅需约 1.7 秒，峰值显存占用约 12 GB，而 BF16 管道需约 24 GB。

You can find more details about the Nunchaku Lite checkpoint format in the official Diffusers documentation.  
您可以在官方 Diffusers 文档中找到关于 Nunchaku Lite 检查点格式的更多细节。

NVFP4 checkpoints require an NVIDIA Blackwell GPU (RTX 50 series, RTX PRO 6000, B200). For earlier generations, use the INT4 variants. See the hardware support table below for details.  
NVFP4 检查点需要 NVIDIA Blackwell GPU（RTX 50 系列、RTX PRO 6000、B200）。对于更早的世代，请使用 INT4 变体。硬件支持详情请参见下表。

## Background: SVDQuant and Nunchaku  
## 背景：SVDQuant 与 Nunchaku

SVDQuant is the quantization method behind Nunchaku, its reference CUDA inference engine.  
SVDQuant 是 Nunchaku 及其参考 CUDA 推理引擎背后的量化方法。

Standard 4-bit quantization is difficult for diffusion transformers because both weights and activations contain large outliers.  
标准 4-bit 量化对扩散 Transformer 而言很困难，因为权重和激活值都包含大量异常值。

SVDQuant handles this by moving activation outliers into the weights, representing the hardest part of each weight matrix with a small 16-bit low-rank branch, and quantizing the remaining residual to 4 bits.  
SVDQuant 通过将激活异常值移入权重来解决此问题：用一个小型的 16-bit 低秩分支表示每个权重矩阵中最难量化的部分，并将剩余残差量化为 4 bits。

Nunchaku makes this fast with fused kernels for the 4-bit path and the low-rank branch.  
Nunchaku 通过融合 4-bit 路径和低秩分支的内核来实现高速运行。

Nunchaku fuses the low-rank down projection with the quantization kernel and the low-rank up projection with the 4-bit compute kernel, eliminating the memory access overhead of the 16-bit branch.  
Nunchaku 将低秩下投影与量化内核融合，并将低秩上投影与 4-bit 计算内核融合，从而消除了 16-bit 分支的内存访问开销。

*Figure from the SVDQuant paper.*  
*（图片来自 SVDQuant 论文）*

## Introducing Nunchaku Lite  
## 介绍 Nunchaku Lite

The original Nunchaku engine gets much of its speed from model-specific fused execution paths, such as fused QKV projections and fused GELU/MLP kernels.  
原始 Nunchaku 引擎的速度很大程度上来自模型特定的融合执行路径，如融合 QKV 投影和融合 GELU/MLP 内核。

Those optimizations are tied to each architecture's module layout and checkpoint format, so supporting a new model family usually requires model-specific integration work.  
这些优化与每种架构的模块布局和检查点格式紧密相关，因此支持新模型族通常需要针对模型进行集成工作。

Nunchaku Lite is the new integration path in Diffusers. With it, Diffusers can load Nunchaku-style checkpoints without a custom pipeline or a separate inference engine.  
Nunchaku Lite 是 Diffusers 中的新集成路径。借助它，Diffusers 无需自定义管道或单独的推理引擎即可加载 Nunchaku 风格的检查点。

Under the hood, Nunchaku Lite patches the relevant `nn.Linear` modules of a stock Diffusers model with runtime SVDQ/AWQ linear layers before the checkpoint is loaded.  
在底层，Nunchaku Lite 在加载检查点前，用运行时的 SVDQ/AWQ 线性层修补标准 Diffusers 模型中相关的 `nn.Linear` 模块。

The CUDA kernels come from the Hub through the kernels package.  
CUDA 内核通过 kernels 包从 Hub 获取。

Two kernel families are used:  
使用两类内核家族：

- `svdq_w4a4`: 4-bit weights and activations with the SVDQuant low-rank correction. This layer is used for the transformer's attention and MLP projections, where nearly all of the compute is spent, and is available in INT4 and NVFP4 variants.  
  `svdq_w4a4`：带 SVDQuant 低秩修正的 4-bit 权重和激活。该层用于 Transformer 的注意力机制和 MLP 投影（几乎所有计算都集中于此），提供 INT4 和 NVFP4 变体。

- `awq_w4a16`: 4-bit weights with 16-bit activations, used for adaptive normalization and modulation projections such as FLUX `adanorm_single`/`adanorm_zero` or Qwen-Image modulation layers. These layers are memory-bound and precision-sensitive, making AWQ a good fit to preserve precision while still saving memory and space.  
  `awq_w4a16`：4-bit 权重配 16-bit 激活，用于自适应归一化和调制投影（如 FLUX 的 `adanorm_single`/`adanorm_zero` 或 Qwen-Image 调制层）。这些层受内存限制且对精度敏感，使 AWQ 成为在节省内存和空间的同时保持精度的理想选择。

The trade-off is that, without architecture-specific fused kernels and modules, Nunchaku Lite cannot match the speedup of the original Nunchaku engine. However, the bare-bones implementation still delivers around 30% speedup while retaining the same level of VRAM reduction.  
代价是，由于缺乏架构特定的融合内核和模块，Nunchaku Lite 无法达到原始 Nunchaku 引擎的加速效果。然而，这种基础实现仍能提供约 30% 的加速，同时保持相同的显存缩减水平。

## Native loading in Diffusers  
## 在 Diffusers 中原生加载

If you have used bitsandbytes or torchao in Diffusers, the mechanics will feel familiar.  
如果您在 Diffusers 中使用过 bitsandbytes 或 torchao，其机制会感觉很熟悉。

A Nunchaku Lite model repository is an ordinary Diffusers repository with a few extra files.  
Nunchaku Lite 模型仓库是一个带有几个额外文件的普通 Diffusers 仓库。

The `model_index.json` file points to a `transformer` subfolder that contains the Nunchaku-quantized checkpoint.  
`model_index.json` 文件指向包含 Nunchaku 量化检查点的 `transformer` 子文件夹。

The `transformer` folder contains the quantized model weights in the `nunchaku` format, along with a `config.json` that specifies the quantization configuration (e.g., `"quantization_method": "svdq"`).  
`transformer` 文件夹包含 `nunchaku` 格式的量化模型权重，以及指定量化配置（如 `"quantization_method": "svdq"`）的 `config.json`。

When you call `from_pretrained()`, Diffusers:  
当您调用 `from_pretrained()` 时，Diffusers 会：

1. Load the base model architecture from the `model_index.json` (e.g., `ErnieImagePipeline`).  
   从 `model_index.json` 加载基础模型架构（例如 `ErnieImagePipeline`）。

2. Patch the `nn.Linear` layers in the transformer with the appropriate SVDQ/AWQ layers based on the `config.json`.  
   根据 `config.json` 用适当的 SVDQ/AWQ 层修补 Transformer 中的 `nn.Linear` 层。

3. Load the quantized weights from the `nunchaku` folder.  
   从 `nunchaku` 文件夹加载量化权重。

4. Download and load the required CUDA kernels from the Hugging Face Hub via the `kernels` package.  
   通过 `kernels` 包从 Hugging Face Hub 下载并加载所需的 CUDA 内核。

That's it—no custom code, no compilation.  
就是这样——无需自定义代码，无需编译。

## Getting more speed and lower memory  
## 获取更高速度和更低内存

For maximum speed, use the NVFP4 variant on supported hardware (NVIDIA Blackwell GPUs).  
为获得最高速度，请在支持的硬件（NVIDIA Blackwell GPU）上使用 NVFP4 变体。

For older GPUs, the INT4 variant provides similar memory savings with slightly lower speed.  
对于旧款 GPU，INT4 变体提供类似的显存节省，但速度略低。

You can also try lowering `num_inference_steps` or using a smaller `height`/`width` if you need even faster generation.  
如果您需要更快的生成速度，还可以尝试减少 `num_inference_steps` 或使用更小的 `height`/`width`。

## Benchmarks  
## 基准测试

| Model | GPU | Precision | VRAM | Time (s) |
|-------|-----|-----------|------|----------|
| ERNIE-Image-Turbo (BF16) | RTX 5090 | BF16 | ~24 GB | ~5.2 |
| ERNIE-Image-Turbo (Nunchaku Lite NVFP4) | RTX 5090 | NVFP4 | ~12 GB | ~1.7 |
| ERNIE-Image-Turbo (Nunchaku Lite INT4) | RTX 4090 | INT4 | ~13 GB | ~2.1 |

*Benchmarks run with `num_inference_steps=8`, `guidance_scale=1.0`, 1024x1024 resolution.*  
*基准测试条件：`num_inference_steps=8`，`guidance_scale=1.0`，1024x1024 分辨率。*

## Quantizing your own model  
## 量化您自己的模型

Use the `diffuse-compressor` toolkit to quantize compatible diffusion models to Nunchaku Lite format.  
使用 `diffuse-compressor` 工具包将兼容的扩散模型量化为 Nunchaku Lite 格式。

Basic usage:  
基本用法：

```bash
diffuse-compressor quantize \
  --model "runwayml/stable-diffusion-v1-5" \
  --output "my-nunchaku-lite-sd15" \
  --bits 4 \
  --group_size 32 \
  --format nunchaku-lite
```

See the `diffuse-compressor` documentation for advanced options (e.g., calibration data, different quantization methods).  
有关高级选项（如校准数据、不同量化方法），请参阅 `diffuse-compressor` 文档。

## Ready-to-use checkpoints  
## 即用型检查点

Several community-quantized Nunchaku Lite checkpoints are available on the Hugging Face Hub under the `lite-infer` organization:  
Hugging Face Hub 的 `lite-infer` 组织下提供了多个社区量化的 Nunchaku Lite 检查点：

- `lite-infer/ERNIE-Image-Turbo-nunchaku-lite-nvfp4_r32-bnb4-text-encoder`  
- `lite-infer/FLUX.1-dev-nunchaku-lite-int4`  
- `lite-infer/sd15-nunchaku-lite-int4`

## Conclusion  
## 结论

Nunchaku Lite brings the memory and speed benefits of 4-bit W4A4 quantization to Diffusers with zero integration friction.  
Nunchaku Lite 以零集成摩擦为 Diffusers 带来了 4-bit W4A4 量化的内存和速度优势。

By leveraging the `kernels` package and smart patching, it enables native loading of Nunchaku-style checkpoints while maintaining the familiar Diffusers API.  
通过利用 `kernels` 包和智能修补，它实现了 Nunchaku 风格检查点的原生加载，同时保持了熟悉的 Diffusers API。

This makes state-of-the-art efficient diffusion inference accessible to a much broader audience.  
这使得最先进的高效扩散推理能够惠及更广泛的用户群体。

## Acknowledgements  
## 致谢

Thanks to the Nunchaku team (Samsung SAIT) for developing SVDQuant and the original Nunchaku engine.  
感谢 Nunchaku 团队（三星 SAIT）开发了 SVDQuant 和原始 Nunchaku 引擎。

Thanks to the Hugging Face kernels team for building the high-performance CUDA kernels.  
感谢 Hugging Face kernels 团队构建的高性能 CUDA 内核。

Thanks to the Diffusers maintainers and community for the quantization backend integrations.  
感谢 Diffusers 维护者和社区对量化后端集成的贡献。