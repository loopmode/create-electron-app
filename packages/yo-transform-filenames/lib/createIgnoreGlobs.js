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
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = __importDefault(require("glob"));
const renderPath_1 = require("./renderPath");
function createIgnoreGlobs(dir, context, globOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        const candidates = glob_1.default.sync('**/*{%*', Object.assign({ dot: true, cwd: dir }, globOptions));
        return candidates.reduce((result, candidate) => {
            const rendered = renderPath_1.renderPath(candidate, context);
            if (rendered.ignore) {
                const safeGlob = candidate.replace(/'/g, '*');
                result.push(`**/*${safeGlob}*`, `**/*${safeGlob}*/*`);
            }
            return result;
        }, []);
    });
}
exports.createIgnoreGlobs = createIgnoreGlobs;
//# sourceMappingURL=createIgnoreGlobs.js.map