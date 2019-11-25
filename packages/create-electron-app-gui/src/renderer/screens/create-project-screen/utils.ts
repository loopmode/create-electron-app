import { joinName } from '@loopmode/generator-electron-app/lib/utils/packageUtils';
import { options } from '@loopmode/generator-electron-app/lib/generators/app/options';

import { FormValueTypes } from './schema';

export function createCLICommand(values: Partial<FormValueTypes>, ignoredKeys?: string[]) {
  const { framework, packageName = '', packageScope = '', ...flags } = values;
  if (framework) {
    Object.assign(flags, { [framework]: true });
  }
  const args = Object.entries(flags).reduce(
    (result: string[], [key, value]) => {
      if (ignoredKeys && ignoredKeys.includes(key)) {
        return result;
      }
      if (!value && options.find(o => o.name === key && o.default)) {
        return [`--skip-${key}`, ...result];
      }
      if (!value) {
        return result;
      }
      return [`--${key}`, ...result];
    },
    ['--yes']
  );

  const name = joinName({ packageName, packageScope });
  return `yarn create @loopmode/electron-app ${name} ${args.join(' ')}`;
}
