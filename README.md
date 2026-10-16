# Python 速通 · 面向 Java 开发者的 5~10 小时过关路线

一个纯前端的 Python 速通学习平台：把 Python 基础压缩成 **8 个阶段 / 42 个知识点 + 10 步综合实战**，
用"Java 对比 + 易错点 + 可运行示例 + 自测"的方式，让 Java 开发者用 5~10 小时跨过 Python 门槛，
直接进入 LLM、RAG、Tool Calling、Agent 等 AI 应用开发。

## 快速开始

**Windows 用户（最省事）**：双击项目根目录的 **`启动学习.bat`**，它会自动启动开发服务器并打开浏览器。
具体行为：

- 服务已在运行 → 不重复启动，直接打开浏览器到 http://127.0.0.1:5173
- 首次运行（没有 `node_modules`）→ 自动先执行一次 `npm install`
- 其它情况 → 启动开发服务器，就绪后自动打开浏览器（端口被占用时打开实际端口）

关闭弹出的命令行窗口（或按 `Ctrl+C`）即停止服务。

**命令行启动**：

```bash
npm install       # 安装依赖（首次）
npm run dev       # 本地开发，默认 http://127.0.0.1:5173
```

其它命令：

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 启动开发服务器（Vite，端口 5173） |
| `npm run build` | 构建生产版本到 `dist/`（`base: './'`，产物可直接静态托管） |
| `npm run preview` | 本地预览构建产物 |
| `npm run validate` | 校验全部内容数据（结构、字段、id 唯一性、quiz 答案等） |
| `npm run check` | `validate` + `build` 一起跑 |

> 需求：Node.js 18+。

## 功能一览

- **学习总览** `/`：整体进度、预计剩余时间、累计学习时长、8 个阶段进度、继续学习入口。
- **知识点页** `/lesson/:id`：统一结构 —— 难度星级（Python / Java 开发者 / AI 开发重要度）→ Java 开发者提示 →
  1 它是什么 → 2 Java 对比 → 3 Python 写法 → 4 常见坑 → 5 小练习 → 6 自测 → 7 掌握情况。
- **代码块**：语法高亮、复制、编辑、重置、▶ 运行。浏览器内没有 Python 解释器，采用**模拟运行**：
  直接展示该示例的真实输出；编辑后提示需在本机运行。
- **自测**：选择题 / 判断题 / 代码题，提交后显示对错与解析，可"再做一次"。
- **综合实战** `/practice`：10 个 Step，从零写出 `POST /chat` 的 FastAPI + Pydantic + async 服务。
- **速查表** `/cheatsheet`：9 个分类 / 48 条 Java → Python 对照，点击条目展开详细解释，支持深链 `?item=`。
- **通关页** `/finish`：已掌握清单（按阶段分组）、AI 学习路线、"开始 AI 应用开发 →"。
- **顶部搜索**：按知识点与速查表条目搜索（如 `装饰器`、`async`、`dict`、`FastAPI`、`Pydantic`），点击跳转。
- **学习进度持久化**：完成章节、当前章节、自测成绩、最后学习时间、总学习时长全部存 `localStorage`，刷新不丢；
  顶栏设置与侧边栏都提供"重置学习进度"（带二次确认）。
- **视觉**：浅色 / 深色主题可切换，蓝色主色，深色代码块；桌面 / 笔记本 / 平板 / 手机响应式，窄屏为抽屉式导航。

## 目录结构

