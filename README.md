# @loopmode/create-electron-app-workspace

Monorepo for `@loopmode/create-electron-app` and its packages.

## Installation

This project uses yarn workspaces. Development is incompatible with npm and you will have to use `yarn`.

Install the dependencies in the project root folder:

```
yarn install
```

## Usage

### `yarn build`

Compiles all packages from typescript to javascript.

### `yarn rebuild`

Like `yarn build`, but wipes the output folders and deletes incremental compilation information first.

### `yarn watch`

Like `yarn build`, but watches the sources and recompiles after changes.
