import React from 'react';
import { Link } from 'react-router-dom';

export const AppHeader = () => {
  return (
    <header className="hero is-primary">
      <div className="hero-body">
        <div className="container">
          <h1>
            <Link to="/">CEA-GUI</Link>
          </h1>
        </div>
      </div>
    </header>
  );
};
