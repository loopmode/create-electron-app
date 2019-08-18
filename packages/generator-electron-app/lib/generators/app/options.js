"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = [
    {
        name: 'yes',
        alias: 'y',
        type: Boolean,
        description: 'Skip questions and use default values'
    },
    {
        name: 'install',
        alias: 'i',
        default: true,
        type: Boolean,
        description: 'Install dependencies afterwards'
    },
    {
        name: 'yarn',
        default: true,
        type: Boolean,
        description: 'Use yarn instead of npm'
    },
    {
        name: 'webpack',
        default: true,
        type: Boolean,
        description: 'Use custom webpack configuration'
    },
    {
        name: 'eslint',
        default: true,
        type: Boolean,
        description: 'Add support for script file linting using eslint'
    },
    {
        name: 'typescript',
        default: false,
        type: Boolean,
        description: 'Add support for compiling TypeScript script files'
    },
    {
        name: 'notifications',
        default: false,
        type: Boolean,
        description: 'Provide OS-level notifications from webpack during development'
    },
    {
        name: 'ejs',
        default: false,
        type: Boolean,
        description: 'Add support for compiling EJS template files'
    },
    {
        name: 'nunjucks',
        default: false,
        type: Boolean,
        description: 'Add support for compiling Nunjucks template files'
    },
    {
        name: 'less',
        default: false,
        type: Boolean,
        description: 'Add support for compiling Less style files'
    },
    {
        name: 'sass',
        default: false,
        type: Boolean,
        description: 'Add support for compiling Sass/SCSS style files'
    }
];
//# sourceMappingURL=options.js.map