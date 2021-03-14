import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <>
      <div id="container"><h1>Hello!</h1></div>
    </>
  );
};

if (typeof window !== 'undefined') {
  ReactDOM.render(<App />, document.getElementById('root'));
}
