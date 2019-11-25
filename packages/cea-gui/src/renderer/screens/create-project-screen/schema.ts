import * as Yup from 'yup';
import { KeyValueItem } from 'renderer/components/xterminal/types';

export interface FormValueTypes {
  cwd: string;
  packageName: string;
  packageScope: string;
  framework: string;
  typescript: boolean;

  sass: boolean;
  less: boolean;
  eslint: boolean;
  prettier: boolean;

  ejs: boolean;
  nunjucks: boolean;
  notifications: true;

  install: boolean;
  yarn: boolean;
  git: boolean;

  env?: KeyValueItem[];
}

const alphanumeric = {
  regex: /^[a-zA-Z0-9-_]+$/,
  message: 'Must contain only alphanumeric characters, dashes or underscores'
};

export const FormSchema = Yup.object().shape({
  cwd: Yup.string().required('Required'),
  packageName: Yup.string()
    .required('Required')
    .matches(alphanumeric.regex, alphanumeric.message),
  packageScope: Yup.string().matches(alphanumeric.regex, alphanumeric.message)
});
