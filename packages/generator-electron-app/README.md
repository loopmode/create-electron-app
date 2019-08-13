# @loopmode/generator-electron-app

Yeoman generator for [@loopmode/create-electron-app](https://www.npmjs.com/package/@loopmode/create-electron-app).

### Arguments

#### `projectName`

Name for the new project and its folder.
In interactive mode, this will be the default for the `projectName` question.  
If you want to use the `--yes` option non-interactive mode, this argument is required.

Example:

```
yarn create @loopmode/electron-project my-project
```

### Options

#### `--yes`

Short: `-y`

Skips interactive questions and uses defaults instead.
Only available if you provided the `projectName` argument.

Example:

```
yarn create @loopmode/electron-project empty-project --no-install --yes
```

#### `--yarn` (default: `true`)

Whether to use `yarn` instead of `npm`.
Use `--no-yarn` to omit.

Example:

```
npm init @loopmode/electron-project --no-yarn
```

#### `--install` (default: `true`)

Whether to install the dependencies after creating the project.
Use `--no-install` to omit.

```
npm init @loopmode/electron-project --no-install
```

## Roadmap

### ✅ 0.0.0 - setup

-   monorepo/lerna
-   workspaces
-   typescript
-   yeoman

### ✅ 0.1.0 - packages

-   setup local development
-   setup local testing of CLI
-   setup "questions and CLI options" system
-   use a single template `electron-webpack-quick-start`
-   provide `create-electron-app`
-   provide `generator-electron-app`
-   publish 0.1.0 on npm and test

### 0.2.0 - options

Add questions and CLI options

for basics

-   `--name`

for supported add-ons

-   `--nunjucks`
-   `--ejs`
-   `--sass`
-   `--less`
-   `--typescript`
-   `--eslint`
-   `--build-notifications`

for customization

-   `--webpack`

### 0.3.0 - workspaces

Add questions and options for whether to use workspaces

-   `--workspaces`
    -   `--lerna`

### 0.4.0 - templates

Add custom templates with a resonable basic setup

-   custom templates
-   `--vue`
-   `--react`
    -   `--react-router`
    -   `[--cra]` if workspaces were selected

### 0.5.0 - documentation

-   compile proper documentation, probably markdown-based
-   setup github pages

### ?.?.? - ?

### 1.0.0 - prerelease

-   Tests?
-   READMEs look good on npm
-   everything works well

### 1.0.0 - release

-   publish 1.0.0 on npm
-   create git tag
-   create medium article
-   inform electron-webpack community
-   post on echojs
-   post on fullstacknews
-   post on hackernews
