"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const options_1 = require("../generators/app/options");
const camelcase = require("camelcase");
const validators = {
    required(value) {
        return value ? true : 'This field is required';
    }
};
function initOptions(generator) {
    options_1.options.forEach((_a) => {
        var { name, description } = _a, option = __rest(_a, ["name", "description"]);
        if (description && description.endsWith('?')) {
            description = description.substr(0, description.length - 1);
        }
        generator.option(name, Object.assign({ description }, option));
    });
}
exports.initOptions = initOptions;
function getQuestions(values) {
    const typeMap = {
        Boolean: 'confirm'
    };
    return [
        {
            type: 'input',
            name: 'projectName',
            message: 'Project name',
            default: values.projectName,
            validate: validators.required
        },
        ...options_1.options
            .filter(option => !option.internal)
            .map(option => {
            return {
                name: option.name,
                type: (option.type && typeMap[option.type.name]) || 'input',
                default: values[option.name],
                message: option.description
            };
        })
    ];
}
function addComputedOptions(options) {
    return Object.assign({}, options, { projectNameCC: camelcase(options.projectName) });
}
exports.addComputedOptions = addComputedOptions;
const defaultInternalOptions = {
    electronWebpackConfig: false,
    defaultRendererTemplate: true
};
function getAnswers(generator, cliValues, defaults) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = Object.assign({}, defaultInternalOptions, { projectName: cliValues.projectName });
        function getDefaultAnswers() {
            return questions.reduce((result, question) => {
                const name = question.name;
                const value = defaults[name] || question.default;
                if (value === undefined) {
                    return result;
                }
                return Object.assign({}, result, { [name]: value });
            }, {});
        }
        const questions = getQuestions(defaults);
        if (cliValues.projectName && cliValues.yes) {
            return Object.assign(result, getDefaultAnswers());
        }
        {
            const nameQuestion = questions.find(question => question.name === 'projectName');
            if (nameQuestion) {
                questions.splice(questions.indexOf(nameQuestion), 1);
            }
            if (nameQuestion && !result.projectName) {
                const answers = yield generator.prompt(nameQuestion);
                result.projectName = answers.projectName;
            }
        }
        {
            const yesQuestion = questions.find(question => question.name === 'yes');
            if (yesQuestion) {
                questions.splice(questions.indexOf(yesQuestion), 1);
                const answers = yield generator.prompt(Object.assign({}, yesQuestion, { default: true }));
                if (answers.yes) {
                    return Object.assign(result, getDefaultAnswers());
                }
            }
        }
        const notInternal = (question) => {
            const option = options_1.options.find(o => o.name === question.name);
            return !(option && option.internal);
        };
        const userAnswers = yield generator.prompt(questions.filter(notInternal));
        return Object.assign(result, userAnswers);
    });
}
exports.getAnswers = getAnswers;
function applyImplicitOptions(options) {
    if (options.react) {
        if (!options.webpack)
            logImplicitOverrides({ react: { webpack: true } });
        options.webpack = true;
        options.defaultRendererTemplate = false;
    }
    if (options.vue) {
        options.defaultRendererTemplate = false;
    }
    if (options.webpack) {
        options.electronWebpackConfig = true;
    }
    return options;
}
exports.applyImplicitOptions = applyImplicitOptions;
function logImplicitOverrides(dependencies) {
    console.log('');
    console.info('Overriding user choices:');
    Object.entries(dependencies).forEach(([reason, overrides]) => {
        console.info(`  - ${reason} requires`);
        Object.entries(overrides).forEach(([override, value]) => {
            console.info(`      - ${override}=${value}`);
        });
    });
    console.log('');
}
//# sourceMappingURL=questionsUtils.js.map