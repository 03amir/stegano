
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import "./addProduct.css";

function AddProduct() {
  
  const navigate = useNavigate();

  const [formDetails, setFormDetails] = useState({
    title: "",
    description: "",
    tag: "",
    brand: "",
    price: "",
    author: "",
    condition: "",
  });

  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png") {
        setImage(file);
      } else {
        alert("Please select a valid image format (jpg, jpeg, or png).");
      }
    } else {
      alert("Please select an image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image file.");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();

      formData.append("file", image);
      Object.entries(formDetails).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await axios.post(`${process.env.REACT_APP_BASE_URL}/addProduct`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtSwap"),
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product added successfully. Go to the home page.");
      navigate("/");
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="addProductContainer">
      <form id="addProduct" className="addProductForm" onSubmit={handleSubmit}  
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
              <label htmlFor="file">Upload Image</label>
              <input type="file" id="file" onChange={(e) => handleImageChange(e)} />
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


      </form>

      {isUploading && (
        <div className="uploading">
          <CircularProgress size="60px" color="success" /> <span>Uploading...</span>
        </div>
      )}
    </div>
  );
}

export default AddProduct;

