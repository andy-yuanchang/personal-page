import React from 'react';
import PropTypes from 'prop-types';

import './PopUpModal.less';

function PopUpModal(props) {
  const {
    title = '', render, onClose, style,
  } = props;

  const handleClick = (e) => {
    if (e.target.classList.contains('pop-up-modal')) {
      onClose();
    }
  };

  return (
    <div className="pop-up-modal" onClick={handleClick} style={style}>
      <div className="modal-area">
        <div className="modal-title">
          {title}
        </div>
        <div className="modal-content">
          {render && render()}
        </div>
      </div>
    </div>
  );
}

PopUpModal.propTypes = {
  title: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PopUpModal;
