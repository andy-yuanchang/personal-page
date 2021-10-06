import React, { useEffect, useRef } from 'react';
import Carousel from '../Carousel/Carousel';
import useOnScreen from '../../hooks/useOnScreen';

import './Portfolio.less';

function Portfolio() {
  const portfolioRef = useRef(null);
  const { isOnScreen, disconnect } = useOnScreen(portfolioRef);

  useEffect(() => {
    portfolioRef.current.style = 'visibility: visible; opacity: 0; transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 20, 0, 1)';
  }, []);

  useEffect(() => {
    if (isOnScreen) {
      portfolioRef.current.style = 'visibility: visible; opacity: 1; transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transition: opacity 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s, transform 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s;';
      disconnect();
    }
  }, [isOnScreen]);

  return (
    <div id="portfolio" ref={portfolioRef}>
      <h1>
        Portfolio
      </h1>
      <Carousel />
    </div>
  );
}

export default Portfolio;
