import React from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../contex/UserContext";
import { useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";

function Navbar() {

  const { user, signIn, logOut } = useContext(UserContext);

  const navigate = useNavigate();

  const screenSize = window.innerWidth;

  async function signInHandlr(credential) {

    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/signin`, {
      userDetails: credential,
    });

    localStorage.setItem("jwtSwap", res.data.token);

    localStorage.setItem("userSwap", JSON.stringify(res.data.data));

    signIn(res.data.data);
    
  }

  function logOutHandlr() {
    localStorage.clear();
    logOut();
  }

  function sendToProfile(){
    navigate("/profile");
  }

  return (

    <div className="nav">
      <Link className="link" to="/">
        <h2 className="logo">Swap</h2>
      </Link>

      <div className={screenSize <= 450 ? "centerProfile" : "profile"}>
        {user ? (
          <>
            <button className="profileBtn" onClick={sendToProfile}>Profile</button>
            <button className="logOutBtn" onClick={logOutHandlr}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <GoogleLogin
              type={screenSize <= 450 ? "icon" : ""}
              size={screenSize <= 450 ? "medium" : ""}
              onSuccess={(credentialResponse) => {
                signInHandlr(credentialResponse.credential);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </>
        )}
      </div>
      
    </div>

  );
}

export default Navbar;
