import React, { useEffect, useRef, useState } from 'react';
import portfolioConfig from '../../assets/json/portfolio.config.json';
import useWindowSize from '../../hooks/useWindowSize';
import Card from '../Card/Card';
import './carousel.less';

const CARD_GAP_LENGTH = 10

function carousel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [hoverObject, setHoverObject] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [isSliding, setIsSliding] = useState(false);
  const [portfolioRefList, setPortfolioRefList] = useState(() => {
    return portfolioConfig.list.map((skill) => {
      return React.createRef();
    })
  })
  const [rightOffset, setRightOffset] = useState(0);
  const [leftOffset, setLeftOffset] = useState(0);
  const sliderRef = useRef(null);
  const itemRef = useRef(null);
  const popupRef = useRef(null);
  const [width, height] = useWindowSize();

  const observerRef = useRef(null);

  useEffect(() => {
    const callback = (entires) => {
      // entires.forEach((entry) => {
      //   let isIntersecting = false;
      //   if (entry.isIntersecting) {
      //     isIntersecting = true;
      //   } else {
      //     isIntersecting = false;
      //   }
      //   setIsIntersect(isIntersecting);
      // });
    }
    const options = {
      threshold: 0.5,
    }
    observerRef.current = new IntersectionObserver(callback, options);
    // observerRef.current.observe(skillListRect.current);
  }, []);

  useEffect(() => {
    portfolioConfig.list.forEach((skill) => {
      import(`images/${skill.imageSrc}`);
    })
  }, [])

  useEffect(() => {
    setHoverIndex(-1);
    const item = portfolioRefList[selectedIndex];
    if (!item.current) return;

    const { width } = item.current.getBoundingClientRect();
    sliderRef.current.style.transform = `translate3d(${-1 * selectedIndex * (width + CARD_GAP_LENGTH)}px, 0px, 0px)`
  }, [width, height]);

  const portfolioLength = portfolioConfig.list.length;

  const getNextIndex = (v) => (v + 1) % portfolioLength;

  const getPreviousIndex = (v) => (v - 1 + portfolioLength) % portfolioLength;

  const moveToNext = () => {
    const nextIndex = getNextIndex(selectedIndex);
    const { width } = portfolioRefList[selectedIndex].current.getBoundingClientRect();
    sliderRef.current.style.transform = `translate3d(${-1* nextIndex * (width + CARD_GAP_LENGTH)}px, 0px, 0px)`;
    setSelectedIndex(nextIndex);
    setIsSliding(true);
  };

  const moveToPrevious = () => {
    const previousIndex = getPreviousIndex(selectedIndex);
    const { width } = portfolioRefList[selectedIndex].current.getBoundingClientRect();
    sliderRef.current.style.transform = `translate3d(${-1 * previousIndex * (width + CARD_GAP_LENGTH)}px, 0px, 0px)`;
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
        className="card-item"
        ref={portfolioRefList[index]}
        onMouseMove={isSliding ? undefined : (e) => handleHoverCard(e, index)}
      >
        <a 
          href={item.url}
          target="_blank"
          rel="noreferrer"
          title={item.title}
        />
        <div
          className="card-item__content"
          style={{
            backgroundImage: `url(assets/${item.imageSrc})`
          }}
        >
          <div className="card-item__footer">
            <h3>{item.title}</h3>
          </div>
        </div>
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
    if (dist > 3) {
      moveToNext();
    } else if (dist < 3) {
      moveToPrevious();
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
    return (
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
        style={{
          top: window.pageYOffset + top,
          left: window.pageXOffset + left,
        }}
        onMouseLeave={handleLeaveCard}
        key={hoverIndex}
      />
    );
  }

  function handleSliderTransitionEnd() {
    setIsSliding(false);
  }

  const moveSliderTo = (index) => {
    const { width } = portfolioRefList[index].current.getBoundingClientRect();
    sliderRef.current.style.transform = `translate3d(${-1 * index * (width + CARD_GAP_LENGTH)}px, 0px, 0px)`;
  };

  function handleIndicator(event, index) {
    moveSliderTo(index);
    setSelectedIndex(index);
  }

  function renderIndicators() {
    const arr = [];
    for (let i = 0; i < portfolioLength; i++) {
      arr[i] = (
        <div
          className={`indicator ${(selectedIndex === i) && 'selected'}`}
          onClick={(e) => {
            handleIndicator(e, i);
          }}
        />
      );
    }
    return arr;
  }

  return (
    <>
      <div className="carousel">
        <div className="slider">
          <div className="slider-mask">
            <ul
              className={`items ${isDragging && 'active'} drag-effect`}
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
      </div>
      <div className="indicator-group">
        <div 
          className="left"
          onClick={handlePrevious}
        />
        {renderIndicators()}
        <div 
          className="right"
          onClick={handleNext}
        />
      </div>
    </>
  );
}

carousel.propTypes = {

};

export default carousel;
