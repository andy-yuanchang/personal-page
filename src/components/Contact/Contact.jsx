import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import useOnScreen from '../../hooks/useOnScreen'

import './Contact.less'

function Contact(props) {
  const titleRef = useRef(null);
  const isIntersect = useOnScreen(titleRef)

  return (
    <div className="contact">
      <h1
        ref={titleRef}
        className={isIntersect ? "show" : "hide"}
      >
        React Out to Me
      </h1>
      <form action=""></form>
    </div>
  )
}

Contact.propTypes = {

}

export default Contact

