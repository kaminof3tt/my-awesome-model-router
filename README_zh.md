# My Awesome Model Router for OpenCode

一个为 OpenCode 提供基于角色的模型选择功能的自定义技能插件。

## 功能特性

- **基于角色的技能**：前端、后端、架构、测试、QA、调试、文档、重构、数据库
- **智能模型路由**：自动为每种任务选择最佳模型
- **模块化架构**：清晰的关注点分离（配置、技能、路由、插件、缓存）
- **插件系统**：可扩展的钩子系统，支持第三方扩展
- **技能自动发现**：扫描 skills/ 目录并从 SKILL.md frontmatter 加载技能
- **配置热重载**：通过文件监听器在 config.json 更改时自动重新加载
- **配置验证**：验证 modelProviders、agents、categories 和技能引用
- **后备链条**：主模型 -> 次模型 -> 后备模型选择
- **异步 API**：所有核心函数都有异步版本，提升性能
- **测试覆盖**：使用 Jest 实现全面测试覆盖（70% 阈值）
- **代码质量**：ESLint + Prettier + EditorConfig

## 模型路由策略

| 任务类型 | 模型 | 使用场景 |
|----------|------|----------|
| 前端 | Kimi-K2.5 | UI 组件、响应式设计 |
| 架构 | Kimi-K2.5 | 系统设计、架构决策 |
| 重构 | Kimi-K2.5 | 代码重构、技术债务处理 |
| 需求实现 | GLM-5 | 功能开发、业务逻辑 |
| 数据库 | GLM-5 | 数据库设计、查询优化 |
| Bug 修复 | DeepSeek-V3.2 | Bug 修复、错误分析 |
| 调试 | DeepSeek-V3.2 | 根因分析、问题诊断 |
| 文档 | MiniMax-M2.7 | 技术文档、API 文档 |
| 低难度任务 | MiniMax-M2.7 | 简单任务、常规工作 |
| 兜底方案 | MiniMax-M2.7 | 未指定任务的默认选项 |

## 安装

### 从 GitHub 安装

在你的 `opencode.json` 中添加：

```json
{
  "plugin": [
    "my-awesome-model-router@git+https://github.com/kaminof3tt/my-awesome-model-router.git"
  ]
}
```

### 从 npm 安装（如已发布）

```bash
npm install my-awesome-model-router
```

然后在你的 `opencode.json` 中添加：

```json
{
  "plugin": [
    "my-awesome-model-router"
  ]
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

// 重构任务 - 使用 Kimi-K2.5
task(category="refactoring", prompt="提取重复代码为共享工具函数")

// 后端任务 - 使用 GLM-5
task(subagent_type="backend", prompt="实现用户认证 API")

// 数据库任务 - 使用 GLM-5
task(category="database", prompt="设计电商系统数据库架构")

// Bug 修复 - 使用 DeepSeek-V3.2
task(category="bug-fix", prompt="调查登录认证失败问题")

// 调试任务 - 使用 DeepSeek-V3.2
task(subagent_type="debugger", prompt="诊断生产服务器内存泄漏问题")

// 文档任务 - 使用 MiniMax-M2.7
task(category="documentation", prompt="编写用户接口 API 文档")

// 简单任务 - 使用 MiniMax-M2.7
task(category="low-difficulty", prompt="更新 README 文档")
```

### 插件 API

```javascript
const plugin = require('my-awesome-model-router');

// 初始化插件
await plugin.init();

// 获取可用技能
const skills = plugin.getSkills();
const skillsAsync = await plugin.getSkillsAsync();

// 获取模型配置
const config = plugin.getModelConfig();

// 获取带后备的模型
const model = plugin.getModelWithFallback('frontend', 'implement UI');

// 注册自定义插件
plugin.registerPlugin('my-plugin', {
  init(api, options) { /* ... */ },
  hooks: {
    beforeModelRouting: (data) => data,
    afterModelRouting: (data) => data
  },
  cleanup() { /* ... */ }
});

// 获取路由调试信息
const debug = plugin.getRoutingDebugInfo('frontend', 'implement UI');

// 获取统计信息
const stats = plugin.getStats();
```

### 可用钩子

- `beforeConfigLoad` / `afterConfigLoad`
- `beforeSkillDiscovery` / `afterSkillDiscovery`
- `beforeModelRouting` / `afterModelRouting`
- `onConfigChange` / `onSkillsChange`

## 配置

插件使用 `config.json` 进行模型路由配置：

```json
{
  "modelProviders": {
    "k2.5": "volcengine-plan/kimi-k2.5",
    "glm5": "volcengine-plan/glm-5",
    "deepseekv3.2": "baiduqianfancodingplan/deepseek-v3.2",
    "m2.7": "minimax-cn-coding-plan/MiniMax-M2.7"
  },
  "agents": {
    "frontend": { "model": "k2.5", "skills": ["frontend-developer"] },
    "backend": { "model": "glm5", "skills": ["backend-developer"] }
  },
  "categoryKeywords": {
    "frontend-architecture": ["frontend", "ui", "component"],
    "bug-fix": ["bug", "fix", "error"]
  },
  "fallbackChains": {
    "frontend": ["k2.5", "glm5", "m2.7"],
    "default": ["m2.7"]
  }
}
```

## 开发

### 前置条件

- Node.js >= 14
- npm

### 设置

```bash
git clone https://github.com/kaminof3tt/my-awesome-model-router.git
cd my-awesome-model-router
npm install
```

### 测试

```bash
npm test                    # 运行所有测试并生成覆盖率报告
npm test -- modular.test.js # 运行特定测试文件
npm test -- --watch         # 监听模式
npm run test:ci             # CI 模式
```

### 代码检查

```bash
npx eslint src/ tests/
```

## 项目结构

```
my-awesome-model-router/
├── index.js                    # 入口文件（重新导出 src/）
├── src/                        # 模块化实现
│   ├── index.js               # 主模块，包含插件 API
│   ├── config/                # 配置加载、验证、热重载
│   ├── skills/                # 技能发现和 YAML 解析
│   ├── routing/               # 模型路由逻辑
│   ├── plugin/                # 插件系统和钩子
│   └── cache/                 # 基于 TTL 的缓存管理器
├── config.json                # 模型路由配置
├── skills/<name>/SKILL.md     # 技能定义（自动发现）
├── tests/                     # Jest 测试文件
├── jest.config.js             # Jest 配置
├── .eslintrc                  # ESLint 配置
├── .prettierrc                # Prettier 配置
└── .editorconfig              # 编辑器配置
```

## 包含的技能

| 技能 | 描述 |
|------|------|
| frontend-developer | UI 组件、样式、响应式设计 |
| architect | 系统设计、架构决策 |
| backend-developer | API 开发、业务逻辑 |
| tester | 测试策略、测试自动化 |
| qa-engineer | 代码审查、质量指标 |
| debugger | 根因分析、问题诊断 |
| documenter | 技术文档编写 |
| refactoring-specialist | 代码重构、技术债务 |
| database-specialist | 数据库设计、查询优化 |

## 参与贡献

请参阅 [CONTRIBUTING.md](CONTRIBUTING.md) 了解贡献指南。

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件
