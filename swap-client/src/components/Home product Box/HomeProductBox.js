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

    try {

      const url = `${process.env.REACT_APP_BASE_URL}/products/${category}`;
       const res = await axios.get(url);

      setBoxProducts(res.data.data.reverse());
      setIsFetched(true);

    } catch (error) {
      console.log("axios error", error);
    }
  }

  useEffect(() => {
    getCategoryProduct(category);
  }, [category]);

  return (
    <>
      {isFetched ? (
        <div className="boxWrapper">
          <div className="boxHeading">
            <h2>{heading}</h2>
            <button onClick={() => navigate(`/products/${category}`)}>
              Show More
            </button>
          </div>

          <div className="boxAdded">
            {boxProducts?.slice(0, 6).map((item) => {
              return <ProductCard item={item} key={item.id} />;
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
