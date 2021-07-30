import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import useOnScreen from '../../hooks/useOnScreen'

import './Contact.less'

function Contact(props) {
  const titleRef = useRef(null);
  const isIntersect = useOnScreen(titleRef)

  const handleSubmit = (e) => {
    
  }

  return (
    <div className="contact">
      <h1
        ref={titleRef}
        className={isIntersect ? "show" : "hide"}
      >
        React Out to Me
      </h1>
      <form 
        className="form-control" 
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" />
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email"/>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="4" />
        <input 
          type="submit"
          value="Send"
        />
      </form>
    </div>
  )
}

Contact.propTypes = {

}

export default Contact

