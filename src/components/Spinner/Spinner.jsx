import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';

function Spinner() {
  return (
    <div className="spinner">
      <CircularProgress />
    </div>
  );
}

Spinner.propTypes = {

};

export default Spinner;
