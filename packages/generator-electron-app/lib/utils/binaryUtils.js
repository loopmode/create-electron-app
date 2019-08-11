"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const glob_1 = __importDefault(require("glob"));
const binary_extensions_1 = __importDefault(require("binary-extensions"));
const knownBinaryExtensions = [...binary_extensions_1.default, 'eps'];
function getBinaryFiles(dir, ignoredExtensions = []) {
    return glob_1.default.sync(`**/*.{${[...knownBinaryExtensions, ...ignoredExtensions].join(',')}}`, {
        cwd: path_1.default.resolve(dir)
    });
}
exports.getBinaryFiles = getBinaryFiles;
function getBinaryIgnoreGlobs(files) {
    const globs = files.map(file => `!**/*${path_1.default.extname(file)}`);
    return new Set(globs);
}
exports.getBinaryIgnoreGlobs = getBinaryIgnoreGlobs;
//# sourceMappingURL=binaryUtils.js.map