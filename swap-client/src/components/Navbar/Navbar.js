import "./navbar.css"; 
import React from "react";
import axios from "axios";
import { useSelector , useDispatch } from 'react-redux';
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { signIn, logOut } from "../../redux/userSlice";

function Navbar() {

  const user = useSelector((state) => state.user.isAuth); 

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const screenSize = window.innerWidth;

  async function signInHandler(credential) {
   
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/signin`, {
      userDetails: credential,
    });

    localStorage.setItem("jwtSwap", res.data.token);
    localStorage.setItem("userSwap", JSON.stringify(res.data.data));

    dispatch(signIn(res.data.data)); 
    
  }

  function logOutHandler() {
    localStorage.clear();
    dispatch(logOut());
  }

  function sendToProfile() {
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
            <button className="profileBtn" onClick={sendToProfile}>
              Profile
            </button>
            <button className="logOutBtn" onClick={logOutHandler}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <GoogleLogin
              type={screenSize <= 450 ? "icon" : ""}
              size={screenSize <= 450 ? "medium" : ""}
              onSuccess={(credentialResponse) => {
                signInHandler(credentialResponse.credential);
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
