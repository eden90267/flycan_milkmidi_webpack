import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from './component/Navigation';
import '../css/app.scss';

const Main = () => <h1>Main</h1>;

const About = () => <h1>About</h1>;

const App = () => (
  <Router>
    <main className="wrap">
      <Navigation />
      <Route exact path="/" component={Main}/>
      <Route path="/about" component={About}/>
    </main>
  </Router>
);


render(<App/>, document.getElementById('app'));

if (module && module.hot) {
  module.hot.accept();
}
