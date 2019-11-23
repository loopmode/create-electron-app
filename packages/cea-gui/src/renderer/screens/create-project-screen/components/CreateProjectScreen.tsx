import React from 'react';
import { Formik, Form } from 'formik';

import { hot } from 'react-hot-loader';

import { SectionGeneral } from './SectionGeneral';
import { SectionFrameworks } from './SectionFrameworks';
import { SectionPreprocessors } from './SectionPreprocessors';
import { SectionMisc } from './SectionMisc';

import { XTerminal } from '@loopmode/xpty';

import { FormValueTypes, FormSchema } from '../schema';
import { useRunner } from '../runner';
import { Screen } from 'renderer/components/screen/Screen';
import { NavLink } from 'renderer/components/nav-link/NavLink';
import { CaretIcon } from 'renderer/components/caret-icon/CaretIcon';

const initialValues: FormValueTypes = {
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
  notifications: true
};

export const CreateProjectScreen: React.FC<{}> = () => {
  const { ptyProcess, execute } = useRunner();

  return (
    <Screen className="CreateProjectScreen">
      <NavLink.Button to="/" primary>
        <CaretIcon dir="left" className="mr-0" /> Back
      </NavLink.Button>
      <h2>Create electron-webpack app</h2>
      <Formik initialValues={initialValues} onSubmit={execute} validationSchema={FormSchema}>
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
            <XTerminal readOnly={process.env.NODE_ENV === 'production'} ptyProcess={ptyProcess} />
          </Form>
        )}
      </Formik>
    </Screen>
  );
};

export default hot(module)(CreateProjectScreen);
