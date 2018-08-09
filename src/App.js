import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Calendar from './components/home/Calendar'
import NavigationBar from './components/navigationBar/NavigationBar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div >
            <NavigationBar/>
            <Switch>
              <Route path="/" component={Calendar} exact />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
