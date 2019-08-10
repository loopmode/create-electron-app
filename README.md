# @loopmode/create-electron-app

## Roadmap

### 0.0.0 - setup

-   monorepo/lerna
-   workspaces
-   typescript
-   yeoman

### 0.1.0 - packages

-   setup local development
-   setup local testing of CLI
-   setup "questions and CLI options" system
-   use a single template `electron-webpack-quick-start`
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
