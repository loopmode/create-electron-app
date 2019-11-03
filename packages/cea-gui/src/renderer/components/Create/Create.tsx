import React from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { AppHeader } from './../AppHeader';

export const Create = () => {
    return (
        <div className="Create">
            <AppHeader />
            <section className="section">
                <div className="container">
                    <Breadcrumbs />
                    <h3>Create new app</h3>
                </div>
            </section>
        </div>
    );
};
