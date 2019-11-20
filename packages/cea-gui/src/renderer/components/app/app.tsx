import React from 'react';
import Helmet from 'react-helmet';
import { hot } from 'react-hot-loader/root';
import staticPath from 'renderer/utils/static-path';
import { CreateProjectScreen } from 'renderer/screens/create-project-screen';
import { HashRouter as Router, Route } from 'react-router-dom';
import { HomeScreen } from 'renderer/screens/home-screen/HomeScreen';

const App: React.FC = () => (
  <div className="App">
    <Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <script src={staticPath('scripts/fontawesome.v5.3.1.all.js')} />
    </Helmet>
    <Router>
      <Route path="/" exact component={HomeScreen} />
      <Route path="/create-project" component={CreateProjectScreen} />
    </Router>
  </div>
);

export default hot(App);
