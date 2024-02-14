import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contex/UserContext";
import axios from "axios";
import ProductCard from "../../components/Product Card/ProductCard";
import './profile.css';
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

export default function Profile() {

  const { user } = useContext(UserContext);

  const [userProduct, setUserProduct] = useState([]);
  const [loading,SetLoading] = useState(false);

  const navigate = useNavigate()

  async function getProducts() {

    SetLoading(true);
    
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/userProducts`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtSwap"),
          },
        }
      );
      console.log(res.data)
      setUserProduct(res.data);
    } catch (error) {
      console.error("Error fetching user products:", error);
    }
    SetLoading(false);
  }


  useEffect(() => {
    if(user){
    getProducts();
    }
  }, [user]);

  return (
    <div className="profileFrame">
      {user ? (
        <>
          <div className="userDetailsBox">
            <img src={user?.userImage} alt="userImage" />
            <div className="userDetails">
              <h1>{user?.name}</h1>
              <h2>{user?.email}</h2>
            </div>
          </div>

          {loading ? (
            <CircularProgress className="loader" size="60px" color="success" />
          ) : (
            
            <div className="lowerBox">
            <div className="productHeader" >
                  <h2 className="products-heading">Your Products:</h2>
                  <button className="addBtn" onClick={() => { navigate("/products/addproduct")}}>Add Product</button>
            </div>

              {userProduct.length === 0 && (
                <h1 className="noProduct">
                  You have no product listed
                  <span style={{ color: "red" }}>.</span>
                </h1>
              )}

              <div className="boxAdded profileProducts">
                {userProduct.length !== 0 &&
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
            You are not loged <span style={{ color: "red" }}>in</span>
            <span style={{ color: "green" }}>.</span>
          </h1>
        </>
      )}
    </div>
  );
}
