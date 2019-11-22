import { EWAGeneratorOptions, GeneratorOption } from '../types';

import { options as appOptions } from '../generators/app/options';
import Generator, { Question, Answers } from 'yeoman-generator';
import camelcase = require('camelcase');
const validators = {
  required(value: string): boolean | string {
    return value ? true : 'This field is required';
  }
};

export function initOptions(generator: Generator) {
  appOptions.forEach(({ name, description, ...option }) => {
    if (description && description.endsWith('?')) {
      description = description.substr(0, description.length - 1);
    }
    generator.option(name, { description, ...option });
  });
}

function getQuestions(values: EWAGeneratorOptions): Question[] {
  const typeMap: Record<string, string> = {
    Boolean: 'confirm'
  };
  return [
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name',
      default: values.projectName,
      validate: validators.required
    },
    ...appOptions
      .filter(option => !option.internal)
      .map(option => {
        return {
          name: option.name,
          type: (option.type && typeMap[option.type.name]) || 'input',
          default: (values as Record<string, any>)[option.name],
          message: option.description
        } as Question;
      })
  ];
}

/**
 * Adds custom or computed values to those provided by the user
 * @param options given yo questions and answers
 * @return generator options usable by our templates
 */
export function addComputedOptions(options: EWAGeneratorOptions): EWAGeneratorOptions {
  return {
    ...options,
    projectNameCC: camelcase(options.projectName as string)
  };
}

const defaultInternalOptions: EWAGeneratorOptions = {
  electronWebpackConfig: false,
  defaultRendererTemplate: true
};

export async function getAnswers(
  generator: Generator,
  cliValues: EWAGeneratorOptions,
  defaults: EWAGeneratorOptions
): Promise<EWAGeneratorOptions> {
  let currentQuestions = getQuestions(defaults);
  let currentResult: EWAGeneratorOptions = {
    ...defaultInternalOptions,
    projectName: cliValues.projectName
  };

  if (cliValues.projectName && cliValues.yes) {
    // earliest exit: projectName is given, yes is specified; use defaults
    currentResult = { ...currentResult, ...getDefaultAnswers(currentQuestions, defaults) };
    return currentResult;
  }

  {
    const { result, questions } = await askProjectNameQuestion({ currentResult, currentQuestions, generator });
    currentResult = result;
    currentQuestions = questions;
  }

  {
    const { result, questions, skipQuestions } = await askSkipQuestion({
      currentResult,
      currentQuestions,
      generator,
      cliValues,
      defaults
    });
    currentResult = result;
    currentQuestions = questions;

    if (skipQuestions) {
      return currentResult;
    }
  }

  {
    const { result, questions } = await askVerboseQuestion({
      currentResult,
      currentQuestions,
      generator,
      cliValues
    });
    currentResult = result;
    currentQuestions = questions;
  }

  const userQuestions = getUserQuestions(currentQuestions, cliValues);
  const userAnswers = await generator.prompt(userQuestions);
  currentResult = { ...currentResult, ...userAnswers };

  return currentResult;
}

interface QuestionModifierArgs {
  currentResult: EWAGeneratorOptions;
  currentQuestions: Question[];
  generator: Generator;
}
interface QuestionModifierResult {
  result: EWAGeneratorOptions;
  questions: Question[];
}

async function askProjectNameQuestion({
  currentResult: result,
  currentQuestions: questions,
  generator
}: QuestionModifierArgs): Promise<QuestionModifierResult> {
  const nameQuestion = questions.find(question => question.name === 'projectName');
  if (nameQuestion) {
    questions = questions.filter(question => question !== nameQuestion);
  }

  if (nameQuestion && !result.projectName) {
    const { projectName } = await generator.prompt(nameQuestion);
    result = { ...result, projectName };
  }

  return { result, questions };
}

