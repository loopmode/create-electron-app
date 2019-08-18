"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_rename_1 = __importDefault(require("gulp-rename"));
function createRenamingStream(context, transforms) {
    return gulp_rename_1.default((path) => {
        applyContextVariablesToPath(path, context, transforms);
    });
}
exports.default = createRenamingStream;
function applyContextVariablesToPath(path, context, transforms) {
    const contextEntries = Object.entries(context);
    contextEntries.forEach(contextEntry => {
        Object.assign(path, transformPath(path, ...transforms.map((transform) => [transform, contextEntry])));
    });
}
function transformPath(path, ...transformations) {
    return transformations.reduce((result, [transform, variable]) => {
        return transform(result, variable);
    }, path);
}
//# sourceMappingURL=createTransformStream.js.map