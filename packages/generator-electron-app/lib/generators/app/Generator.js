"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const yeoman_generator_1 = __importDefault(require("yeoman-generator"));
const camelcase_1 = __importDefault(require("camelcase"));
const conditionalSyntax_1 = require("../../utils/conditionalSyntax");
const binaryUtils_1 = require("../../utils/binaryUtils");
const transforms = __importStar(require("../../utils/rename-transform"));
const { name, version } = require('../../../package.json');
const validators = {
    required(value) {
        return value ? true : 'This field is required';
    }
};
function initCLIOptions(generator) {
    generator.argument('projectName', {
        type: String,
        required: false,
        description: 'Name for the new project'
    });
    generator.option('yes', {
        alias: 'y',
        type: Boolean,
        description: 'Skip questions and use default values'
    });
    generator.option('install', {
        alias: 'i',
        default: true,
        type: Boolean,
        description: 'Install dependencies afterwards'
    });
    generator.option('yarn', {
        default: true,
        type: Boolean,
        description: 'Use yarn instead of npm'
    });
    generator.option('webpack', {
        default: true,
        type: Boolean,
        description: 'Use custom webpack configuration'
    });
    generator.option('eslint', {
        default: true,
        type: Boolean,
        description: 'Add support for script file linting using eslint'
    });
    generator.option('typescript', {
        default: false,
        type: Boolean,
        description: 'Add support for compiling TypeScript script files'
    });
    generator.option('notifications', {
        default: false,
        type: Boolean,
        description: 'Provide OS-level notifications from webpack during development'
    });
    generator.option('ejs', {
        default: false,
        type: Boolean,
        description: 'Add support for compiling EJS template files'
    });
    generator.option('nunjucks', {
        default: false,
        type: Boolean,
        description: 'Add support for compiling Nunjucks template files'
    });
    generator.option('less', {
        default: false,
        type: Boolean,
        description: 'Add support for compiling Less style files'
    });
    generator.option('sass', {
        default: false,
        type: Boolean,
        description: 'Add support for compiling Sass/SCSS style files'
    });
}
function getQuestions(values = {}) {
    return [
        {
            type: 'input',
            name: 'projectName',
            message: 'Project name',
            default: values.projectName,
            validate: validators.required
        },
        {
            type: 'confirm',
            name: 'typescript',
            message: 'Add support for compiling TypeScript script files',
            default: values.typescript
        },
        {
            type: 'confirm',
            name: 'webpack',
            message: 'Use custom webpack configuration',
            default: values.webpack
        },
        {
            type: 'confirm',
            name: 'eslint',
            message: 'Add support for script file linting using eslint',
            default: values.eslint
        },
        {
            type: 'confirm',
            name: 'notifications',
            message: 'Provide OS-level notifications from webpack during development',
            default: values.notifications
        },
        {
            type: 'confirm',
            name: 'ejs',
            message: 'Add support for compiling EJS template files',
            default: values.ejs
        },
        {
            type: 'confirm',
            name: 'nunjucks',
            message: 'Add support for compiling Nunjucks template files',
            default: values.nunjucks
        },
        {
            type: 'confirm',
            name: 'less',
            message: 'Add support for compiling Less style files',
            default: values.less
        },
        {
            type: 'confirm',
            name: 'sass',
            message: 'Add support for compiling Sass/SCSS style files',
            default: values.sass
        }
    ];
}
exports.getQuestions = getQuestions;
function addComputedOptions(options) {
    return Object.assign({}, options, { projectNameCC: camelcase_1.default(options.projectName) });
}
function getAnswers(values) {
    const questions = getQuestions(values);
    return questions.reduce((result, question) => {
        const name = question.name;
        return Object.assign({}, result, { [name]: values[name] || question.default });
    }, {});
}
exports.getAnswers = getAnswers;
class EWAGenerator extends yeoman_generator_1.default {
    constructor(args, opts) {
        super(args, opts);
        this.log(`${name}@${version} init`);
        this.sourceRoot(path_1.default.resolve(__dirname, '../../../templates'));
        initCLIOptions(this);
    }
    prompting() {
        return __awaiter(this, void 0, void 0, function* () {
            const options = this.options;
            const cliValues = Object.assign({}, options);
            const questionDefaults = Object.assign({}, cliValues, { projectName: options.projectName });
            const answerValues = cliValues.projectName && cliValues.yes
                ? getAnswers(questionDefaults)
                : yield this.prompt(getQuestions(questionDefaults));
            this.props = addComputedOptions(answerValues);
            this.destinationRoot(this.props.projectName);
        });
    }
    writing() {
        const context = this.props;
        this.registerTransformStream(transforms.createTransformStream(context, [
            transforms.extensions,
            transforms.variables,
            transforms.conditionals
        ]));
        const binaryTemplateFiles = binaryUtils_1.getBinaryFiles(this.templatePath());
        const binaryIgnoreGlobs = binaryUtils_1.getBinaryIgnoreGlobs(binaryTemplateFiles);
        const conditionalIgnoreGlobs = conditionalSyntax_1.getConditionalSyntaxIgnoreGlobs(context);
        this.fs.copyTpl([this.templatePath('**/*'), ...binaryIgnoreGlobs], this.destinationPath(), context, {}, { globOptions: { dot: true, ignore: conditionalIgnoreGlobs } });
        binaryTemplateFiles.forEach(file => {
            this.fs.copy(this.templatePath(file), this.destinationPath(file));
        });
    }
    install() {
        const { install, yarn } = this.options;
        if (install) {
            if (yarn) {
                this.yarnInstall();
            }
            else {
                this.npmInstall();
            }
        }
    }
}
exports.default = EWAGenerator;
//# sourceMappingURL=Generator.js.map