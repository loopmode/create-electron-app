"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conditionalSyntax_1 = require("../conditionalSyntax");
function normalizeConditionals(path, variable, regExp = conditionalSyntax_1.DEFAULT_CONDITIONAL_SYNTAX_REGEXP) {
    if (!variable)
        return path;
    const [key, value] = variable;
    const result = {
        dirname: normalizeString(path.dirname, [key, value], regExp),
        basename: normalizeString(path.basename, [key, value], regExp),
        extname: normalizeString(path.extname, [key, value], regExp)
    };
    return result;
}
exports.default = normalizeConditionals;
function normalizeString(inputString, variable, regExp) {
    if (!inputString || inputString === '.' || !variable) {
        return inputString;
    }
    const matches = inputString.match(regExp);
    if (!matches) {
        return inputString;
    }
    const [key, value] = variable;
    const [, path, varname, , filename] = matches;
    if (varname !== key && varname !== `!${key}`) {
        return inputString;
    }
    if ((varname === key && value) ||
        (varname === `!${key}` && !value)) {
        return `${path}${filename}`;
    }
    if (varname === key && filename.includes(conditionalSyntax_1.Delimiters.TERNARY_OR)) {
        const ternaryResult = filename.split(conditionalSyntax_1.Delimiters.TERNARY_OR)[value ? 0 : 1];
        return `${path}${ternaryResult}`;
    }
    return inputString;
}
//# sourceMappingURL=conditionals.js.map