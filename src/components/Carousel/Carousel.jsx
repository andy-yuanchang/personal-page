import React, {
  useEffect, useRef, useState, useCallback,
} from 'react';
import portfolioConfig from '../../assets/json/portfolio.config.json';
import useWindowSize from '../../hooks/useWindowSize';
import Card from '../Card/Card';
import './carousel.less';

const portfolioLength = portfolioConfig.list.length;

function pause(ms) {
  return new Promise((res) => {
    setTimeout(() => {
      res('OK');
    }, ms);
  });
}
function carousel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [hoverObject, setHoverObject] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [isSliding, setIsSliding] = useState(false);
  const [currentDistance, setCurrentDistance] = useState(0);
  const sliderRefMask = useRef(null);
  const sliderRef = useRef(null);
  const [width, height] = useWindowSize();
  const [visibleNumberOfCards, setVisibleNumberOfCards] = useState(0);
  const [shouldExchangeSelectedCard, setShouldExchangeSelectedCard] = useState(false);
  const [isRenderingCloneImage, setIsRenderingCloneImage] = useState(false);

  useEffect(() => {
    portfolioConfig.list.forEach((skill) => {
      import(`images/${skill.imageSrc}`);
    });
    const index = getVisibleNumberOfCards();
    setVisibleNumberOfCards(index);
  }, []);

  useEffect(() => {
    setHoverIndex(-1);
    sliderRef.current.style.transform = `translate3d(${-1 * sliderRef.current.children[visibleNumberOfCards + selectedIndex].offsetLeft}px, 0px, 0px)`;
    const index = getVisibleNumberOfCards();
    setVisibleNumberOfCards(index);
  }, [width, height]);

  const getVisibleNumberOfCards = useCallback(
    () => {
      const { width: maskWidth } = sliderRefMask.current.getBoundingClientRect();
      let index = 0;
      while (sliderRef.current.children[index] && sliderRef.current.children[index].offsetLeft < maskWidth) {
        index++;
      }
      return index;
    },
    [],
  );

  const getNextIndex = (v) => (v + 1) % portfolioLength;

  const getPreviousIndex = (v) => (v - 1 + portfolioLength) % portfolioLength;

  const moveToNext = () => {
    const nextIndex = getNextIndex(selectedIndex);
    if (nextIndex === 0) {
      sliderRef.current.style.transform = `translate3d(${-1 * sliderRef.current.children[portfolioLength + visibleNumberOfCards].offsetLeft}px, 0px, 0px)`;
    } else {
      sliderRef.current.style.transform = `translate3d(${-1 * sliderRef.current.children[nextIndex + visibleNumberOfCards].offsetLeft}px, 0px, 0px)`;
    }
    setSelectedIndex(nextIndex);
    setIsSliding(true);
  };

  const moveToPrevious = () => {
    const previousIndex = getPreviousIndex(selectedIndex);
    if (previousIndex === portfolioLength - 1) {
      setIsRenderingCloneImage(true);
      sliderRef.current.style.transform = `translate3d(${-1 * sliderRef.current.children[0].offsetLeft}px, 0px, 0px)`;
    } else {
      sliderRef.current.style.transform = `translate3d(${-1 * sliderRef.current.children[previousIndex + visibleNumberOfCards].offsetLeft}px, 0px, 0px)`;
    }
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
            backgroundImage: `url(assets/${item.imageSrc})`,
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="card-item__footer">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </div>
      </li>
    );
  };

  const end = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    const x = e.pageX || e.touches[0].pageX - sliderRef.current.offsetLeft;
    const dist = (x - startX);
    const { width: selectedCardWidth } = sliderRef.current.children[selectedIndex].getBoundingClientRect();
    const isSwipeToNext = dist < 0 && Math.abs(dist) > selectedCardWidth * 0.1;
    const isSwipeToPrevious = dist > 0 && Math.abs(dist) > selectedCardWidth * 0.1;
    if (isSwipeToNext) {
      moveToNext();
    } else if (isSwipeToPrevious) {
      moveToPrevious();
    }
  };

  const start = (e) => {
    setIsDragging(true);
    const x = e.pageX || e.touches[0].pageX - sliderRef.current.offsetLeft;
    setStartX(x);

    const { transform } = sliderRef.current.style;
    // translate3d(.., .., ..)
    const transformValue = transform.replace(/translate3d\(([^\)]+)\)/, '$1');
    // transform X
    const transformXStr = transformValue.split(',')[0].replace('px', '');
    const distance = parseFloat(transformXStr);
    setCurrentDistance(distance);
  };

  const move = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX - sliderRef.current.offsetLeft;
    const swipeDistance = (x - startX);
    console.log(swipeDistance, currentDistance);
    sliderRef.current.style.transform = `translate3d(${currentDistance + swipeDistance * 5}px, 0px, 0px)`;
  };

  function handleMouseDown(e) {
    start(e);
  }

  function handleMouseMove(e) {
    move(e);
  }

  function handleMouseLeave(e) {
    end(e);
  }

  function handleMouseUp(e) {
    end(e);
  }

  function handleTouchStart(e) {
    start(e);
  }

  function handleTouchMove(e) {
    move(e);
  }

  function handleTouchEnd(e) {
    end(e);
  }

  function handleSliderTransitionEnd() {
    setIsSliding(false);
    const isFirstCard = selectedIndex === 0;
    const isLastCard = selectedIndex === portfolioLength - 1;
    if (isFirstCard || isLastCard) {
      sliderRef.current.style.transform = `translate3d(${-1 * sliderRef.current.children[selectedIndex + visibleNumberOfCards].offsetLeft}px, 0px, 0px)`;
    }
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

  const moveSliderTo = (index) => {
    sliderRef.current.style.transform = `translate3d(${-1 * sliderRef.current.children[visibleNumberOfCards + index].offsetLeft}px, 0px, 0px)`;
  };

  const renderCards = () => (
    portfolioConfig.list.map((portfolio, index) => getCard(index))
  );

  const renderPreviousCloneCards = () => {
    const cards = [];
    for (let i = 0; i < visibleNumberOfCards; i++) {
      cards[i] = getCard(portfolioLength - visibleNumberOfCards + i);
    }
    return cards;
  };

  const renderNextCloneCards = () => {
    const cards = [];
    for (let i = 0; i < visibleNumberOfCards; i++) {
      cards[i] = getCard(i);
    }
    return cards;
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
          <div className="slider-mask" ref={sliderRefMask}>
            <ul
              className={`items ${!shouldExchangeSelectedCard && 'drag-effect'} ${isDragging && 'active'}`}
              ref={sliderRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onTransitionEnd={handleSliderTransitionEnd}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {renderPreviousCloneCards()}
              {renderCards()}
              {renderNextCloneCards()}
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
