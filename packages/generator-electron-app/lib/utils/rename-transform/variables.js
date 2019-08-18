"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function injectVariable(path, variable) {
    if (!variable)
        return path;
    const [key, value] = variable;
    return {
        dirname: inject(path.dirname, [key, value]),
        basename: inject(path.basename, [key, value]),
        extname: inject(path.extname, [key, value])
    };
}
exports.default = injectVariable;
function inject(str, variable) {
    if (!variable || !str)
        return str;
    const [key, value] = variable;
    const regExp = new RegExp(`%(${key})%`);
    if (str.match(regExp)) {
        str = str.replace(regExp, value);
    }
    return str;
}
//# sourceMappingURL=variables.js.map