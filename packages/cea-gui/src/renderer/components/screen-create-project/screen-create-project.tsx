import React from 'react';
import { Switch } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { AppHeader } from 'renderer/components/app/app-header';
import { StepFormRoute } from 'renderer/components/step-form/step-form-route';
import { StepBreadcrumbs } from 'renderer/components/step-form/step-breadcrumbs';
import { ProjectNameStep } from './step-project-name';
import { FrameworksStep } from './step-frameworks';
import { PreprocessorsStep } from './step-preprocessors';
import styled from 'styled-components';
import { MiscStep } from './step-misc';

//https://codedaily.io/tutorials/50/Create-a-Form-Wizard-with-Data-Loss-Prevention-using-Formik-and-React-Router

const initialValues = {
  projectName: '',
  projectScope: '',
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

export const Create = () => {
  const handleSubmit = React.useCallback((...args) => {
    console.log({ args });
  }, []);
  return (
    <StyledContainer className="Create">
      <AppHeader />
      <section className="section">
        <div className="container">
          <StepBreadcrumbs
            paths={[
              { exact: true, to: '/create-project', children: 'ProjectBasics' },
              { exact: true, to: '/create-project/frameworks', children: 'Frameworks' },
              { exact: true, to: '/create-project/preprocessors', children: 'Pre-processors' },
              { exact: true, to: '/create-project/misc', children: 'Misc' }
            ]}
          />
          <hr />
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <Switch>
                <StepFormRoute
                  exact
                  component={ProjectNameStep}
                  prev="/"
                  path="/create-project"
                  next="/create-project/frameworks"
                />
                <StepFormRoute
                  exact
                  component={FrameworksStep}
                  prev="/create-project"
                  path="/create-project/frameworks"
                  next="/create-project/preprocessors"
                />
                <StepFormRoute
                  exact
                  component={PreprocessorsStep}
                  prev="/create-project/frameworks"
                  path="/create-project/preprocessors"
                  next="/create-project/misc"
                />
                <StepFormRoute
                  exact
                  component={MiscStep}
                  prev="/create-project/preprocessors"
                  path="/create-project/misc"
                />
              </Switch>
            </Form>
          </Formik>
        </div>
      </section>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  .step-content {
    min-height: 200px;
    &:before,
    &:after {
      // prevent margin collapsing
      content: ' ';
      display: table;
    }
  }
`;
