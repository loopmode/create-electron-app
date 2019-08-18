"use strict";
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
        var { name } = _a, option = __rest(_a, ["name"]);
        return generator.option(name, option);
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
        ...options_1.options.map(option => {
            return {
                name: option.name,
                type: (option.type && typeMap[option.type.name]) || 'input',
                default: values[option.name],
                message: option.description
            };
        })
    ];
}
exports.getQuestions = getQuestions;
function getAnswers(options) {
    const values = options;
    return getQuestions(values).reduce((result, question) => {
        const name = question.name;
        return Object.assign({}, result, { [name]: values[name] || question.default });
    }, {});
}
exports.getAnswers = getAnswers;
function addComputedOptions(options) {
    return Object.assign({}, options, { projectNameCC: camelcase(options.projectName) });
}
exports.addComputedOptions = addComputedOptions;
//# sourceMappingURL=questionsUtils.js.map