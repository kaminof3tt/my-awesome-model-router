# Contributing to my-awesome-model-router

感谢您对 my-awesome-model-router 的兴趣！我们欢迎所有形式的贡献。

## 开发流程

### 1. Fork 仓库

点击 GitHub 页面右上角的 "Fork" 按钮创建您自己的副本。

### 2. 克隆仓库

```bash
git clone https://github.com/YOUR_USERNAME/my-awesome-model-router.git
cd my-awesome-model-router
```

### 3. 创建功能分支

为您的更改创建一个新分支：

```bash
git checkout -b feature/your-feature-name
```

或者修复 bug：

```bash
git checkout -b fix/your-bug-fix
```

### 4. 进行更改

- 遵循现有的代码风格（见下方代码风格指南）
- 为您的功能添加测试
- 确保所有测试通过（`npm test`）
- 更新相关文档

### 5. 运行测试

在提交之前，运行测试确保一切正常：

```bash
npm install
npm test
```

### 6. 提交更改

使用清晰的提交信息：

```bash
git add .
git commit -m "feat: add new feature description"
```

提交信息规范：
- `feat:` 新功能
- `fix:` 错误修复
- `docs:` 文档更改
- `style:` 代码风格更改（不影响代码运行）
- `refactor:` 代码重构
- `perf:` 性能优化
- `test:` 添加或修改测试
- `chore:` 构建过程或辅助工具的变动

### 7. 推送到 GitHub

```bash
git push origin feature/your-feature-name
```

### 8. 创建 Pull Request

- 访问原始仓库
- 点击 "Compare & pull request" 按钮
- 填写 PR 模板
- 等待代码审查

## 代码风格指南

### JavaScript

- 使用 2 空格缩进
- 使用单引号
- 使用分号
- 使用 CommonJS 模块（`require` / `module.exports`）
- 使用驼峰命名变量和函数
- 使用函数注释

```javascript
/**
 * 函数描述
 * @param {type} paramName - 参数描述
 * @returns {type} 返回值描述
 */
const myFunction = (paramName) => {
  // 实现
};
```

### 测试

- 使用 Jest 作为测试框架
- 测试文件应与源文件同名，添加 `.test.js` 后缀
- 测试应描述性命名
- 使用 `describe`、`test` 或 `it` 组织测试

```javascript
describe('functionName', () => {
  test('should do something', () => {
    expect(result).toBe(expected);
  });
});
```

## 添加新技能

### 1. 创建技能目录

```bash
mkdir skills/your-skill-name
```

### 2. 创建 SKILL.md 文件

在技能目录中创建 `SKILL.md` 文件：

```markdown
---
name: your-skill-name
description: Use when [触发条件描述]
---

# 技能名称

## 概述

简要描述这个技能的用途。

## 使用场景

使用这个技能的具体情况。

## 核心职责

- 职责 1
- 职责 2

## 常见模式

技能使用的常见模式或方法。
```

**重要**：
- `description` 必须以 "Use when" 开头
- 技能名称使用短横线命名（kebab-case）

### 3. 更新配置

在 `config.json` 中添加技能配置：

```json
{
  "agents": {
    "your-agent-name": {
      "model": "model-id",
      "skills": ["your-skill-name"],
      "description": "代理描述"
    }
  }
}
```

### 4. 编写测试

为技能发现和功能编写测试。

## 项目结构

```
my-awesome-model-router/
├── index.js              # 主插件入口
├── config.json            # 模型路由配置
├── config-schema.json     # 配置 JSON Schema
├── package.json           # npm 包配置
├── jest.config.js         # Jest 配置
├── .eslintrc            # ESLint 配置
├── .prettierrc           # Prettier 配置
├── .editorconfig          # 编辑器配置
├── .github/workflows/    # GitHub Actions
│   └── test.yml          # CI/CD 工作流
├── tests/                # 测试文件
│   └── index.test.js     # 主测试套件
├── skills/               # 技能定义
│   ├── frontend/
│   ├── backend/
│   └── ...
├── README.md             # 项目文档
├── CONTRIBUTING.md        # 贡献指南（本文件）
├── CHANGELOG.md          # 变更日志
├── LICENSE               # MIT 许可证
└── .gitignore            # Git 忽略配置
```

## 报告问题

如果您发现 bug：

1. 检查 [Issues](https://github.com/kaminof3tt/my-awesome-model-router/issues) 确保问题未被报告
2. 如果是新问题，创建一个 Issue 并包含：
   - 清晰的标题和描述
   - 重现步骤
   - 预期行为
   - 实际行为
   - 环境信息（Node 版本、操作系统等）

## 功能请求

我们欢迎功能请求！在创建 Issue 之前：

1. 检查现有功能请求
2. 描述您希望的功能和使用场景
3. 如果可能，提供实现建议

## 许可证

通过贡献代码，您同意您的贡献将在 [MIT License](LICENSE) 下许可。

## 行为准则

- 尊重所有贡献者
- 建设性反馈
- 关注代码，而不是人
- 接受批评并从中学习

## 获取帮助

如有问题：

- 打开 [Discussion](https://github.com/kaminof3tt/my-awesome-model-router/discussions)
- 提及维护者 @kaminof3tt

感谢您的贡献！🎉
