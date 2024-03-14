import React, { useState } from "react";
import axios from "axios";
import "./userUpdate.css";
import { checkAuthAsync } from "../redux/userSlice";
import { useDispatch } from "react-redux";

function UserUpdatePopUp({ userdata, setIsUpdating }) {
  
    const dispatch = useDispatch();

  const [name, setName] = useState(userdata.name);
  const [collegeName, setCollegeName] = useState(userdata.collegeName || "");
  const [mobile, setMobile] = useState(userdata.mobile || "");

  async function updateUser() {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/updateUser`,
        {
          name,
          collegeName,
          mobile,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtSwap"),
          },
        }
      );

      setIsUpdating(false);
      dispatch(checkAuthAsync());
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  function oncancel() {
    setIsUpdating(false);
  }

  function handleClickOutside(event) {
    if (event.target.classList.contains("popupBackground")) {
      setIsUpdating(false);
    }
  }

  return (
    <div className="popupBackground" onClick={handleClickOutside}>
      <div className="popupContent">
        <h2>Edit Profile</h2>
        <label>User name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label>College Name</label>
        <input
          type="text"
          value={collegeName}
          onChange={(e) => {
            setCollegeName(e.target.value);
          }}
        />
        <label>Mobile Number</label>
        <input
          type="number"
          value={mobile}
          onChange={(e) => {
            setMobile(e.target.value);
          }}
        />
        <div className="buttons">
          <button className="saveBtn" onClick={updateUser}>
            Save
          </button>
          <button className="cancelBtn" onClick={oncancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserUpdatePopUp;
