"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TRAILING_DELIMITER = '%';
function fixExtension(path) {
    if (path.extname) {
        return Object.assign({}, path, { extname: removeSuffix(path.extname, TRAILING_DELIMITER) });
    }
    return Object.assign({}, path, { basename: removeSuffix(path.basename, TRAILING_DELIMITER) });
}
exports.default = fixExtension;
function removeSuffix(value, suffix) {
    if (value && value.endsWith(suffix)) {
        return value.slice(0, -1);
    }
    return value;
}
//# sourceMappingURL=extensions.js.map