```
python-speedrun/
├─ 启动学习.bat                 # Windows 双击启动：自动开服务并打开浏览器
├─ index.html
├─ vite.config.js
├─ docs/
│  └─ content-schema.md        # 知识点内容数据规范（字段说明）
├─ scripts/
│  └─ validate-content.mjs     # npm run validate 的内容校验脚本
└─ src/
   ├─ main.js                  # 应用入口（Vue + Pinia + Router + Element Plus）
   ├─ App.vue                  # 外壳：Header / 侧栏 / 主内容 / 移动端抽屉 / 学习时长统计
   ├─ router/index.js          # 路由（hash 模式）
   ├─ stores/progress.js       # 学习进度状态（localStorage: py-speedrun-v1）
   ├─ composables/
   │  └─ useResetProgress.js   # 重置学习进度（带二次确认，Header 与侧栏共用）
   ├─ components/
   │  ├─ AppHeader.vue         # 顶栏：搜索 / 进度 / 主题 / 设置菜单
   │  ├─ SearchBox.vue         # 搜索框与结果下拉
   │  ├─ SideNav.vue           # 侧边栏 / 抽屉导航
   │  ├─ CodeBlock.vue         # 代码块：高亮 / 复制 / 编辑 / 重置 / 模拟运行
   │  ├─ QuizSection.vue       # 自测区
   │  ├─ LessonFooterNav.vue   # 底部"当前章节 / 上一节 / 下一节"
   │  ├─ RichText.vue          # 行内 `code` 与 **加粗** 渲染
   │  └─ StarRating.vue        # 难度星级
   ├─ views/
   │  ├─ OverviewView.vue      # 学习总览
   │  ├─ LessonView.vue        # 知识点页
   │  ├─ PracticeView.vue      # 综合实战
   │  ├─ CheatSheetView.vue    # 速查表
   │  └─ FinishView.vue        # 通关页
   ├─ data/
   │  ├─ phase1.js ~ phase8.js # 42 个知识点内容
   │  ├─ practice.js           # 综合实战 10 个 Step
   │  ├─ cheatsheet.js         # 速查表 9 分类 / 48 条
   │  └─ curriculum.js         # 聚合层：导航、阶段统计、上一/下一节、搜索索引
   ├─ utils/highlight.js       # 轻量 Python 语法高亮
   └─ styles/app.css           # 全局样式与浅/深色设计变量
```

## 扩展内容

内容与渲染完全分离，新增知识点只改数据文件即可：

1. 在 `src/data/phase1.js` ~ `phase8.js` 对应数组里追加一个对象，字段规范见
   [`docs/content-schema.md`](docs/content-schema.md)。
2. 运行 `npm run validate` 校验（会检查必填字段、`id` 唯一性、星级范围、quiz 结构与答案下标等）。
3. 侧边栏、阶段统计、上一/下一节、搜索索引、通关页清单都会自动生效，无需改组件。

综合实战步骤改 `src/data/practice.js`；速查表条目改 `src/data/cheatsheet.js`（每条需唯一 `id`）。

## 技术栈

- **Vue 3**（`<script setup>`）+ **Vite 6**
- **Vue Router 4**（hash 模式，适配静态托管）
- **Pinia**（状态与 `localStorage` 持久化）
- **Element Plus**（仅使用 `ElMessage` / `ElMessageBox`；其余 UI 与代码高亮为自研，无额外高亮库）

## 说明与已知取舍

- **模拟运行**：浏览器无法执行 Python，代码块的"运行"展示预置的真实输出；若你在编辑区改过代码，
  会提示需在本机运行。这是刻意的取舍，避免引入 Pyodide 等大体积依赖。
- **学习时长**：页面可见且 5 分钟内有过交互才计入，避免挂机刷时长。
- **数据存储**：全部在浏览器本地，不涉及登录、后端与数据库。
- **不要双击 `dist/index.html`**：构建产物用 ES module 加载，`file://` 协议下会被浏览器拦截而白屏；
  要预览构建版本请用 `npm run preview`，或把 `dist/` 交给任意静态服务器托管。
- **部署**：路由使用 hash 模式（地址形如 `/#/lesson/decorators`），且 `base: './'`，可放到任意子路径下静态托管。
- **构建体积**：当前为便于使用，Element Plus 采用全量注册，`index` chunk 约 1.2 MB（已通过
  `chunkSizeWarningLimit` 关闭告警）。若在意体积，可改为按需引入 `ElMessage` / `ElMessageBox` 及其样式。
