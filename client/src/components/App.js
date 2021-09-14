import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './header/Header';
import HomePage from './home/HomePage';
import ResultsPage from './results/ResultsPage';
import DetailPage from './detail/DetailPage';

import './App.scss';

/**
 * App Component
 */
const App = () => {
  return (
    <div className='wrapper'>
      <Header />
      <div className='wrapper__route'>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/items/:slug' component={DetailPage} />
          <Route path='/items' component={ResultsPage} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
