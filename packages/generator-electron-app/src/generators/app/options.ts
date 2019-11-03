import { GeneratorOption } from '../../types';

export const options: GeneratorOption[] = [
    {
        name: 'yes',
        alias: 'y',
        default: false,
        type: Boolean,
        description: 'Skip questions and use default values?'
    },
    {
        name: 'install',
        alias: 'i',
        default: true,
        type: Boolean,
        description: 'Install dependencies after setup?'
    },
    {
        name: 'yarn',
        default: true,
        type: Boolean,
        description: 'Use yarn instead of npm?'
    },
    {
        name: 'eslint',
        default: true,
        type: Boolean,
        description: 'eslint: Add support for script file linting using eslint?'
    },
    {
        name: 'prettier',
        default: true,
        type: Boolean,
        description: 'prettier: Add prettier integration?'
    },
    {
        name: 'webpack',
        default: false,
        type: Boolean,
        description: 'webpack: Use custom configuration override?'
    },
    {
        name: 'typescript',
        default: false,
        type: Boolean,
        description: 'typescript: Add support for compiling TypeScript script files?'
    },
    {
        name: 'notifications',
        default: false,
        type: Boolean,
        description: 'notifications: Provide OS-level notifications from webpack during development?'
    },
    {
        name: 'react',
        default: false,
        type: Boolean,
        description: 'react: Configure for React development?'
    },
    {
        name: 'vue',
        default: false,
        type: Boolean,
        description: 'vue: Configure for Vue development?'
    },
    {
        name: 'ejs',
        default: false,
        type: Boolean,
        description: 'ejs: Add support for compiling EJS template files?'
    },
    {
        name: 'nunjucks',
        default: false,
        type: Boolean,
        description: 'nunjucks: Add support for compiling Nunjucks template files?'
    },
    {
        name: 'less',
        default: false,
        type: Boolean,
        description: 'less: Add support for compiling Less style files?'
    },
    {
        name: 'sass',
        default: false,
        type: Boolean,
        description: 'sass: Add support for compiling Sass/SCSS style files?'
    },
    //------------------------------------------------------------
    //
    // internal variables not exposed to the user
    //
    //------------------------------------------------------------
    {
        internal: true,
        name: 'electronWebpackConfig',
        default: false,
        type: Boolean
    },
    {
        internal: true,
        name: 'defaultRendererTemplate',
        default: true,
        type: Boolean
    }
];
