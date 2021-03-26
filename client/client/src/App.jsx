import Home from './components/Home.jsx';
import Campgrounds from './components/Campgrounds.jsx';
import ShowCampground from './components/ShowCampground.jsx';
import Register from './components/Register.jsx';
import CustomNav from './components/CustomNav.jsx';
import './App.css';
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <CustomNav></CustomNav>
      <Switch>
        <Route path="/campgrounds/:id">
          <ShowCampground />
        </Route>

        <Route path="/campgrounds">
          <Campgrounds />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}


export default App;
