import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './js/routes';

function InitApp() {
  return (
    <BrowserRouter>
      <Switch>
        {/* {renderRoutes(routes)} */}
      </Switch>
    </BrowserRouter>
  );
}

export default InitApp;
