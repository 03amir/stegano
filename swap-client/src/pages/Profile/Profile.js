
import React, { useEffect, useState } from "react";
import "./profile.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import ProductCard from "../../components/Product Card/ProductCard";
import UserUpdatePopUp from "../../pop-ups/UserUpdatePopUp";

export default function Profile() {
 
  const isuser = useSelector((state) => state.user.isAuth);
  const userdata = useSelector((state) => state.user.data);
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [userProduct, setUserProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function getProducts() {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/userProducts`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtSwap"),
          },
        }
      );
      setUserProduct(res.data.data);
    } catch (error) {
      console.error("Error fetching user products:", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (isuser) {
      getProducts();
    }
  }, [isuser]);

  return (
    <div className="profileFrame">
      {isuser ? (
        <>
          <div className="userDetailsBox">
            <img src={userdata?.userImage} alt="userImage" />
            <div className="userDetails">
              <h1>{userdata?.name}</h1>
              <h2>{userdata?.email}</h2>
              <button
               className="update-user-button"
                onClick={() => {
                  setIsUpdating(true);
                }}
              >
                Update user
              </button>
            </div>
          </div>

          {isUpdating && (
            <UserUpdatePopUp
              userdata={userdata}
              setIsUpdating={setIsUpdating}
            />
          )}

          {loading ? (
            <CircularProgress className="loader" size="60px" color="success" />
          ) : (
            <div className="lowerBox">
              <div className="productHeader">
                <h2 className="products-heading">Your Products:</h2>
                <button
                  className="addBtn"
                  onClick={() => {
                    navigate("/addproduct");
                  }}
                >
                  Add Product
                </button>
              </div>

              {userProduct?.length === 0 && (
                <h1 className="noProduct">
                  You have no product listed
                  <span style={{ color: "red" }}>.</span>
                </h1>
              )}

              <div className="boxAdded profileProducts">
                {userProduct?.length !== 0 &&
                  userProduct?.map((product, index) => {
                    return <ProductCard key={index} item={product} />;
                  })}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <h1 className="notLoggedIn">
            You are not logged <span style={{ color: "red" }}>in</span>
            <span style={{ color: "green" }}>.</span>
          </h1>
        </>
      )}
    </div>
  );
}
