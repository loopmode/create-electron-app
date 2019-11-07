import React from 'react';
import { Link } from 'react-router-dom';
import { AppHeader } from 'renderer/components/app/app-header';

export const Home = () => {
  return (
    <div className="Home">
      <AppHeader />
      <section className="section">
        <div className="container">
          <Link to="/create-project">Create new app</Link>
        </div>
      </section>
    </div>
  );
};
