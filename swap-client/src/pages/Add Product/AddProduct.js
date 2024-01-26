import React, { useContext, useEffect, useState } from "react";
import "./addProduct.css";
import FileBase from "react-file-base64";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contex/UserContext";
import CircularProgress from '@mui/material/CircularProgress';

function AddProduct(props) {

  const navigate = useNavigate();

  const { user } = useContext(UserContext)

  const [formDetails, setFormDetails] = useState({
    title: "",
    description: "",
    tag: "",
    brand: "",
    price: "",
    author: "",
    productImage: "",
    condition: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/")
    }
  }, [user]);


  const [isUploading, setIsUploading] = useState(false);

  async function submitHandlr(e) {

    e.preventDefault();

    if (!formDetails.productImage) {
      alert("Please Upload A picture of the Product");
    } else {

      setIsUploading(true);

      let intPrice = parseInt(formDetails.price);
      let intCondition = parseInt(formDetails.condition);

      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/allproducts`, {
        productImage: formDetails.productImage,
        price: intPrice,
        title: formDetails.title,
        condition: intCondition,
        author: formDetails.author,
        description: formDetails.description,
        tag: formDetails.tag,
        brand: formDetails.brand,
      }, 
      {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("jwtSwap"),
        }
      }).catch (function (error) {
        console.log(error)

      });

      alert("Product added succes fullly go to home page");

      setIsUploading(false);

      navigate("/");
      
    }
  }

  return (
    <>
    {
        user && <form
          id="addProduct"
          className={"addDetailsFrame"}
          onSubmit={(e) => {
            submitHandlr(e);
          }}
        >
          <div className="addDetailsBox">
            <div className="inputBoxes">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                placeholder="Title of the listing"
                name="title"
                required
                value={formDetails.title}
                onChange={(e) => {
                  setFormDetails({ ...formDetails, title: e.target.value });
                }}
              />

              <label htmlFor="tags">Category</label>

              <select
                required
                name="tags"
                id="tags"
                value={formDetails.tag}
                onChange={(e) => {
                  setFormDetails({ ...formDetails, tag: e.target.value });
                }}
              >
                <option value="" disabled selected>
                  Select your option
                </option>
                <option value="book">Book</option>
                <option value="cycle">Cycle</option>
                <option value="fan">Fan</option>
                <option value="other">Other</option>
              </select>

              {formDetails.tag === "book" ? (
                <>
                  <label htmlFor="author">Author</label>
                  <input
                    type="text"
                    placeholder="Enter the name of the author"
                    id="author"
                    name="author"
                    required
                    value={formDetails.author}
                    onChange={(e) => {
                      setFormDetails({ ...formDetails, author: e.target.value });
                    }}
                  />
                </>
              ) : (
                <>
                  <label htmlFor="brand">Brand</label>
                  <input
                    type="text"
                    placeholder="Enter the name of the Brand"
                    id="brand"
                    name="brand"
                    required
                    value={formDetails.brand}
                    onChange={(e) => {
                      setFormDetails({ ...formDetails, brand: e.target.value });
                    }}
                  />
                </>
              )}

              <label htmlFor="condition">Condition</label>
              <input
                required
                type="number"
                id="condition"
                name="condition"
                min="1" max="5"
                placeholder="What is the condition of the product out of 5"
                value={formDetails.condition}
                onChange={(e) => {
                  setFormDetails({ ...formDetails, condition: e.target.value });
                }}
              />

              <label htmlFor="price">Price</label>
              <input
                required
                type="number"
                name="price"
                id="price"
                min="0"
                placeholder="Enter you price in INR(₹)"
                value={formDetails.price}
                onChange={(e) => {
                  setFormDetails({ ...formDetails, price: e.target.value });
                }}
              />
            </div>

            <div className="imageBox">
              <label htmlFor="imagebutton" className="uploadButton">
                Upload Image
                <FileBase
                  id="imagebutton"
                  name="image"
                  type="file"
                  multiple={false}
                  onDone={(data) => {
                    setFormDetails({ ...formDetails, productImage: data.base64 });
                  }}
                />
              </label>


              {formDetails.productImage ? (
                <img src={formDetails.productImage} alt="User Uploaded" />
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="descBox">
            <label htmlFor="description">Description</label>
            <textarea
              required
              form="addProduct"
              name="description"
              placeholder="Write everything about the product."
              cols="30"
              rows="5"
              minLength="50"
              value={formDetails.description}
              onChange={(e) => {
                setFormDetails({ ...formDetails, description: e.target.value });
              }}
            ></textarea>

            <button disabled={isUploading} type="submit">
              Add This Product
            </button>
          </div>


          {
            isUploading && <div className="uploading">
              <CircularProgress size="60px" color="success" /> <span>Uploading...</span>
            </div>
          }


        </form>
    }
    

    </>
  );
}

export default AddProduct;
