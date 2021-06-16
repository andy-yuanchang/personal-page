import React from 'react';
import Navbar from './Navbar';
import './App.less';

function App(props) {
  console.log(props);
  return (
    <div className="app">
      <Navbar />
    </div>
  );
}

export default App;
