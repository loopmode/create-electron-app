import React from 'react';
import { Link } from 'react-router-dom';
import { AppHeader } from './AppHeader';

export const Home = () => {
    return (
        <div className="Home">
            <AppHeader />
            <section className="section">
                <div className="container">
                    <Link to="/create">Create new app</Link>
                </div>
            </section>
        </div>
    );
};
