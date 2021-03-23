import logo from './logo.svg';
import Home from './components/Home.jsx';
import Campgrounds from './components/Campgrounds.jsx';
import ShowCampground from './components/ShowCampground.jsx';
import './App.css';
import { Route, Switch } from "react-router-dom";
import Axios from 'axios';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/campgrounds/:id">
          <ShowCampground />
        </Route>

        <Route path="/campgrounds">
          <Campgrounds />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}


export default App;
