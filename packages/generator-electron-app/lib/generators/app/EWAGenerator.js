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
const path_1 = __importDefault(require("path"));
const yeoman_generator_1 = __importDefault(require("yeoman-generator"));
const binaryUtils_1 = require("../../utils/binaryUtils");
const questionsUtils_1 = require("../../utils/questionsUtils");
const yo_transform_filenames_1 = require("@loopmode/yo-transform-filenames");
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
            let userOptions = yield questionsUtils_1.getAnswers(this, cliValues, questionDefaults);
            userOptions = questionsUtils_1.applyImplicitOptions(userOptions);
            this.props = questionsUtils_1.addComputedOptions(userOptions);
            this.destinationRoot(this.props.projectName);
        });
    }
    writing() {
        return __awaiter(this, void 0, void 0, function* () {
            const context = this.props;
            this.registerTransformStream(yo_transform_filenames_1.createTransformStream(context));
            const binaryTemplateFiles = binaryUtils_1.getBinaryFiles(this.templatePath());
            binaryTemplateFiles.forEach(file => {
                this.fs.copy(this.templatePath(file), this.destinationPath(file));
            });
            this.fs.copyTpl([this.templatePath('**/*'), ...binaryUtils_1.getBinaryIgnoreGlobs(binaryTemplateFiles)], this.destinationPath(), context, {}, {
                globOptions: {
                    dot: true,
                    ignore: yield yo_transform_filenames_1.createIgnoreGlobs(this.templatePath(), context)
                }
            });
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