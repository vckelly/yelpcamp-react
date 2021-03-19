import logo from './logo.svg';
import Campgrounds from './components/Campgrounds.js';
import './App.css';
import Axios from 'axios';

Axios({
  method: "GET",
  url: "http://localhost:5000/campgrounds",
  headers: {
    "Content-Type": "application/json"
  }
}).then(res => {
  console.log(res);
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Campgrounds />
    </div>
  );
}

export default App;
