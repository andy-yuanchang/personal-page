import React, { Suspense } from 'react';
import { renderRoutes } from 'react-router-config';

import Navbar from './Navbar';
import './App.less';

function App(props) {
  console.log(props);

  const { routes } = props.route;

  return (
    <div className="app">
      <Navbar />
      <Suspense fallback={<div>loading...</div>}>
        {renderRoutes(routes)}
      </Suspense>
    </div>
  );
}

export default App;
