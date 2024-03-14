import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./specificProduct.css";
import ProductCard from "../../components/Product Card/ProductCard";
import { useSelector } from 'react-redux';
import CircularProgress from "@mui/material/CircularProgress";

function SpecificProduct(props) {

  const { id, tag } = useParams();

  const [details, setDetails] = useState({});

  const [relatedPoducts, setRelatedProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state) => state.user.data);

  const navigate = useNavigate();

  async function getDetails() {
    setIsLoading(true);

    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/product/${id}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtSwap"),
        },
      }
    );

    setDetails(res.data.data);

    console.log(res.data)

    setIsLoading(false);
  }

  async function getRelated() {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/products/${tag}`,
      {}
    );
    const realtedArray = res.data.data.filter((item) => {
      return item._id != id;
    });
    setRelatedProducts(realtedArray);
  }

  async function deleteProduct() {

    try {

      const res = await axios.delete(

        `${process.env.REACT_APP_BASE_URL}/deleteProduct/${id}`,{
         headers: {
            Authorization : 'Bearer ' + localStorage.getItem("jwtSwap")
          },
          
        }
      );

      alert(`product  is succefully deleted`);
      navigate("/profile");
      
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  useEffect(() => {
    getDetails();
  }, [id, user]);

  useEffect(() => {
    getRelated();
  }, [id]);

  return (
    <>
      <div className="specificFrame">

        {user ? (
          <>
            {!isLoading ? (
              <>
                {" "}
                <div className="imageDiv">
                  <img src={details?.productImage} alt="ProductImage" />
                </div>
                <div className="detailsDiv">
                  <div className="priceHeading">
                    <h2>{details.title}</h2>
                    <button>₹{details.price}</button>
                  </div>
                  {details.tag === "book" ? (
                    <h4>
                      Author: <span className="small">{details.author}</span>
                    </h4>
                  ) : (
                    <h4>
                      Brand: <span className="small">{details.brand}</span>
                    </h4>
                  )}
                  <h4>
                    Condition:{" "}
                    <span className="small"> {details.condition}⭐</span>
                  </h4>
                  <p>{details.description}</p>
                  <div className="contactSeller">
                    <h4>
                      Contact Seller :{" "}
                      <span className="small">{details?.listedBy?.email}</span>{" "}
                    </h4>
                  </div>

                  {details?.listedBy?._id === user._id ? (
                    <button className="deleteBtn" onClick={deleteProduct}>Delete</button>
                  ) : (
                    ""
                  )}
                </div>
              </>
            ) : (
              <CircularProgress
                className="loader"
                size="60px"
                color="success"
              />
            )}
          </>
        ) : (
          <>
            <h1 className="needLoginText">
              You have to Sign In first to see the Details
              <span style={{ color: "red" }}>.</span>
            </h1>
          </>
        )}
      </div>
      <div className="boxWrapper">
        <div className="boxHeading">
          <h2>Related Products</h2>
        </div>
        <div className="boxAdded">
          {relatedPoducts?.slice(0, 7).map((item) => {
            return <ProductCard item={item} />;
          })}
        </div>
      </div>
    </>
  );
}

export default SpecificProduct;
