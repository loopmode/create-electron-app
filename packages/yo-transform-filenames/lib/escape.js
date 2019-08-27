"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function escape(value) {
    return (value
        .replace(/{/g, '\\{')
        .replace(/}/g, '\\}'));
}
exports.escape = escape;
//# sourceMappingURL=escape.js.map