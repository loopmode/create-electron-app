# @loopmode/generator-electron-app

Yeoman generator for [@loopmode/create-electron-app](https://www.npmjs.com/package/@loopmode/create-electron-app).

### Arguments

#### `projectName`

Name for the new project and its folder.
If you want to use the `--yes` option non-interactive mode, this argument is required.
In interactive mode, this will be the default for the `projectName` question.

Example:

```
yarn create @loopmode/electron-project my-project
```

### Options

#### `--help`

Prints a table of available options.

#### `--yes`

Short: `-y`

Skips interactive questions and uses defaults instead.
Only available if you provided the `projectName` argument.

Example:

```
yarn create @loopmode/electron-project my-project --yes
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

#### Add-ons

All add-ons supported by `electron-webpack` are available as CLI options.  
For the exact naming of each CLI option, check the `--help`.
For details about each of the add-ons, check the [official docs](https://webpack.electron.build/add-ons).

```
Usage:
  yo @loopmode/electron-app:app [<projectName>] [options]

Options:
  -h,   --help           # Print the generator's options and usage
        --skip-cache     # Do not remember prompt answers                                                  Default: false
        --skip-install   # Do not automatically install dependencies                                       Default: false
        --force-install  # Fail on install dependencies error                                              Default: false
  -y,   --yes            # Skip questions and use default values?                                          Default: false
  -i,   --install        # Install dependencies after setup?                                               Default: true
        --yarn           # Use yarn instead of npm?                                                        Default: true
        --webpack        # webpack: Use custom configuration override?                                     Default: true
        --eslint         # eslint: Add support for script file linting using eslint?                       Default: true
        --typescript     # typescript: Add support for compiling TypeScript script files?                  Default: false
        --notifications  # notifications: Provide OS-level notifications from webpack during development?  Default: false
        --ejs            # ejs: Add support for compiling EJS template files?                              Default: false
        --nunjucks       # Add snunjucks: upport for compiling Nunjucks template files?                    Default: false
        --less           # less: Add support for compiling Less style files?                               Default: false
        --sass           # sass: Add support for compiling Sass/SCSS style files?                          Default: false
```
