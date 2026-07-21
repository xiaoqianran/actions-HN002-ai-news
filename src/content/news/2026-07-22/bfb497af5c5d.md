---
title: "Are Your ML Experiments a Mess? Here’s the Fix"
originalUrl: "https://towardsdatascience.com/your-ml-experiments-are-a-mess-heres-the-fix/"
date: "2026-07-21T23:17:38.877Z"
---

# Are Your ML Experiments a Mess? Here’ss the Fix  
# 你的机器学习实验是否一团糟？这是解决方案  

---

Imagine you are building a new model. You get decent baseline results with a simple model, but try to improve performance with more advanced models. During development, your PM acquires some additional data that could prove useful, and can now revert to a simpler model. After extensive hyperparameter tuning, you consult your team and they advise you to optimize for a different performance metric. After you finally deliver a model, your stakeholder changes the direction of the project, requiring a complete overhaul.  
想象一下，你正在构建一个新模型。你用简单模型获得了不错的基线结果，但尝试用更高级的模型来提升性能。在开发过程中，你的产品经理获取了一些可能有用的额外数据，现在你可以回归到更简单的模型。经过广泛的超参数调优，你咨询了团队，他们建议你针对不同的性能指标进行优化。在你最终交付模型后，利益相关者改变了项目方向，要求全面重构。  

This is a common situation for data scientists, especially those with cross-collaborative teams, stakeholders, and changing priorities. Model development can quickly become a wild goose chase of figuring out requirements, data sources, performance metrics, etc. Through all of this chaos, it is critical that teams are able to not only keep track of all phases of model development, but are also able to reproduce results quickly. You need model governance.  
这是数据科学家的常见处境，尤其是那些涉及跨团队协作、多方利益相关者和不断变化的优先事项的团队。模型开发可能迅速变成一场徒劳的追逐，需要不断厘清需求、数据源、性能指标等。在所有这些混乱中，关键的是团队不仅能够跟踪模型开发的所有阶段，还能快速复现结果。你需要模型治理。  

---

## Model Governance  
## 模型治理  

Model governance refers to the framework by which a team maintains controls around its use of models, including experiment tracking, version control, reproducibility, etc. It is a critical capability that many teams do not consider until their models are already in production. It is important to have a process to effectively track development efforts, models in production, and data leveraged so that organizations can ensure quality, compliance, and monitor machine learning integration.  
模型治理是指团队维护其模型使用控制的框架，包括实验跟踪、版本控制、可复现性等。这是许多团队在模型已投入生产后才考虑的关键能力。拥有一个有效跟踪开发工作、生产中的模型以及所用数据的过程非常重要，以便组织能确保质量、合规性并监控机器学习集成。  

To ensure that the right models are in production, we need a way to manage various models and versions, track performance metrics, and reproduce results. This is where ML Flow comes in.  
为确保正确的模型投入生产，我们需要一种方法来管理各种模型和版本、跟踪性能指标并复现结果。这就是 ML Flow 的用武之地。  

ML Flow is an open-source ML Ops platform that allows flexible model development, deployment, and management by streamlining logging and tracking of models, metrics, and more. This article will give an introduction into how to install ML Flow, create experiments, log models and more.  
ML Flow 是一个开源的 MLOps 平台，通过简化模型、指标等的日志记录和跟踪，实现灵活的模型开发、部署和管理。本文将介绍如何安装 ML Flow、创建实验、记录模型等。  

---

## ML Flow Tutorial  
## ML Flow 教程  

### Model Development  
### 模型开发  

For our model, we will construct a basic linear regression model. This is a model to predict the annual salary of data professionals using inputs that include job title, company size, etc. See data here: https://www.kaggle.com/datasets/ruchi798/data-science-job-salaries (CC0: Public Domain). I slightly modified the data to reduce the number of options for certain features. Please note that this is a very poor model. We are using it only to demonstrate ML Flow.  
对于我们的模型，我们将构建一个基本的线性回归模型。这是一个使用职位、公司规模等输入来预测数据专业人士年薪的模型。数据见：https://www.kaggle.com/datasets/ruchi798/data-science-job-salaries (CC0: 公共领域)。我稍微修改了数据以减少某些特征的选项数量。请注意，这是一个非常差的模型。我们仅用它来演示 ML Flow。  

```python
#define independent and dependent features
X = salary_data.drop(columns = 'salary_in_usd')
y = salary_data['salary_in_usd']

#split between training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, random_state = 104, test_size = 0.2, shuffle = True)

#define parameters separately to log
params = {"fit_intercept": True, "positive": False}

#fit linear regression model
regr = linear_model.LinearRegression(**params)
regr.fit(X_train, y_train)

#make predictions
y_pred = regr.predict(X_test)
```

