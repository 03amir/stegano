import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home Page/Home.jsx";
import SpecificProduct from "./pages/Specific Product Details/SpecificProduct";
import AllCategoryProduct from "./pages/All Category Products/AllCategoryProduct";
import AddProduct from "./pages/Add Product/AddProduct";
import _404 from "./pages//_404/_404";
import Footer from "./components/Footer/Footer";
import Profile from "./pages/Profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Contact from "./pages/Contact/Contact.js";
import { checkAuthAsync } from "./redux/userSlice";
import ErrorBoundary from "./error/ErrorHandler.js";

function AppLayout(props) {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ErrorBoundary>
      <Navbar />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />

        {isAuth && (
          <>
            <Route exact path="/addproduct" element={<AddProduct />} />
            <Route path="/profile" element={<Profile />} />
          </>
        )}

        <Route path="/product/:tag/:id" element={<SpecificProduct />} />
        <Route exact path="/products/:tag" element={<AllCategoryProduct />} />

        <Route path="*" element={<_404 />} />

      </Routes>
      <Footer />
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default AppLayout;
