import React, { Component } from 'react';
import './App.css';
import PlayerDetails from './components/PlayerDetails';
import LotteryWin from './components/LotteryWin';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
              <Route path="/" exact component={PlayerDetails} />
              <Route path="/winner" component={LotteryWin} />
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
