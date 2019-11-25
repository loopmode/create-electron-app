import React from 'react';
import { Formik, Form } from 'formik';
import { hot } from 'react-hot-loader';

import { XTerminal, usePty } from '@loopmode/xpty';

import { SectionGeneral } from './sections/SectionGeneral';
import { SectionFrameworks } from './sections/SectionFrameworks';
import { SectionPreprocessors } from './sections/SectionPreprocessors';
import { SectionMisc } from './sections/SectionMisc';

import { FormValues, ValidationSchema } from './schema';

import { Screen } from 'renderer/components/screen/Screen';
import { NavLink } from 'renderer/components/nav-link/NavLink';
import { CaretIcon } from 'renderer/components/caret-icon/CaretIcon';

import { createCLICommand } from './utils';

import ElectronStore from 'electron-store';

const store = new ElectronStore<{ formValues: FormValues }>();

const defaultInitialValues: FormValues = {
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

const initialValues = store.get('formValues', defaultInitialValues);

export const CreateProjectScreen: React.FC<{}> = () => {
  const { pty, execute } = usePty();

  const { current: handleSubmit } = React.useRef(({ cwd, ...values }: FormValues) => {
    const command = createCLICommand(values);
    execute(command, { cwd });
    store.set('formValues', { cwd, ...values });
  });

  return (
    <Screen className="CreateProjectScreen">
      <NavLink.Button to="/" primary>
        <CaretIcon dir="left" className="mr-0" /> Back
      </NavLink.Button>
      <h2>Create electron-webpack app</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={ValidationSchema}>
        {({ errors, touched }) => (
          <Form>
            <SectionGeneral errors={errors} touched={touched} />
            <SectionFrameworks />
            <SectionPreprocessors />
            <SectionMisc />
            <div className="is-flex mb-2">
              <button className="button is-success is-pulled-right" type="submit">
                Create
              </button>
            </div>
            <XTerminal readOnly={process.env.NODE_ENV === 'production'} pty={pty} />
          </Form>
        )}
      </Formik>
    </Screen>
  );
};

export default hot(module)(CreateProjectScreen);
