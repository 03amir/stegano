import React from 'react';
import dp from '../../assets/dp2.png';
import '../Contact/contact.css'

export default function Contact() {
  return (
    <>
      <div className="contactFr">
        <div className="imgBox">
          <img src={dp} alt="profile pic" className="dp" />
        </div>
        <div className="rightContact">
          <h3>Developer</h3>
          <h1>
            Amirul sekh<span style={{ color: "red" }}>.</span>
          </h1>
          <p></p>
          <div className="contactLinks">
            <a
              className="contactButton"
              href="https://github.com/03amir/swap-client"
              target="_blank"
            >
              Github
            </a>

            <a
              className="contactButton"
              href="https://leetcode.com/amir_03/"
              target="_blank"
            >
              Leetcode
            </a>

            <a
              className="contactButton"
              href="https://www.linkedin.com/in/amirulsekh/"
              target="_blank"
            >
              Linkedin
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
