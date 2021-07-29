import React, { useRef } from 'react';
import Carousel from '../Carousel/Carousel';
import useOnScreen from '../../hooks/useOnScreen';

import './Portfolio.less';

function Portfolio() {
  const titleRef = useRef(null)
  const isIntersect = useOnScreen(titleRef)

  return (
    <div id="portfolio">
      <h1 
        ref={titleRef}
        className={isIntersect ? "show" : "hide"}
      >
        Portfolio
      </h1>
      <Carousel />
    </div>
  );
}

export default Portfolio;
