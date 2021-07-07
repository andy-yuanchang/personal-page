import React, { Suspense } from 'react';
import { renderRoutes } from 'react-router-config';

import Navbar from '../NavBar/Navbar';
import PersonaInfo from '../PersonalInfo/PersonaInfo'
import Portfolio from '../Portfolio/Portfolio'

import './App.less';

function App(props) {
  return (
    <div className="app">
      {/* <Navbar /> */}
      {/* <Suspense fallback={<div>loading...</div>}>
        {renderRoutes(routes)}
      </Suspense> */}
      <PersonaInfo />
      <Portfolio />
    </div>
  );
}

export default App;
