import React from 'react';
import { Formik, Form } from 'formik';
import { hot } from 'react-hot-loader';
import cx from 'classnames';

import { XTerminal, usePty } from '@loopmode/xpty';

import { Screen } from 'renderer/components/screen/Screen';
import { NavLink } from 'renderer/components/nav-link/NavLink';
import { CaretIcon } from 'renderer/components/caret-icon/CaretIcon';

import { initialValues, persistInitialValues } from './initial-values';
import { createCLICommand } from './utils';
import { FormValues, ValidationSchema } from './schema';

import { SectionGeneral } from './sections/SectionGeneral';
import { SectionFrameworks } from './sections/SectionFrameworks';
import { SectionPreprocessors } from './sections/SectionPreprocessors';
import { SectionMisc } from './sections/SectionMisc';
import { ButtonGroup } from 'renderer/components/button-group/button-group';

import { doneMessage } from '@loopmode/generator-electron-app/lib/utils/doneMessage';
import { IPty } from 'node-pty';

function useDoneCallback(pty: IPty | null, callback: () => void) {
  React.useEffect(() => {
    if (!pty) {
      return () => null;
    }
    const { dispose } = pty.onData(data => {
      if (data.includes(doneMessage)) {
        dispose();
        setTimeout(callback);
      }
    });
    return () => dispose();
  }, [pty, callback]);
}

export const CreateProjectScreen: React.FC<{}> = () => {
  const { pty, execute, abort, kill } = usePty();

  useDoneCallback(pty, () => console.info('DONE!'));
  const { current: handleSubmit } = React.useRef((formValues: FormValues) => {
    const { cwd, ...values } = formValues;
    persistInitialValues({ cwd, ...values });

    const command = createCLICommand(values);
    execute(command, { cwd });
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
            <ButtonGroup className="mt-2 mb-1" right>
              <button className={cx('button is-danger', { 'is-hidden': !pty })} type="button" onClick={() => kill()}>
                Kill
              </button>
              <span className="is-flex-1" />
              <button className={cx('button is-success', { 'is-hidden': pty })} type="submit">
                Create
              </button>
              <button className={cx('button is-warning', { 'is-hidden': !pty })} type="button" onClick={() => abort()}>
                Abort
              </button>
            </ButtonGroup>
            <XTerminal readOnly={process.env.NODE_ENV === 'production'} pty={pty} />
          </Form>
        )}
      </Formik>
    </Screen>
  );
};

export default hot(module)(CreateProjectScreen);
