import React from 'react';
import SceneLoader from './Components/SceneLoader/SceneLoader';
import Room from "./Components/Room/Room";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import RoomJoin from './Components/Room/RoomJoin';

function App() {
  return (

    <div className="App">

      <Router>
        <div>
          <Switch>
            <Route path="/join">
              <RoomJoin/>
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
