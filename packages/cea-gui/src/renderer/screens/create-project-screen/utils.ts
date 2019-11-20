import { joinName } from '@loopmode/generator-electron-app/lib/utils/packageUtils';
import { FormValueTypes } from './schema';

export function createCLICommand(values: FormValueTypes, ignoredKeys?: string[]) {
  const { framework, packageName, packageScope, ...flags } = values;
  if (framework) {
    Object.assign(flags, { [framework]: true });
  }
  const args = Object.entries(flags).reduce(
    (result: string[], [key, value]) => {
      if (!value) return result;
      if (ignoredKeys && ignoredKeys.includes(key)) return result;
      return [`--${key}`, ...result];
    },
    ['--yes', '--install']
  );

  const name = joinName({ packageName, packageScope });
  return `yarn create @loopmode/electron-app ${name} ${args.join(' ')}`;
}
