
import React, { useState, useEffect } from "react";
import "./homeProductBox.css";
import ProductCard from "../Product Card/ProductCard";
import axios from "axios";
import LoadingSkeleton from "../Skeleton/LoadingSkeleton";
import { useNavigate } from "react-router-dom";

function HomeProductBox({ category, heading }) {

  const navigate = useNavigate();

  const [boxProducts, setBoxProducts] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  async function getCategoryProduct(category) {
    setIsFetched(false);

    if (category === "all") {
      
      let url = process.env.REACT_APP_BASE_URL+'/allproducts?category=all'
    
      const res = await axios.get(url).catch(function (error) {
        console.log("axios error")
      });
       setBoxProducts(res.data.data.reverse());
       setIsFetched(true);
      
    } else {
      const res = await axios(`${process.env.REACT_APP_BASE_URL}/allproducts?category=${category}`);
      setBoxProducts(res.data.data.reverse());
      setIsFetched(true);
    }

  }
  useEffect(() => {
    getCategoryProduct(category);
  }, []);

  return (
    <>
      {isFetched ? (
        <div className="boxWrapper">

          <div className="boxHeading">
            <h2>{heading}</h2>
            <button onClick={() => navigate(`/products/${category}`)}>
              Show More
              {/* <BsFillArrowDownSquareFill className="showMoreArrow" /> */}
            </button>
          </div>

          <div className="boxAdded">
            {boxProducts?.slice(0, 6).map((item) => {
              return <ProductCard item={item} />;
            })}
          </div>
        </div>
      ) : (
        <LoadingSkeleton />
      )}
    </>
  );
}

export default HomeProductBox;
