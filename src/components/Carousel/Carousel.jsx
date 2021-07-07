import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Card from '../Card/Card'

import { portfolioList } from 'js/portfolioData'

import './carousel.less'

function carousel(props) {

  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleNext = () => {
    setSelectedIndex(getPreviousIndex)
  }

  const handlePrevious = () => {
    setSelectedIndex(getNextIndex)
  }

  const getNextIndex = (v) => {
    return (v + 1) % portfolioList.length
  }

  const getPreviousIndex = (v) => {
    return (v - 1 + portfolioList.length) % portfolioList.length
  }

  const renderCards = () => {
    const previousIndex = getPreviousIndex(selectedIndex)
    const nextIndex = getNextIndex(selectedIndex)
    const previousCard = getCard(previousIndex)
    const selectedCard = getCard(selectedIndex)
    const nextCard = getCard(nextIndex)
    return (
      <>
        {previousCard}
        {selectedCard}
        {nextCard}
      </>
    )
  }

  const getCard = (index) => {
    const item = portfolioList[index]
    return (
      <Card
        imageSrc={item.imageSrc}
        imageTitle={item.imageTitle}
        title={item.title}
        description={item.description}
        onClick={() => {
          item.url && window.open(item.url, "_blank")
        }}
        isSelected={index === selectedIndex}
      />
    )
  }

  return (
    <div className="carousel">
      <div
        className="left-arrow"
        onClick={handlePrevious}
      />
      <div className="content">
        {renderCards()}
      </div>
      <div
        className="right-arrow"
        onClick={handleNext}
      />
    </div>
  )
}

carousel.propTypes = {

}

export default carousel