interface SkipQuestionArgs extends QuestionModifierArgs {
  cliValues: EWAGeneratorOptions;
  defaults: EWAGeneratorOptions;
}
interface SkipQuestionResult extends QuestionModifierResult {
  skipQuestions: boolean;
}

async function askSkipQuestion({
  currentResult: result,
  currentQuestions: questions,
  generator,
  cliValues,
  defaults
}: SkipQuestionArgs): Promise<SkipQuestionResult> {
  // ask the user if he would like to skip the questions
  let skipQuestions = false;
  const yesQuestion = questions.find(question => question.name === 'yes');
  if (yesQuestion) {
    questions = questions.filter(question => question !== yesQuestion);
    if (!cliValues.verbose) {
      const { yes } = await generator.prompt({ ...yesQuestion, default: true });
      if (yes) {
        // second earliest exit: projectName is given, user chose to skip questions; use defaults
        result = { ...result, ...getDefaultAnswers(questions, defaults) };
        skipQuestions = true;
      }
    }
  }
  return { questions, result, skipQuestions };
}

interface VerboseQuestionArgs extends QuestionModifierArgs {
  cliValues: EWAGeneratorOptions;
}
async function askVerboseQuestion({
  currentResult: result,
  currentQuestions: questions,
  generator,
  cliValues
}: VerboseQuestionArgs): Promise<QuestionModifierResult> {
  // ask the user if he wants to answer all questions (verbose) or just the common ones
  const verboseQuestion = questions.find(question => question.name === 'verbose');
  if (verboseQuestion) {
    questions = questions.filter(question => question !== verboseQuestion);
    if (!cliValues.verbose) {
      const { verbose } = await generator.prompt({ ...verboseQuestion, default: false });
      // when user does NOT choose verbose, use default values for the verbose options
      if (!verbose) {
        const verboseDefaults = appOptions
          .filter(o => o.verbose)
          .reduce((result, o) => Object.assign(result, { [o.name]: o.default }), {});
        result = { ...result, ...verboseDefaults };
      }
    }
  }
  return { result, questions };
}

function getUserQuestions(questions: Question[], cliValues: EWAGeneratorOptions) {
  const filters = [
    // internal options should never be asked via questions
    function internalFilter(question: Question): boolean {
      const option = appOptions.find(o => o.name === question.name);
      return !(option && option.internal);
    },
    // verbose options should only be asked when the verbose flag is set
    function verboseFilter(question: Question): boolean {
      const option: GeneratorOption = appOptions.find(o => o.name === question.name) as GeneratorOption;
      if (option && option.verbose) {
        return cliValues.verbose || false;
      }
      return true;
    }
  ];
  const userQuestions = questions.reduce((result: Question[], question: Question) => {
    if (filters.every(filter => filter(question))) {
      result.push(question);
    }
    return result;
  }, []);

  return userQuestions;
}

function getDefaultAnswers(questions: Question[], defaults: EWAGeneratorOptions): Answers {
  return questions.reduce((result, question) => {
    const name = question.name as string;
    const value = (defaults as any)[name] || question.default;
    if (value === undefined) {
      return result;
    }
    return {
      ...result,
      [name]: value
    };
  }, {});
}

export function applyImplicitOptions(options: EWAGeneratorOptions): EWAGeneratorOptions {
  if (options.react) {
    if (!options.webpack) logImplicitOverrides({ react: { webpack: true } });
    options.webpack = true;
    options.defaultRendererTemplate = false;
  }
  if (options.vue) {
    options.defaultRendererTemplate = false;
  }
  if (options.webpack) {
    options.electronWebpackConfig = true;
  }

  return options;
}

function logImplicitOverrides(dependencies: Record<string, Record<string, unknown>>): void {
  console.log('');
  console.info('Overriding user choices:');
  Object.entries(dependencies).forEach(([reason, overrides]) => {
    console.info(`  - ${reason} requires`);
    Object.entries(overrides).forEach(([override, value]) => {
      console.info(`      - ${override}=${value}`);
    });
  });
  console.log('');
}
