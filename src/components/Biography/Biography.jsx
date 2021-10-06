import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useOnScreen from '../../hooks/useOnScreen';

import './Biography.less';

function Biography(props) {
  const biographyRef = useRef(null);
  const { isOnScreen, disconnect } = useOnScreen(biographyRef);

  useEffect(() => {
    biographyRef.current.style = 'visibility: visible; opacity: 0; transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 20, 0, 1)';
  });

  useEffect(() => {
    if (isOnScreen) {
      biographyRef.current.style = 'visibility: visible; opacity: 1; transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transition: opacity 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s, transform 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s;';
      disconnect();
    }
  }, [isOnScreen]);

  return (
    <div
      className="biography"
      ref={biographyRef}
    >
      <h1>
        About me
      </h1>
      <ul>
        <li>
          <h3>
            Possessed 2 years experiences in full-stack development, having
            ability to construct websites on front-end and back-end from
            scratch independently.
          </h3>
        </li>
        <li>
          <h3>
            Capable of building RWD websites using UI framework and having
            good understanding in configuration set up.
          </h3>
        </li>
        <li>
          <h3>
            Experienced in CI-CD implementation, to improve product release
            by automating the process.
          </h3>
        </li>
        <li>
          <h3>
            Familiar with setting up front end development environment to
            make a efficient programming environment.
          </h3>
        </li>
        <li>
          <h3>
            Implemented test cases to enhance product stability by using
            End-to-End test framework.
          </h3>
        </li>
      </ul>
    </div>
  );
}

Biography.propTypes = {

};

export default Biography;
