import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import emailjs, { init } from 'emailjs-com';
import useOnScreen from '../../hooks/useOnScreen';

import './Contact.less';

function Contact(props) {
  const titleRef = useRef(null);
  const isIntersect = useOnScreen(titleRef);

  useEffect(() => {
    init('user_ioYCqtgjnFXuTeWPPFP45');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await emailjs.sendForm('service_kpw7ueg', 'template_c7z5fnh', e.target);
      console.log(result.text);
    } catch (error) {
      console.log(error.text);
    }
  };

  return (
    <div className="contact">
      <h1
        ref={titleRef}
        className={isIntersect ? 'show' : 'hide'}
      >
        React Out to Me
      </h1>
      <form
        className="form-control"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="input-effect">
          <input id="from_name" name="from_name" type="text" autoComplete="new-password" required />
          <label htmlFor="from_name">
            <span className="content-name">Your Name</span>
          </label>
        </div>
        <div className="input-effect">
          <input id="email" name="email" type="text" autoComplete="off" required />
          <label htmlFor="email">
            <span className="content-name">Your Email</span>
          </label>
        </div>
        <div className="textarea-effect">
          <textarea id="message" name="message" rows="4" placeholder=" " />
          <label htmlFor="message">
            <span className="content-name">What you wanna say?</span>
          </label>
        </div>
        <input
          type="submit"
          value="Send"
        />
      </form>
    </div>
  );
}

Contact.propTypes = {

};

export default Contact;
