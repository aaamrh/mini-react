# mini react

## 初始化

1. `pnpm init` 初始化项目
2. 创建 `pnpm-workspace.yaml`, 定义了工作空间的根目录
3. `.gitignore`文件

## 开发规范

### 代码风格和规范

eslint 只检查代码规范，prettier 检查代码风格

`pnpm i eslint -D -w`, `-w`指在根目录安装

`npx eslint --init` 初始化

`pnpm i -D -w typescript`

安装ts的eslint插件：`pnpm i -D -w @typescript-eslint/eslint-plugin`

`pnpm i prettier -D -w` 代码风格, 新建 `.prettierrc.json` 配置文件

将prettier集成到eslint中 `pnpm i eslint-config-prettier eslint-plugin-prettier -D -w`，其中：

    eslint-config-prettier：覆盖 ESLint 本身的规则配置

    eslint-plugin-prettier：用 Prettier 来接管修复代码即 eslint --fix

    设置 scripts : "lint": "eslint --ext .ts,.jsx,.tsx --fix --quiet ./packages"

### git commit 规范

`pnpm i husky -D -w`

`npx husky install` 初始化

`npx husky add .husky/pre-commit "pnpm lint"`

    pnpm lint 会对代码全量检查，当项目复杂后执行速度可能比较慢，届时可以考虑使用 lint-staged，实现只对暂存区代码进行检查

`pnpm i commitlint @commitlint/cli @commitlint/config-conventional -D -w` 对 git commit 内容检查

新建 `.commitlintrc.js` 文件

`npx husky add .husky/commit-msg "npx --no-install commitlint -e $HUSKY_GIT_PARAMS"` 将 commitlint 集成到 husky 中

### ts 配置

新建 `tsconfig.json` 关注其中 baseUrl ， 它指的是 ts 基础入口

### 打包工具

比较不同打包工具的区别 参考资料： [Overview | Tooling.Report](https://bundlers.tooling.report/)

我们只开发一个库，而不是业务项目。
希望工具能够尽可能简洁，打包产物可读性高
原生支持 ESM

所以选择 rollup `pnpm i -D -w rollup`，然后新建 `scripts/rollup` 用来存放 rollup 配置
