import { FormValues } from './schema';
import { store } from 'renderer/store';

// these values are used the very first time.
export const defaultInitialValues: FormValues = {
  cwd: '',
  packageName: '',
  packageScope: '',
  framework: '',
  typescript: false,

  sass: false,
  less: false,
  eslint: true,
  prettier: true,

  ejs: false,
  nunjucks: false,
  notifications: true,

  install: false,
  yarn: true,
  git: false
};

export const initialValues = store.get('values', defaultInitialValues);

export const persistInitialValues = (values: FormValues) => store.set('values', values);
