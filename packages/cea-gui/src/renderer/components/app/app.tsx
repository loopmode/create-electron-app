import React from 'react';
import { hot } from 'react-hot-loader/root';

import Helmet from 'react-helmet';
import { HashRouter, Switch, Route } from 'react-router-dom';

import staticPath from 'renderer/utils/static-path';
import { Home } from 'renderer/components/screen-home/screen-home';
import { Create } from 'renderer/components/screen-create-project/screen-create-project';

const App: React.FC<{}> = () => {
  return (
    <div className="App">
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <script src={staticPath('scripts/fontawesome.v5.3.1.all.js')} />
      </Helmet>

      <HashRouter>
        <main className="is-fullwidth">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/create-project" component={Create} />
          </Switch>
        </main>
      </HashRouter>
    </div>
  );
};

export default hot(App);
