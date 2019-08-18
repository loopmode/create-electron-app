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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const yeoman_generator_1 = __importDefault(require("yeoman-generator"));
const binaryUtils_1 = require("../../utils/binaryUtils");
const conditionalSyntax_1 = require("../../utils/conditionalSyntax");
const questionsUtils_1 = require("../../utils/questionsUtils");
const renameTransform = __importStar(require("../../utils/rename-transform"));
const { name, version } = require('../../../package.json');
class EWAGenerator extends yeoman_generator_1.default {
    constructor(args, opts) {
        super(args, opts);
        this.log(`${name}@${version} init`);
        this.sourceRoot(path_1.default.resolve(__dirname, '../../../templates'));
        this.argument('projectName', {
            type: String,
            required: false,
            description: 'Name for the new project'
        });
        questionsUtils_1.initOptions(this);
    }
    prompting() {
        return __awaiter(this, void 0, void 0, function* () {
            const options = this.options;
            const cliValues = Object.assign({}, options);
            const questionDefaults = Object.assign({}, cliValues, { projectName: options.projectName });
            const userOptions = yield questionsUtils_1.getAnswers(this, cliValues, questionDefaults);
            this.props = questionsUtils_1.addComputedOptions(userOptions);
            this.destinationRoot(this.props.projectName);
        });
    }
    writing() {
        const context = this.props;
        this.registerTransformStream(renameTransform.createTransformStream(context, [
            renameTransform.extensions,
            renameTransform.variables,
            renameTransform.conditionals
        ]));
        const binaryTemplateFiles = binaryUtils_1.getBinaryFiles(this.templatePath());
        const binaryIgnoreGlobs = binaryUtils_1.getBinaryIgnoreGlobs(binaryTemplateFiles);
        const conditionalIgnoreGlobs = conditionalSyntax_1.getConditionalSyntaxIgnoreGlobs(context);
        this.fs.copyTpl([this.templatePath('**/*'), ...binaryIgnoreGlobs], this.destinationPath(), context, {}, { globOptions: { dot: true, ignore: conditionalIgnoreGlobs } });
        binaryTemplateFiles.forEach(file => {
            this.fs.copy(this.templatePath(file), this.destinationPath(file));
        });
    }
    install() {
        const { install, yarn } = this.options;
        if (install) {
            if (yarn) {
                this.yarnInstall();
            }
            else {
                this.npmInstall();
            }
        }
    }
}
exports.default = EWAGenerator;
//# sourceMappingURL=EWAGenerator.js.map