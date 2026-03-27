# My Skills Plugin for OpenCode

一个为 OpenCode 提供基于角色的模型选择功能的自定义技能插件。

## 功能特性

- **基于角色的技能**：前端、后端、架构、测试、QA
- **智能模型路由**：自动为每种任务选择最佳模型
- **易于安装**：从 GitHub 或 npm 安装
- **可配置**：自定义模型映射和任务类型

## 模型路由策略

| 任务类型 | 模型 | 使用场景 |
|----------|------|----------|
| 前端与架构 | Kimi-K2.5 | UI 组件、系统设计 |
| 需求实现 | GLM-5 | 功能开发、业务逻辑 |
| Bug 调查 | DeepSeek-V3.2 | 调试、错误分析 |
| 低难度任务 | MiniMax-M2.7 | 简单任务、文档 |
| 兜底方案 | MiniMax-M2.7 | 未指定任务的默认选项 |

## 安装

### 从 GitHub 安装

在你的 `opencode.json` 中添加：

```json
{
  "plugin": [
    "my-skills@git+https://github.com/kaminof3tt/my-awesome-model-router.git"
  ]
}
```

### 从 npm 安装（如已发布）

```bash
npm install my-skills-plugin
```

然后在你的 `opencode.json` 中添加：

```json
{
  "plugin": [
    "my-skills-plugin"
  ]
}
```

## 配置

### 基础配置

插件会根据任务类型自动配置模型路由，基础使用无需额外配置。

### 自定义配置

如需自定义模型路由，在 OpenCode 配置目录下创建 `my-skills-config.json` 文件：

```json
{
  "modelProviders": {
    "k2.5": "volcengine-plan/kimi-k2.5",
    "glm5": "volcengine-plan/glm-5",
    "deepseekv3.2": "baiduqianfancodingplan/deepseek-v3.2",
    "m2.7": "minimax-cn-coding-plan/MiniMax-M2.7"
  },
  "agents": {
    "frontend": {
      "model": "k2.5",
      "skills": ["frontend-developer"]
    },
    "architect": {
      "model": "k2.5",
      "skills": ["architect"]
    },
    "backend": {
      "model": "glm5",
      "skills": ["backend-developer"]
    },
    "tester": {
      "model": "deepseekv3.2",
      "skills": ["tester"]
    },
    "qa": {
      "model": "deepseekv3.2",
      "skills": ["qa-engineer"]
    }
  }
}
```

## 使用方法

### 使用技能

当你使用带有相应 `category` 或 `subagent_type` 的 `task()` 工具时，技能会自动加载：

```typescript
// 前端任务 - 使用 Kimi-K2.5
task(category="frontend-architecture", prompt="创建响应式导航栏组件")

// 架构任务 - 使用 Kimi-K2.5
task(subagent_type="architect", prompt="设计微服务架构")

// Bug 调查 - 使用 DeepSeek-V3.2
task(category="bug-fix", prompt="调查登录认证失败问题")

// 简单任务 - 使用 MiniMax-M2.7
task(category="low-difficulty", prompt="更新 README 文档")
```

### 模型选择逻辑

插件使用以下逻辑选择模型：

1. **显式类别**：如果指定了 `category`，使用该类别配置的模型
2. **代理类型**：如果指定了 `subagent_type`，使用该代理配置的模型
3. **任务关键词**：插件分析任务关键词以确定最佳模型
4. **兜底方案**：未找到匹配时，使用兜底模型（MiniMax-M2.7）

## 包含的技能

### 前端开发者
- UI 组件开发
- 样式与响应式设计
- 前端性能优化

### 架构师
- 系统设计与架构
- 技术评估
- 技术战略规划

### 后端开发者
- API 开发
- 数据库设计
- 业务逻辑实现

### 测试工程师
- 测试策略设计
- 测试实现
- Bug 调查

### QA 工程师
- 代码审查
- 质量指标
- 流程改进

## 自定义

### 添加新技能

1. 在 `skills/` 目录下创建新目录：
   ```bash
   mkdir skills/my-new-skill
   ```

2. 创建 `SKILL.md` 文件：
   ```markdown
   ---
   name: my-new-skill
   description: Use when [触发条件]
   ---
   
   # My New Skill
   
   ## 概述
   [描述]
   
   ## 使用场景
   [使用指南]
   ```

3. 更新 `my-skills-config.json` 中的配置

### 修改模型映射

编辑 `my-skills-config.json` 文件以更改不同任务类型使用的模型：

```json
{
  "categories": {
    "my-custom-category": {
      "model": "my-preferred-model",
      "description": "自定义任务类别"
    }
  }
}
```

## 故障排除

### 插件未加载

1. 检查插件是否在 `opencode.json` 中列出
2. 验证 GitHub URL 是否正确
3. 检查 OpenCode 日志中的错误信息

### 技能不工作

1. 确保 `SKILL.md` 文件包含正确的 frontmatter
2. 检查技能描述是否以 "Use when" 开头
3. 验证技能目录结构

### 模型选择不正确

1. 检查 `opencode.json` 中的模型提供者配置
2. 验证模型名称是否完全匹配
3. 检查任务提示中的关键词

## 参与贡献

1. Fork 本仓库
2. 创建功能分支
3. 进行修改
4. 提交 Pull Request

## 许可证

MIT License - 详见 LICENSE 文件

## 支持

如有问题或疑问：
- 在 GitHub 上创建 Issue
- 查阅 OpenCode 文档
- 参考故障排除部分
