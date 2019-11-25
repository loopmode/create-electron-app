import React from 'react';

import { Screen } from 'renderer/components/screen/Screen';
import { NavLink } from 'renderer/components/nav-link/NavLink';

export const HomeScreen = () => (
  <Screen className="HomeScreen">
    <h1>Let's create something!</h1>
    <ul>
      <li>
        <NavLink.Button primary to="/create-project">
          Create new app
        </NavLink.Button>
      </li>
    </ul>
  </Screen>
);
