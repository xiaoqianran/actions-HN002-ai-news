---
title: "Linux kernel will support $ORIGIN, sort of"
originalUrl: "https://fzakaria.com/2026/07/20/linux-kernel-will-support-origin-sort-of"
date: "2026-07-21T22:58:35.437Z"
---

# Linux kernel will support $ORIGIN, sort of  
# Linux 内核将“某种程度”支持 $ORIGIN

---

For some reason, during TacoSprint 2026 I decided to see if we could tackle relocatable binaries in Nix. I enjoy these lofty goals to push Nix and the surrounding ecosystem forward. I am bold if not stupid.  
出于某种原因，在 TacoSprint 2026 期间，我决定看看我们能否在 Nix 中解决可重定位二进制文件的问题。我喜欢这些 lofty goals（宏伟目标），以推动 Nix 及周边生态系统的进步。我大胆，甚至有些鲁莽。

I left the last earlier post with one potential idea of how to get there: We could patch the Linux kernel so that $ORIGIN is supported in PT_INTERP and the shebang.  
我在上一篇帖子中留下了一个潜在思路：我们可以修补 Linux 内核，使 $ORIGIN 在 PT_INTERP 和 shebang（#!）中得到支持。

I waded through the complexity of sending patches over email (turns out I actually enjoy this workflow!), and sent a proposal to the Linux kernel mailing list.  
我艰难地走过了通过邮件发送补丁的复杂流程（结果发现我其实很享受这种工作流！），并向 Linux 内核邮件列表提交了一份提案。

My first attempt here proposed simply adding direct support for $ORIGIN in the Virtual File System (VFS) subsystem.  
我的首次尝试只是提议在虚拟文件系统（VFS）子系统中直接添加对 $ORIGIN 的支持。

I waited nervously. I was expecting the result from what I had come to read about online; someone non-politely telling me to F$#CK OFF because there is something I missed, misunderstood or did not consider. 🤬  
我紧张地等待着。我预期会看到网上常见的结果：有人不客气地让我“滚开”，因为我肯定遗漏、误解或未考虑到某些问题。🤬

The result was completely different. 😲 Christian Brauner, the maintainer for VFS responded to me in good faith, asking for the rationale for the change and eventually proposing some ways in which such a support could make it into the subsystem.  
结果完全不同。😲 VFS 的维护者 Christian Brauner 善意地回复了我，要求说明更改理由，并最终提出了一些让该支持进入子系统的可能方式。

Note It definitely helped having someone like John Ericson chime in and advocate why having a non-fixed interpreter (PT_INTERP) is useful to Nix and other use-cases (i.e. Buck & Bazel).  
注：有像 John Ericson 这样的人站出来，为非固定解释器（PT_INTERP）对 Nix 及其他用例（如 Buck 和 Bazel）的实用性辩护，确实很有帮助。

He offered that potentially we could leverage eBPF as a programmable way to select an interpreter through binfmt_misc.  
他提出，我们或许可以利用 eBPF 作为一种可编程方式，通过 binfmt_misc 来选择解释器。

Whoa! 🤯 I wanted to merely allow $ORIGIN but a programmable selection could let us do anything!  
哇！🤯 我原本只想允许 $ORIGIN，但可编程选择能让我们做任何事！

The idea must have really intrigued him because soon-after, on his vacation, Christian offered the first draft of such a solution.  
这个想法肯定深深吸引了他，因为不久后，在他休假期间，Christian 提供了该解决方案的初稿。

We went back and forth a little over the mailing list and the end result is a patch series that will make its way into -next branch in the near future.  
我们在邮件列表上反复讨论，最终结果是一系列补丁，将在不久后进入 -next 分支。

If you don’t know what eBPF is or binfmt_misc, WTF did we just collaborate on? Let’s take a look!  
如果你不知道 eBPF 或 binfmt_misc 是什么，我们刚才合作了个啥？来看看吧！

I won’t do eBPF justice, and there are plenty of articles online about it as it’s quite in-vogue at the moment. tl;dr;  
我不会深入讲解 eBPF（网上有很多相关文章，因为它现在很流行）。太长不看版：

You can write programs in a C subset that gets compiled to an instruction set whose virtual machine is running within the kernel.  
你可以用 C 子集编写程序，这些程序被编译成指令集，其虚拟机在内核中运行。

Shouldn’t the kernel be super fast? Yes, the programs are jitted to their native CPU architecture and the programs have a fixed-time slice.  
内核不该超快吗？是的，这些程序被即时编译（JIT）为原生 CPU 架构，且具有固定时间片。

Isn’t this some crazy vulnerability for the kernel? Before any代码 is loaded it is “verified” to be safe. Checkout this guide for more info.  
这不是内核的疯狂漏洞吗？在任何代码加载前，它会被“验证”为安全。查看此指南了解更多。

We can now support $ORIGIN with a relatively simple eBPF program:  
现在我们可以用一个相对简单的 eBPF 程序支持 $ORIGIN：

```c
SEC("struct_ops.s/match")
bool BPF_PROG(nix_match, struct linux_binprm *bprm) {
    return !bpf_strncmp(bprm->buf, 4, "\x7f" "ELF");
}

SEC("struct_ops.s/load")
int BPF_PROG(nix_load, struct linux_binprm *bprm) {
    char path[256];
    long n;
    n = bpf_path_d_path(&bprm->file->f_path, path, sizeof(path));
    if (n < 0) return n;
    /* derive the loader location from the binary's path */
    return bpf_binprm_set_interp(bprm, path, sizeof(path));
}

SEC(".struct_ops.link")
struct binfmt_misc_ops nix = {
    .match = (void *)nix_match,
    .load = (void *)nix_load,
    .name = "nix",
};
```

