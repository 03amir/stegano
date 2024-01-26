import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

function Footer(props) {
  return (
    <div className="footerFrame">
      <div className="hr"></div>

      <div className="leftfooter">
        <h1 className="footerLogo">
          Swap<span style={{ color: "black" }}>.</span>
        </h1>
        <p className="small">Ⓒ 2023 Swap</p>
      </div>

      <div className="rightfooter">
        <Link className="footerLink" to="/contact">
          Contact
        </Link>
        <a
          href="https://github.com/03amir/swap-client"
          target="_blank"
          className="footerLink"
        >
          Github
        </a>
      </div>
    </div>
  );
}

export default Footer;
