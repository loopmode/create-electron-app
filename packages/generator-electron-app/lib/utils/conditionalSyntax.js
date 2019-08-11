"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const D = {
    VARNAME_START: '%',
    BOOLEAN_AND: ' && ',
    TERNARY_AND: ' == ',
    TERNARY_OR: ' !! '
};
exports.Delimiters = D;
exports.DEFAULT_CONDITIONAL_SYNTAX_REGEXP = new RegExp(`(.*)${D.VARNAME_START}(.*)(${D.BOOLEAN_AND}|${D.TERNARY_AND})(.*)(?:${D.TERNARY_OR})?(.*)?`);
exports.DEFAULT_CREATE_IGNORE_GLOBS = (key, value) => {
    const varname = value ? `!${key}` : key;
    const glob = `**/*${D.VARNAME_START}${varname}${D.BOOLEAN_AND}*`;
    return [glob, `${glob}/*`];
};
function getConditionalSyntaxIgnoreGlobs(context, createGlob = exports.DEFAULT_CREATE_IGNORE_GLOBS) {
    return Object.entries(context).reduce((result, [key, value]) => {
        const globs = createGlob(key, value);
        return [...result, ...(Array.isArray(globs) ? globs : [globs])];
    }, []);
}
exports.getConditionalSyntaxIgnoreGlobs = getConditionalSyntaxIgnoreGlobs;
//# sourceMappingURL=conditionalSyntax.js.map