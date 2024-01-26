import React, { useContext } from "react";
import { useTypewriter } from "react-simple-typewriter";
import "./home.css";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";
import HomeProductBox from "../../components/Home product Box/HomeProductBox";
import { UserContext } from "../../contex/UserContext";
import { useNavigate } from "react-router-dom";

function Home(props) {

  const navigate = useNavigate();

  const { text } = useTypewriter({
    words: ["Books!!", "Cycles!!", "Fans!!", "Anything!"],
    loop: 0,
  });

  const { user } = useContext(UserContext);

  return (
    <div className="homeWrapper">
      {/*  Hero section  */}
      <div className="hero">
        <h1 className="mainHeading">
          Swap Your Old <span className="typeText">{text}</span>
        </h1>
        <div className="subHeading">
          <p>Want Juniors in the College to buy Old stuff from you?</p>
          <p>
            No more Whatsapp msg forwarding just{" "}
            <span className="logoColor">Swap</span> it!
          </p>
        </div>

        <div className="heroButtons">
          {user && (
            <button
              className="sellButton"
              onClick={() => {
                navigate("/products/addproduct");
              }}
            >
              Swap Now!
            </button>
          )}

          <button
            className="buyButton"
            onClick={() => {
              navigate("products/all");
            }}
          >
            Collections
          </button>

        </div>
        <HiOutlineChevronDoubleDown className="downArrow"/>
        
      </div>

      <HomeProductBox heading="Recently Added" category="all" />

      <HomeProductBox heading="Books" category="book" />

      <HomeProductBox heading="Cycles" category="cycle" />

      <HomeProductBox heading="Fans" category="fan" />

      <HomeProductBox heading="Others" category="other" />

      
    </div>
  );
}

export default Home;
