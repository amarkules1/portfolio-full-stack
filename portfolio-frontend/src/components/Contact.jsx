import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

class Contact extends Component {
  render() {
    return (
      <div className="contact">
        <div className="container">
          <div className="row align-items-center my-5">
            <div className="col-lg-12">
              <h1 className="font-weight-light">Contact</h1>
              <div className="contact">
                <a href="https://github.com/amarkules1">
                  <FontAwesomeIcon icon={brands('github')} size="2xl" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; GitHub</a>
              </div>
              <div className="contact">
                <a href="https://twitter.com/mar_Q_less">
                  <FontAwesomeIcon icon={brands('twitter')} size="2xl" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Twitter</a>
              </div>
              <div className="contact">
                <a href="https://www.linkedin.com/in/alex-markules-317077a2/">
                  <FontAwesomeIcon icon={brands('linkedin')} size="2xl" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; LinkedIn</a>
              </div>
              <div className="contact">
                <a href="mailto:marqless97@gmail.com">
                  <FontAwesomeIcon icon={solid('at')} size="2xl" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Email</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;