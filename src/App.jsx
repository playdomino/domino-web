import React from 'react';
import SceneLoader from './Components/SceneLoader/SceneLoader';
import Room from "./Components/Room/Room";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import RoomWaiting from './Components/Room/RoomWaiting';

function App() {
  return (

    <div className="App">

      <Router>
        <div>
          <Switch>
            <Route path="/room">
              <Room />
            </Route>
            <Route path="/roomwaiting">
              <RoomWaiting/>
            </Route>
            <Route path="/game">
              <SceneLoader />
            </Route>
            <Route path="/">
              <Room />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
