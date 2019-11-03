import React from 'react';
import { Breadcrumbs } from '../BreadcrumbSteps/BreadcrumbSteps';
import { AppHeader } from './../AppHeader';
import { Formik, Form } from 'formik';
import { Switch, Route } from 'react-router-dom';
import { StartForm } from './forms/StartForm';

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
                    <Breadcrumbs
                        paths={[
                            { exact: true, to: '/create-project', children: 'Start' },
                            { exact: true, to: '/create-project/frameworks', children: 'Frameworks' },
                            { exact: true, to: '/create-project/pre-processors', children: 'Pre-processors' },
                            { exact: true, to: '/create-project/misc', children: 'Misc' }
                        ]}
                    />
                    <Formik
                        initialValues={{
                            email: '',
                            firstName: '',
                            lastName: '',
                            address: '',
                            city: '',
                            state: '',
                            zipCode: '',
                            tos: false
                        }}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <Switch>
                                <Route exact path="/create-project" component={StartForm} />
                            </Switch>
                        </Form>
                    </Formik>
                </div>
            </section>
        </div>
    );
};