Note that we define the model parameters separately. This will be important when we incorporate ML Flow.  
注意，我们单独定义了模型参数。这在我们将 ML Flow 整合进来时很重要。  

---

### Logging Model with ML Flow  
### 使用 ML Flow 记录模型  

To start using ML Flow, you can navigate to the terminal and pip install it as a module. Next, run the server command to host a local server on your machine and leverage the ML Flow user interface.  
要开始使用 ML Flow，可以打开终端并通过 pip 将其作为模块安装。接下来，运行服务器命令在本地机器上托管服务器并使用 ML Flow 用户界面。  

```bash
pip install mlflow
mlflow server --host 127.0.0.1 --port 8080
```

Now that we have ML Flow installed and our local server running, we can log our model. Before logging a model, we need to start a new ‘experiment’. Think of this as a project, a bin where we will log and store all related models, metrics, data. etc. In the code below, we start a new experiment titled “Logging Example”. An experiment consists of runs, which contain the model used, its parameters, metrics, artifacts, and anything else that you choose to log. As you log more runs, we can track our progress and compare the performance of the various models developed.  
现在 ML Flow 已安装且本地服务器正在运行，我们可以记录模型了。在记录模型之前，我们需要启动一个新的“实验”。可以将其视为一个项目、一个容器，我们将在此记录和存储所有相关模型、指标、数据等。在下面的代码中，我们启动了一个名为“Logging Example”的新实验。一个实验由多次运行（runs）组成，每次运行包含所使用的模型、其参数、指标、工件以及你选择记录的任何其他内容。随着记录更多运行，我们可以跟踪进度并比较所开发的各种模型的性能。  

Using the code below, we:  
使用以下代码，我们：  
- Start the experiment 启动实验  
- Start a run titled “salary_baseline_regression” 启动名为“salary_baseline_regression”的运行  
- Log the adjusted R2 as a metric 将调整后的 R2 作为指标记录  
- Log the model’s parameters 记录模型的参数  
- Set a tag for the model 为模型设置标签  
- Log the actual model 记录实际模型  

```python
import mlflow
from mlflow.models import infer_signature

#set tracking uri
mlflow.set_tracking_uri(uri = "http://127.0.0.1:8080")

#create a new MLflow Experiment
mlflow.set_experiment("Logging Example")

#start an MLflow run
with mlflow.start_run(run_name = "salary_baseline_regression") as run:
    # Log the loss metric
    mlflow.log_metric("Adjusted R2", r2_score(y_test, y_pred))
    #log the hyperparameters
    mlflow.log_params(params)
    #set a tag that we can use to remind ourselves what this run was for
    mlflow.set_tag("Model Type", "Baseline")
    #log the model
    model_info = mlflow.sklearn.log_model(
        sk_model = regr,
        artifact_path = 'model',
        signature = infer_signature(X_train, regr.predict(X_train)),
        input_example = X_train,
        registered_model_name = "salary_baseline_regression")
```

After running, you can navigate to the ML Flow UI using the following link: http://localhost:8080/  
运行后，你可以通过以下链接访问 ML Flow UI：http://localhost:8080/  

---

### Navigating ML Flow UI  
### 浏览 ML Flow UI  

The ML Flow UI will open on the ‘Experiments’ tab. Here, we can see the experiment we created, the run for our baseline model, the model used, as well as metrics and parameters we logged. Note that the metrics and parameters may not be displayed at first. You can add them to the table using the ‘Columns’ drop down.  
ML Flow UI 将在“Experiments”标签页打开。在这里，我们可以看到我们创建实验、基线模型的运行、使用的模型以及我们记录的指标和参数。请注意，指标和参数最初可能不会显示。你可以使用“Columns”下拉菜单将它们添加到表格中。  

Next, click on the run name to navigate to the run view. This brings us to the overview tab where we can clearly see everything we have logged (model, R2 metric, model parameters).  
接下来，点击运行名称进入运行视图。这将带我们到概览标签页，我们可以清楚地看到所有已记录的内容（模型、R2 指标、模型参数）。  

Next, click on the model name or navigate to the model view. Here we can view our model, add descriptions and/or tags, and keep track of its versions. The version number will increase.  
接下来，点击模型名称或进入模型视图。在这里我们可以查看模型、添加描述和/或标签，并跟踪其版本。版本号将会增加。