import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { portfolioList } from 'js/portfolioData';
import Card from '../Card/Card';

import './carousel.less';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  animating: {
    // '&.previous': {
    //   transform: 'translate3d(-100%, 0px, 0px)',
    // },
    // '&.next': {
    //   transform: 'translate3d(100%, 0px, 0px)',
    // },
    transition: 'transform .75s ease 0s',
    // animation: '$fadein 0s 0s forwards ease-out',
  },
}));

function carousel(props) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDirection, setDragDirection] = useState('');
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef(null);
  const itemRef = useRef(null);

  const handleNext = () => {
    // setSelectedIndex(getPreviousIndex);
    moveToNext();
  };

  const handlePrevious = () => {
    // setSelectedIndex(getNextIndex);
    moveToPrevious();
  };

  const getNextIndex = (v) => {
    if (v + 1 === portfolioList.length) { return v; }
    return v + 1;
  };

  const getPreviousIndex = (v) => {
    if (v - 1 < 0) { return 0; }
    return v - 1;
  };

  const renderCards = () => (
    portfolioList.map((portfolio, index) => getCard(index))
  );

  const getCard = (index) => {
    const item = portfolioList[index];
    return (
      <li
        className="item"
        ref={itemRef}
      >
        <Card
          imageSrc={item.imageSrc}
          imageTitle={item.imageTitle}
          title={item.title}
          description={item.description}
          onClick={() => {
            const shouldOpenNewTab = !isDragging && item.url;
            if (shouldOpenNewTab) {
              window.open(item.url, '_blank');
            }
          }}
          isSelected={index === selectedIndex}
        />
      </li>
    );
  };

  function handleMouseDown(e) {
    start(e);
  }

  function handleMouseMove(e) {
    move(e);
  }

  function handleMouseLeave(e) {
    end();
  }

  function handleMouseUp(e) {
    end();
  }

  const end = () => {
    setIsDragging(false);
  };

  const start = (e) => {
    setIsDragging(true);
    const x = e.pageX || e.touches[0].pageX - sliderRef.current.offsetLeft;
    const left = sliderRef.current.scrollLeft;
    setStartX(x);
    setScrollLeft(left);
  };

  const move = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX - sliderRef.current.offsetLeft;
    const dist = (x - startX);
    setDragDirection('');
    if (dist > 3 && selectedIndex > 0) {
      moveToPrevious();
    } else if (dist < 3 && selectedIndex < portfolioList.length - 1) {
      moveToNext();
    }
  };

  const moveToNext = () => {
    // sliderRef.current.scrollLeft = scrollLeft + itemRef.current.clientWidth;
    // sliderRef.current.style.transition = '1s ease-out';
    const nextIndex = getNextIndex(selectedIndex);
    setScrollLeft(sliderRef.current.scrollLeft);
    setSelectedIndex(nextIndex);
    setDragDirection('next');
    const { width } = itemRef.current.getBoundingClientRect();
    sliderRef.current.style.transform = `translate3d(${-1 * width * nextIndex}px, 0px, 0px)`;
    // sliderRef.current.style.transition = 'transform 0.75s ease-out 0s';
  };

  const moveToPrevious = () => {
    const previousIndex = getPreviousIndex(selectedIndex);
    // sliderRef.current.scrollLeft = scrollLeft - itemRef.current.clientWidth;
    // sliderRef.current.style.transition = '1s ease-out';
    setScrollLeft(sliderRef.current.scrollLeft);
    setSelectedIndex(previousIndex);
    setDragDirection('previous');
    const { width } = itemRef.current.getBoundingClientRect();
    sliderRef.current.style.transform = `translate3d(${-1 * width * previousIndex}px, 0px, 0px)`;
    console.log(itemRef.current.getBoundingClientRect());
    // sliderRef.current.style.transition = 'transform 0.75s ease-out 0s';
  };

  return (
    <div className="carousel">
      <div className="slider">
        <div className="slider-mask">
          <ul
            className={`items ${isDragging && 'active'} ${classes.animating}`}
            style={{
              // transform: `translate3d(${-100 * selectedIndex}%, 0px, 0px)`,
            }}
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
          >
            {renderCards()}
          </ul>
        </div>
      </div>
      <div
        className="left-arrow"
        onClick={handlePrevious}
      />
      <div
        className="right-arrow"
        onClick={handleNext}
      />
    </div>
  );
}

carousel.propTypes = {

};

export default carousel;
