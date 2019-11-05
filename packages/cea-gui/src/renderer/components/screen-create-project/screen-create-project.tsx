import React from 'react';
import { Switch } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { AppHeader } from 'renderer/components/app/app-header';
import { StepFormRoute } from 'renderer/components/step-form/step-form-route';
import { StepBreadcrumbs } from 'renderer/components/step-form/step-breadcrumbs';
import { ProjectBasicsForm } from './form-project-basics';
import { FrameworksForm } from './form-frameworks';
//https://codedaily.io/tutorials/50/Create-a-Form-Wizard-with-Data-Loss-Prevention-using-Formik-and-React-Router
export const Create = () => {
    const handleSubmit = React.useCallback((...args) => {
        console.log({ args });
    }, []);
    return (
        <div className="Create">
            <AppHeader />
            <section className="section">
                <div className="container">
                    <h3>Create new app</h3>
                    <StepBreadcrumbs
                        paths={[
                            { exact: true, to: '/create-project', children: 'ProjectBasics' },
                            { exact: true, to: '/create-project/frameworks', children: 'Frameworks' },
                            { exact: true, to: '/create-project/pre-processors', children: 'Pre-processors' },
                            { exact: true, to: '/create-project/misc', children: 'Misc' }
                        ]}
                    />
                    <Formik
                        initialValues={{
                            projectName: 'foo-app',
                            projectScope: '@foo',
                            framework: 'react'
                        }}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <Switch>
                                <StepFormRoute
                                    exact
                                    component={ProjectBasicsForm}
                                    prev="/"
                                    path="/create-project"
                                    next="/create-project/frameworks"
                                />
                                <StepFormRoute
                                    exact
                                    component={FrameworksForm}
                                    prev="/create-project"
                                    path="/create-project/frameworks"
                                    next="/create-project/frameworks"
                                />
                            </Switch>
                            <button className="button" type="submit">
                                submit
                            </button>
                        </Form>
                    </Formik>
                </div>
            </section>
        </div>
    );
};
