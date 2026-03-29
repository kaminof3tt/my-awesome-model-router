# Changelog

本文件记录了 my-awesome-model-router 项目所有重要变更。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)。

## [2.0.0] - 2026-03-30

### 添加

- **模块化架构**：将代码拆分为独立模块（config、skills、routing、plugin、cache）
- **插件系统**：内置事件钩子系统，支持第三方扩展
  - 支持的钩子：`beforeConfigLoad`、`afterConfigLoad`、`beforeSkillDiscovery`、`afterSkillDiscovery`、`beforeModelRouting`、`afterModelRouting`、`onConfigChange`、`onSkillsChange`
  - 内置插件：LoggingPlugin、StatsPlugin
- **异步 API**：所有核心函数的异步版本（`getSkillsAsync`、`getModelConfigAsync`、`getModelWithFallbackAsync` 等）
- **文件监听器**：配置文件更改时自动热重载，无需重启
- **TTL 缓存**：带自动清理的缓存管理器
- **Jest 测试框架**：全面的测试覆盖（70% 阈值）
  - `tests/index.test.js` - 原始测试
  - `tests/modular.test.js` - 模块化架构测试
- **ESLint 配置**：代码质量检查（`.eslintrc`）
- **Prettier 配置**：代码格式化（`.prettierrc`）
- **EditorConfig**：编辑器配置（`.editorconfig`）
- **GitHub Actions CI/CD**：自动化测试工作流（`.github/workflows/test.yml`）
- **贡献指南**：详细的开发和贡献说明（`CONTRIBUTING.md`）
- **配置 JSON Schema**：配置文件验证（`config-schema.json`）
- **技能**：新增 database、debugging、documentation、refactoring 技能模块
- **AGENTS.md**：AI 代理工作指南

### 更改

- **配置文件重命名**：`my-skills-config.json` -> `config.json`
- **入口文件重构**：`index.js` 现在重新导出 `src/` 模块
- **README 更新**：添加模块化架构、插件 API、开发指南等文档
- **中文 README 更新**：与英文版同步，添加 v2.0 新功能说明
- **性能优化**：在 `init()` 中预加载技能列表
- **配置验证增强**：使用缓存的技能名称进行验证

### 修复

- **frontmatter 解析**：修复值包含冒号时的解析 bug
- **测试环境**：修复测试配置问题
- **技能解析**：修复潜在的数据损坏问题

### 移除

- **配置清理**：删除 `config.json` 中未使用的 `modelSelection.rules` 和 `taskTypes` 配置
- **依赖清理**：删除 `my-awesome-model-router-config.json`（已重命名为 `config.json`）

## [1.0.0] - 2024-03-28

### 添加

- 初始版本发布
- 基于角色的 AI 模型路由
- 9 个预定义技能（前端、后端、架构、测试、QA、调试、文档、重构、数据库）
- 技能自动从 `skills/` 目录发现
- 配置热重载支持
- 配置验证（modelProviders、agents、categories、技能引用）
- 回退链支持（主模型 -> 次要模型 -> 回退模型）
- 技能验证（frontmatter 格式检查）

## 贡献者指南

### 如何添加变更条目

1. 在 `[Unreleased]` 部分下添加变更
2. 使用以下分类：
   - `添加` - 新功能
   - `更改` - 现有功能的更改
   - `移除` - 移除的功能
   - `修复` - 错误修复
   - `弃用` - 即将移除的功能
3. 发布时：
   - 将 `[Unreleased]` 改为版本号和日期
   - 创建新的 `[Unreleased]` 部分

### 版本号格式

遵循 [语义化版本控制](https://semver.org/lang/zh-CN/)：

- **主版本号**：不兼容的 API 更改
- **次版本号**：向后兼容的功能新增
- **修订号**：向后兼容的问题修复
