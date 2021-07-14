import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

function Spinner(props) {
  return (
    <div className="spinner">
      <CircularProgress />
    </div>
  );
}

Spinner.propTypes = {

};

export default Spinner;
