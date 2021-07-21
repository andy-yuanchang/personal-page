import { makeStyles } from '@material-ui/core/styles';
import React, { useRef, useEffect, useState } from 'react';
import portfolioConfig from '../../assets/json/portfolio.config.json';
import Card from '../Card/Card';
import useWindowSize from '../../hooks/useWindowSize';
import './carousel.less';

const SLIDE_ANIMATION_DURATION = 0.75;
const SLIDE_POPUP_DURATION = 0.3;
const SLIDE_POPUP_ANIMATION_DELAY = 0.5;

const useStyles = makeStyles(() => ({
  root: {

  },
  animating: {
    transition: `transform ${SLIDE_ANIMATION_DURATION}s ease 0s`,
  },
  hoverEffect: {
    'transform-origin': 'center center',
    'z-index': 3,
    opacity: 0,
    'box-shadow': 'rgba(0, 0, 0, 0.75) 0px 3px 10px',
    animation: `$popup ${SLIDE_POPUP_DURATION}s ${SLIDE_POPUP_ANIMATION_DELAY}s forwards`,
    position: 'absolute',
    '&.close': {
      // animation: `$close ${SLIDE_POPUP_DURATION}s 0s forwards`,
      transform: 'scale(0)',
    },
    inset: 0
  },
  cardImage: {
    width: '100%',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  '@keyframes popup': {
    '0%': {
      transform: 'scale(1)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(1.3)',
      opacity: 1,
    },
  },
  leaveEffect: {
    'transform-origin': 'center center',
    'z-index': 3,
    opacity: 0,
    animation: `$close ${SLIDE_POPUP_DURATION}s 0s forwards`,
    position: 'absolute',
  },
  '@keyframes close': {
    '0%': {
      transform: 'scale(1.3)',
    },
    '100%': {
      transform: 'scale(0)',
    },
  },
}));

function carousel() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [hoverObject, setHoverObject] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [isSliding, setIsSliding] = useState(false);
  const [rightOffset, setRightOffset] = useState(0);
  const [leftOffset, setLeftOffset] = useState(0);
  const sliderRef = useRef(null);
  const itemRef = useRef(null);
  const observerRef = useRef(null);
  const popupRef = useRef(null);
  const [width, height] = useWindowSize();

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entires) => {
      const entry = entires[0];
      console.log(entry.boundingClientRect, entry.intersectionRect)
      if (entry.intersectionRatio < 1) {
        const { boundingClientRect, intersectionRect } = entry;
        const rOffset = boundingClientRect.right - intersectionRect.right;
        const lOffset = boundingClientRect.left - intersectionRect.left;
        setRightOffset(rOffset);
        setLeftOffset(lOffset);
      }
    });
  }, [])

  useEffect(() => {
    if (hoverIndex !== -1) {
      observerRef.current.observe(popupRef.current);
    }
  }, [hoverIndex]);

  useEffect(() => {
    setHoverIndex(-1)
  }, [width, height])

  const portfolioLength = portfolioConfig.list.length;

  const getNextIndex = (v) => (v + 1) % portfolioLength;

  const getPreviousIndex = (v) => (v - 1 + portfolioLength) % portfolioLength;

  const moveToNext = () => {
    const nextIndex = getNextIndex(selectedIndex);
    // const { width } = itemRef.current.getBoundingClientRect();
    sliderRef.current.style.transform = `translate3d(${-100 * nextIndex}%, 0px, 0px)`;
    setSelectedIndex(nextIndex);
    setIsSliding(true);
  };

  const moveToPrevious = () => {
    const previousIndex = getPreviousIndex(selectedIndex);
    // const { width } = itemRef.current.getBoundingClientRect();
    sliderRef.current.style.transform = `translate3d(${-100 * previousIndex}%, 0px, 0px)`;
    setSelectedIndex(previousIndex);
    setIsSliding(true);
  };

  const handleNext = () => {
    moveToNext();
  };

  const handlePrevious = () => {
    moveToPrevious();
  };

  function handleHoverCard(e, index) {
    setHoverObject(e.currentTarget);
    setHoverIndex(index);
  }

  const getCard = (index) => {
    const item = portfolioConfig.list[index];
    return (
      <li
        className="item"
        ref={itemRef}
        onMouseMove={isSliding ? undefined : (e) => handleHoverCard(e, index)}
      >
        <img
          src={`${item.imageSrc}`}
          className={classes.cardImage}
          alt={item.title}
        />
      </li>
    );
  };

  const renderCards = () => (
    portfolioConfig.list.map((portfolio, index) => getCard(index))
  );

  const end = () => {
    setIsDragging(false);
  };

  const start = (e) => {
    setIsDragging(true);
    const x = e.pageX || e.touches[0].pageX - sliderRef.current.offsetLeft;
    setStartX(x);
  };

  const move = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX - sliderRef.current.offsetLeft;
    const dist = (x - startX);
    if (dist > 3 && selectedIndex > 0) {
      moveToPrevious();
    } else if (dist < 3 && selectedIndex < portfolioConfig.list.length - 1) {
      moveToNext();
    }
  };

  function handleMouseDown(e) {
    start(e);
  }

  function handleMouseMove(e) {
    move(e);
  }

  function handleMouseLeave() {
    end();
  }

  function handleMouseUp() {
    end();
  }

  function handleLeaveCard() {
    setHoverIndex(-1);
  }

  function renderHoverEffect() {
    const item = portfolioConfig.list[hoverIndex];
    const {
      top, left, width, height,
    } = hoverObject.getBoundingClientRect();
    // return (
    //   <Card
    //     imageSrc={item.imageSrc}
    //     imageTitle={item.imageTitle}
    //     title={item.title}
    //     description={item.description}
    //     onClick={() => {
    //       const shouldOpenNewTab = !isDragging && item.url;
    //       if (shouldOpenNewTab) {
    //         window.open(item.url, '_blank');
    //       }
    //     }}
    //     style={{
    //       width,
    //       top: window.pageYOffset + top,
    //       left: window.pageXOffset + left,
    //       'transform-origin': 'center center',
    //       'z-index': 3,
    //       animation: `$popup ${SLIDE_POPUP_DURATION}s ${SLIDE_POPUP_ANIMATION_DELAY}s forwards`,
    //       position: 'absolute',
    //       '&.close': {
    //         transform: 'scale(0)',
    //       },
    //       inset: 0,
    //     }}
    //     onMouseLeave={handleLeaveCard}
    //     key={hoverIndex}
    //   />
    // );
    return (
      <div
        className={`${classes.hoverEffect}`}
        style={{
          width,
          height,
          top: window.pageYOffset + top,
          left: window.pageXOffset + left + leftOffset,
          right: rightOffset
        }}
        onMouseLeave={handleLeaveCard}
        key={hoverIndex}
        onClick={() => {
          const shouldOpenNewTab = !isDragging && item.url;
          if (shouldOpenNewTab) {
            window.open(item.url, '_blank');
          }
        }}
        ref={popupRef}
      >
        <img
          src={`${item.imageSrc}`}
          className={classes.cardImage}
          alt={item.title}
        />
      </div>
    );
  }

  function handleSliderTransitionEnd() {
    setIsSliding(false);
  }

  return (
    <>
      <div className="carousel">
        <div className="slider">
          <div className="slider-mask">
            <ul
              className={`items ${isDragging && 'active'} ${classes.animating}`}
              ref={sliderRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onTransitionEnd={handleSliderTransitionEnd}
            >
              {renderCards()}
            </ul>
          </div>
        </div>
        <div
          className="arrow-mask left"
          onClick={handlePrevious}
          onKeyDown={undefined}
          role="button"
          tabIndex={0}
        >
          <div
            className="left-arrow"
          />
        </div>
        <div
          className="arrow-mask right"
          onClick={handleNext}
          onKeyDown={undefined}
          role="button"
          tabIndex={0}
        >
          <div
            className="right-arrow"
          />
        </div>
      </div>
      {
        hoverIndex !== -1 && (
          renderHoverEffect()
        )
      }
    </>
  );
}

carousel.propTypes = {

};

export default carousel;
