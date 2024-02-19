import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../components/Product Card/ProductCard";
import "./allCategoryProducts.css";
import Slider from "@mui/material/Slider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3F6745",
    },
  },
});

function AllCategoryProduct(props) {

  const { tag } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [allCategoryProducts, setAllCategoryProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const sliderMax = 1000;
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCondition, setSelectedCondition] = useState("1");
  const [selectedSort, setSelectedSort] = useState("");

  async function getAll() {
    setIsLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/products/${tag}`);
      setAllCategoryProducts(res.data.data);
      setFilteredProducts(res.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAll();
  }, [tag]);

  const filterProducts = () => {

    let filtered = allCategoryProducts.filter((product) => {
     
      const priceInRange = product.price >= priceRange[0] && product.price <= priceRange[1];
      const conditionMatches = product.condition >= selectedCondition;

      return priceInRange && conditionMatches;

    });

    if (selectedSort) {
      filtered = filtered.sort((a, b) => {
        if (a[selectedSort] < b[selectedSort]) return -1;
        if (a[selectedSort] > b[selectedSort]) return 1;
        return 0;
      });

    }

    setFilteredProducts(filtered);
  };

  const handleShowResult = () => {
    filterProducts();
  };

  const clearFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedCondition("1");
    setSelectedSort("");
    setFilteredProducts(allCategoryProducts);
  };

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
          <div className="conditionFilter">
            <label className="container">
              4⭐and above
              <input
                type="radio"
                name="condition"
                value="4"
                onChange={(e) => {
                  setSelectedCondition(e.target.value);
                }}
                checked={selectedCondition === "4"}
              />
              <span className="checkmark"></span>
            </label>
            <label className="container">
              3⭐and above
              <input
                type="radio"
                name="condition"
                value="3"
                onChange={(e) => {
                  setSelectedCondition(e.target.value);
                }}
                checked={selectedCondition === "3"}
              />
              <span className="checkmark"></span>
            </label>
            <label className="container">
              2⭐and above
              <input
                type="radio"
                name="condition"
                value="2"
                onChange={(e) => {
                  setSelectedCondition(e.target.value);
                }}
                checked={selectedCondition === "2"}
              />
              <span className="checkmark"></span>
            </label>
            <label className="container">
              1⭐and above
              <input
                type="radio"
                name="condition"
                value="1"
                onChange={(e) => {
                  setSelectedCondition(e.target.value);
                }}
                checked={selectedCondition === "1"}
              />
              <span className="checkmark"></span>
            </label>
          </div>
        </div>

        <div className="sort">
          <h3>Sort By </h3>
          <label className="container">
            Price : Low to High
            <input
              type="radio"
              name="sort"
              value={"price"}
              onChange={(e) => {
                setSelectedSort(e.target.value);
              }}
              checked={selectedSort === "price"}
            />
            <span className="checkmark"></span>
          </label>
          <label className="container">
            Price : High to Low
            <input
              type="radio"
              name="sort"
              value={"-price"}
              onChange={(e) => {
                setSelectedSort(e.target.value);
              }}
              checked={selectedSort === "-price"}
            />
            <span className="checkmark"></span>
          </label>
          <label className="container">
            Condition : Low to High
            <input
              type="radio"
              name="sort"
              value={"condition"}
              onChange={(e) => {
                setSelectedSort(e.target.value);
              }}
              checked={selectedSort === "condition"}
            />
            <span className="checkmark"></span>
          </label>
          <label className="container">
            Condition : High to Low
            <input
              type="radio"
              name="sort"
              value={"-condition"}
              onChange={(e) => {
                setSelectedSort(e.target.value);
              }}
              checked={selectedSort === "-condition"}
            />
            <span className="checkmark"></span>
          </label>

          <button className="showButton" onClick={handleShowResult}>
            Show Result
          </button>
          <button className="clearButton" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>

      <div className="allCategoryFrame">
        {isLoading ? (
          <CircularProgress className="loader" size="60px" color="success" />
        ) : filteredProducts.length <= 0 ? (
          <h1 className="nodata">Sorry, No Product Found!</h1>
        ) : (
          filteredProducts.map((item) => <ProductCard item={item} key={item.id} />)
        )}
      </div>
    </>
  );
}

export default AllCategoryProduct;
