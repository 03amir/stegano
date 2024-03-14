import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home Page/Home.jsx';
import SpecificProduct from './pages/Specific Product Details/SpecificProduct';
import AllCategoryProduct from './pages/All Category Products/AllCategoryProduct';
import AddProduct from './pages/Add Product/AddProduct';
import _404 from './pages/_404/_404';
import Footer from './components/Footer/Footer';
import Profile from './pages/Profile/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Contact from './pages/Contact/Contact.js';
import { checkAuthAsync } from './redux/userSlice';

function AppLayout(props) {

    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.user.isAuth);

    useEffect(() => {
        dispatch(checkAuthAsync());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route exact path="/product/:tag/:id" element={<SpecificProduct />} />
                <Route exact path="/products/:tag" element={<AllCategoryProduct />} />
                {isAuth ? (
                    <Route exact path="/products/addproduct" element={<AddProduct />} />
                ) : (
                    <Route path="/" element={<Home />} />
                )}
                {isAuth ? <Route path="/profile" element={<Profile />} /> : null}
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<_404 />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default AppLayout;
