import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import emailjs, { init } from 'emailjs-com';
import useOnScreen from '../../hooks/useOnScreen';

import './Contact.less';

function Contact(props) {
  const contactRef = useRef(null);
  const { isOnScreen, disconnect } = useOnScreen(contactRef);

  useEffect(() => {
    init('user_ioYCqtgjnFXuTeWPPFP45');
    contactRef.current.style = 'visibility: visible; opacity: 0; transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 20, 0, 1)';
  }, []);

  useEffect(() => {
    if (isOnScreen) {
      contactRef.current.style = 'visibility: visible; opacity: 1; transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transition: opacity 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s, transform 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s;';
      disconnect();
    }
  }, [isOnScreen]);

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
    <div className="contact" ref={contactRef}>
      <h1>
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
