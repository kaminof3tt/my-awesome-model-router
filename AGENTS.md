# AGENTS.md

本文件用于指导在此代码仓库中工作的 AI 代理。

## 项目概述

**my-skills-plugin** 是一个 OpenCode 插件，为 AI 代理提供基于角色的模型路由。它将开发任务（前端、后端、架构、测试、QA）映射到针对各领域优化的专用模型。

## 仓库结构

```
my-awesome-model-router/
├── index.js                    # 插件入口 (CommonJS)
├── my-skills-config.json       # 模型路由配置
├── skills/                     # 技能定义
│   ├── frontend/SKILL.md       # UI/UX、组件、样式
│   ├── architect/SKILL.md      # 系统设计、架构决策
│   ├── backend/SKILL.md        # API、数据库、业务逻辑
│   ├── tester/SKILL.md         # 测试策略、Bug 调查
│   └── qa/SKILL.md             # 代码审查、质量指标
├── package.json
├── README.md
└── LICENSE                     # MIT
```

## 构建 / 检查 / 测试命令

```bash
# 无需构建步骤 - 纯 JavaScript
npm test        # 当前为占位符（会报错退出）
```

**注意：** 未配置 linter、formatter 或测试框架。添加测试时，使用用户指定的框架或提出建议。

## 代码风格规范

### 模块系统
- 使用 **CommonJS**（`require` / `module.exports`）
- 不使用 ES 模块（`import` / `export`）—— 这是 Node.js 插件

### 格式化
- 2 空格缩进
- 字符串使用单引号
- 必须使用分号
- 多行对象/数组使用尾逗号

### 命名规范
- **文件名**：`kebab-case.js`
- **变量/函数**：`camelCase`
- **常量**：`UPPER_SNAKE_CASE`
- **类名**：`PascalCase`

### 注释与文档
- 使用 JSDoc 为模块和函数添加文档
- 仅对非显而易见的逻辑添加行内注释
- 注释应简洁 —— 代码本身应具有自解释性

```javascript
/**
 * 获取指定代理类型的模型配置
 * @param {string} agentType - 代理类型 (frontend, backend 等)
 * @returns {object|null} 模型配置，未找到时返回 null
 */
const getModelForAgent = (agentType) => {
  // 实现逻辑
};
```

### 错误处理
- 对外部调用（文件读写、配置加载）使用 try/catch 包裹
- 使用 `console.error` 记录错误
- 失败时返回 `null` 或合理的默认值 —— 插件入口点绝不抛出异常

```javascript
try {
  const config = require('./my-skills-config.json');
  return config;
} catch (error) {
  console.error('加载配置失败:', error);
  return null;
}
```

### 导入规范
- 分组导入：Node.js 内置模块在前，本地模块在后
- 使用相对路径（`./`、`../`）
- 不使用动态导入 —— 使用 `require()`

```javascript
const fs = require('fs');
const path = require('path');
const config = require('./my-skills-config.json');
```

## 技能开发

创建或修改技能时：

1. **位置**：`skills/<skill-name>/SKILL.md`
2. **必须包含 frontmatter**：
   ```yaml
   ---
   name: skill-name
   description: Use when [触发条件]
   ---
   ```
3. **description 必须以 "Use when" 开头** —— 这是 OpenCode 匹配技能的方式
4. **必须包含章节**：概述、使用场景、核心职责、模型配置、常见模式

## 模型路由逻辑

| 任务类别 | 模型 | 使用场景 |
|--------------|-------|----------|
| `frontend-architecture` | Kimi-K2.5 | UI 组件、系统设计 |
| `requirement-implementation` | GLM-5 | 功能开发、业务逻辑 |
| `bug-fix` | DeepSeek-V3.2 | 调试、错误分析 |
| `low-difficulty` | MiniMax-M2.7 | 简单任务、文档 |
| `fallback` | MiniMax-M2.7 | 未指定任务的默认选项 |

## 关键约束

- **无 TypeScript** —— 这是纯 JavaScript 项目
- **无打包工具** —— 文件由 OpenCode 直接加载
- **插件 API** —— `index.js` 导出 `init`、`getSkills`、`getModelConfig`
- **配置驱动** —— 模型路由在 `my-skills-config.json` 中定义，不硬编码

## 禁止事项

- 添加 TypeScript 或转译工具 —— 保持纯 JS
- 未经请求添加构建工具
- 在 `index.js` 中硬编码模型名称 —— 使用配置文件
- 提交 `node_modules/` 或锁文件
- 无故移除 JSON 配置中的 `$schema` 字段
