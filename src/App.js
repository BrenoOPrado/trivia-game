import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Config from './pages/Config';
import Login from './pages/Login';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/config" exact component={ Config } />
        <Route path="/feedback" exact component={ Feedback } />
        <Route path="/ranking" exact component={ Ranking } />
      </Switch>
    </div>
  );
}
