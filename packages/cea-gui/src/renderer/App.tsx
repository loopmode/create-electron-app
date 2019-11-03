import React from 'react';
import { hot } from 'react-hot-loader/root';

import Helmet from 'react-helmet';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import { Home } from './components/Home';

import { Create } from './components/Create/Create';

const App: React.FC<{}> = () => {
    return (
        <div className="App">
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            </Helmet>
            <MemoryRouter>
                <main className="is-fullwidth">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/create" component={Create} />
                    </Switch>
                </main>
            </MemoryRouter>
        </div>
    );
};

export default hot(App);
