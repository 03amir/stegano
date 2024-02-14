import React from "react";
import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../components/Product Card/ProductCard";
import "./allCategoryProducts.css";
import Slider from "@mui/material/Slider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

// for styling the slider of material ui
const theme = createTheme({
  palette: {
    primary: {
      main: "#3F6745",
    },
  },
});


function AllCategoryProduct(props) {

  const[isLoading, setIsLoading] = useState(true);
  
  const navigate = useNavigate();  
  
  const { tag } = useParams();
  
  const filters = `?category=${tag}`;

  const search = useLocation().search || filters ;

  const searchParams = new URLSearchParams(search);
  
  const [allCategoryProducts, setAllCategoryProducts] = useState([]);

  const [sliderMax, setSliderMax] = useState(1000);
  const [priceRange, setPriceRange] = useState([searchParams.get('price[gte]')|| 0, searchParams.get('price[lte]') || 1000]);

  const [filterUrl, setFilterUrl] = useState();

  const [selectedCondition, setSelectedCondition] = useState(searchParams.get('condition[gte]') || '1');
  const [selectedSort, setSelectedSort] = useState(searchParams.get('sort'));

  async function getAll() {

    setIsLoading(true)

    const res = await axios(
        `${process.env.REACT_APP_BASE_URL}/allproducts${search}`
      );

      setAllCategoryProducts(res.data.data);

      setIsLoading(false)
  }

  useEffect(() => {
    getAll(); 
  },[filterUrl]);

  function addQueryParam(){

    
    let url = new URLSearchParams('')
    url.set('category',tag)
    url.set('price[lte]',priceRange[1])
    url.set('price[gte]',priceRange[0])
    url.set('condition[gte]',selectedCondition)
    url.set('sort',selectedSort)
    url ='?'+ url.toString().replace(/%5B/gi,'[').replace(/%5D/gi,']')
    setFilterUrl(url)
    return url;
  }

  function clearFilters (){
    setPriceRange([0,1000]);
    setSelectedCondition("1");
    setSelectedSort();
    setFilterUrl(`/products/${tag}`)
    navigate(`/products/${tag}`)
  }


  return (
    <>
      <div className="filtersSort">
        <div className="filters">
          <h3>Price Range</h3>

          <ThemeProvider theme={theme}>
            <Slider
              color="primary"
              min={0}
              max={sliderMax}
              value={priceRange}
              valueLabelDisplay="auto"
              disableSwap
              step={10}
              onChange={(e, newVal) => {
                setPriceRange(newVal);
              }}
            />
          </ThemeProvider>

          <h3>Conditions</h3>
          <div className="condtionFilter" >


          <label className="container"> 4⭐and above
            <input type="radio" name="condition" value="4" onChange={(e)=>{setSelectedCondition(e.target.value) }} checked={selectedCondition === "4"} />
            <span className="checkmark"></span>
          </label>

          <label className="container">3⭐and above
            <input type="radio" name="condition" value="3" onChange={(e)=>{setSelectedCondition(e.target.value); }} checked={selectedCondition === "3"} />
            <span className="checkmark"></span>
          </label>
          <label className="container">2⭐and above
            <input type="radio" name="condition" value="2" onChange={(e)=>{setSelectedCondition(e.target.value);}} checked={selectedCondition === "2"} />
            <span className="checkmark"></span>
          </label>
          <label className="container">1⭐and above
            <input type="radio" name="condition" value="1" onChange={(e)=>{setSelectedCondition(e.target.value); }} checked={selectedCondition === "1"} />
            <span className="checkmark"></span>
          </label>

           </div>
        </div>

        <div className="sort">
          <h3>Sort By </h3>
          <label className="container"> Price : Low to High
            <input type="radio" name="sort" value={"price"} onChange={(e)=>{setSelectedSort(e.target.value)}} checked={selectedSort === "price"} />
            <span className="checkmark"></span>
          </label>
          <label className="container">Price : High to Low
            <input type="radio" name="sort" value={"-price"} onChange={(e)=>{setSelectedSort(e.target.value)}} checked={selectedSort === "-price"}/>
            <span className="checkmark"></span>
          </label>
          <label className="container">  Condition : Low to High
            <input type="radio" name="sort" value={"condition"} onChange={(e)=>{setSelectedSort(e.target.value)}} checked={selectedSort === "condition"}/>
            <span className="checkmark"></span>
          </label>
          <label className="container"> Condition : High to Low
            <input type="radio" name="sort" value={"-condition"} onChange={(e)=>{setSelectedSort(e.target.value)}} checked={selectedSort === "-condition"}/>
            <span className="checkmark"></span>
          </label>

          <button className="showButton" onClick={()=>{navigate(addQueryParam())}}>Show Result</button>
           <button className="clearButton" onClick={clearFilters}>Clear Filters</button>
        </div>
      </div>

      <div className="allCategoryFrame">

      { isLoading? 
        <CircularProgress className="loader" size="60px"  color="success" />
       : 
        allCategoryProducts.length<=0? <h1 className="nodata">Sorry, No Product Found!</h1>: allCategoryProducts?.map((item) => {
          return <ProductCard item={item} />;
        })
       
      }

      
      </div>
    </>
  );
}

export default AllCategoryProduct;