Once the above program is loaded and registered into the kernel, we then ask the binfmt_misc subsystem to trigger it. Checkout this thread if you want to see the complete example.  
一旦上述程序加载并注册到内核，我们就让 binfmt_misc 子系统触发它。想查看完整示例，请看此线程。

> bpftool struct_ops register nix_origin.bpf.o /sys/fs/bpf  
> echo ':origin:B::::nix:' > /proc/sys/fs/binfmt_misc/register

What does that mean? It means that every binary now triggers the nix_match function above, in this case any ELF file, but it could be executables with a new segment like PT_INTERP_NIX, and the kernel will ask nix_load to determine the interpreter to use dynamically.  
这意味着什么？这意味着现在每个二进制文件都会触发上面的 nix_match 函数（本例中是任何 ELF 文件），但也可以是带有新段（如 PT_INTERP_NIX）的可执行文件，内核会要求 nix_load 动态决定使用哪个解释器。

Our special BPF program has support for $ORIGIN 💥  
我们特殊的 BPF 程序支持 $ORIGIN 💥

What else could you do? Well we can now even completely replace the traditional QEMU binfmt_misc registration script with a BPF program now like this one.  
还能做什么？现在我们甚至可以用类似这样的 BPF 程序完全取代传统的 QEMU binfmt_misc 注册脚本。

What else can we do? Since we can now programmatically select our interpreter based on anything in the file, we can do quite a lot. I’m keen to hear your suggestions and ideas 💡.  
还能做什么？既然我们现在能基于文件中的任何内容以编程方式选择解释器，我们能做的就很多了。我很想听听你们的建议和想法 💡。

Some of the smaller items are that we can even support $ORIGIN in the shebangs (#!$ORIGIN/bin/ld.so) very easily as seen here: we simply look at the first 256 bytes of the file and look for $ORIGIN to trigger.  
一些较小的改进是，我们甚至能非常容易地在 shebangs（#!$ORIGIN/bin/ld.so）中支持 $ORIGIN，如此处所示：我们只需查看文件的前 256 字节，寻找 $ORIGIN 来触发。

One downside or side-effect of the traditional binfmt_misc hand-off was that the way in which the desired final binary was invoked was non-transparent.  
传统 binfmt_misc 交接的一个缺点或副作用是，最终期望的二进制文件的调用方式不透明。

The registered interpreter becomes the process. It owns the entire process identity, and the binary you actually asked to run gets demoted to an argument.  
注册的解释器成为进程。它拥有整个进程身份，而实际要运行的二进制文件被降级为参数。

For wine or qemu that’s acceptable as they are emulators but for a per-binary BPF loader that might pick a traditional ld.so it does not make much sense.  
对 wine 或 qemu 来说这可以接受，因为它们是模拟器，但一个可能选择传统 ld.so 的每二进制文件 BPF 加载器就说不通了。

This leaks in a few painful ways but the simplest are : argv[0] and /proc/<pid>/cmdline show the interpreter invocation, not what you executed. /proc/self/exe names the interpreter.  
这以几种痛苦的方式泄露信息，但最简单的例子是：argv[0] 和 /proc/<pid>/cmdline 显示的是解释器调用，而不是你执行的内容。/proc/self/exe 命名的是解释器。

Relocatable programs commonly locate themselves through /proc/self/exe, and instead they find the dynamic linker. 😩  
可重定位程序通常通过 /proc/self/exe 定位自身，而它们找到的却是动态链接器。😩

Christian sent a large patch series for this as well. His latest patch series adds two new dispatch modes that close the gap from opposite ends and covers a few other gotchas that these modes can fix.  
Christian 也为此发送了一大套补丁。他最新的补丁系列增加了两种新的分发模式，从两端弥合差距，并解决了这些模式能修复的其他一些陷阱。

The loader substitition L is the one I’m most excited about for Nix. With the L flag, the kernel executes the matched binary natively as the main image, and merely substitutes the registered interpreter for the loader named in the binary’s PT_INTERP.  
加载器替换 L 是我对 Nix 最兴奋的部分。使用 L 标志，内核原生执行匹配的二进制文件作为主镜像，仅将注册的解释器替换二进制文件 PT_INTERP 中命名的加载器。

binfmt_misc stops being a hand-off and becomes a plain PT_INTERP override. There’s no contract and no identity to reconstruct, so a stock dynamic loader works unchanged.  
binfmt_misc 不再是一种交接，而成为纯粹的 PT_INTERP 覆盖。没有契约，无需重建身份，因此原生动态加载器无需更改即可工作。

Where does this leaves us? I’ll be tracking the Linux kernel releases and, once this lands in -next and ships in a tagged release, I plan to upstream a NixOS module that registers the $ORIGIN support at boot. 🎉  
这让我们处于何地？我将跟踪 Linux 内核版本，一旦此功能进入 -next 并在标记版本中发布，我计划上游一个 NixOS 模块，在启动时注册 $ORIGIN 支持。🎉

The plan is to gate it on a new PT_INTERP_NIX segment rather than matching every ELF file. That keeps things backwards compatible: the BPF handler only kicks in for binaries that explicitly opt-in by c  
计划是将其限制在新的 PT_INTERP_NIX 段上，而不是匹配每个 ELF 文件。这保持了向后兼容性：BPF 处理程序仅对明确选择加入的二进制文件生效。