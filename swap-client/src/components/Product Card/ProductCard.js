import React from 'react';
import './productCard.css';
import { useNavigate } from "react-router-dom";

function ProductCard({item}) {

    const navigate = useNavigate()

    async function sendToDetails(id,tag){
        navigate(`/product/${tag}/${id}`)
    }
    return (
        <div onClick={() => {
            sendToDetails(item._id, item.tag)

        }} className='productCard'>

        <img src={item.productImage} alt="product" />
 
        </div>
    );
}

export default ProductCard;