import React, { useContext, useEffect, useState } from "react";
import "../../components/FeatureCategory.css";
import "../../components/Category.css";
import VastraCat from "../../images/VastraCatagorySmall.jpg";
import VastraCat2 from "../../images/VastraCategory2Small.png";
import VastraCat3 from "../../images/ShangarSmallCategory.png";
import VastraCat4 from "../../images/ShringarSmallCategory.jpg";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import MidFooter from "../../components/MidFooter";
import Featured from "../../components/Featured";
import Subscribe from "../../components/Subscribe";
import MobileSidebar from "../../components/MobileSidebar";
import SignContext from "../../contextAPI/Context/SignContext";


const AllCategory = ({ background }) => {

// const categories = [
//   {
//     name: "Shri Mastak",
//     image: VastraCat,
//     itemCount: 29,
//     color: "#fff ",
//   },
//   {
//     name: "Shri Karna",
//     image: VastraCat4,
//     itemCount: 29,
//     color: "#fff ",
//   },
//   {
//     name: "Shishful",
//     image: VastraCat3,
//     itemCount: 29,
//     color: "#fff ",
//   },
//   {
//     name: "Vastra",
//     image: VastraCat2,
//     itemCount: 29,
//     color: "#fff ",
//   },
//   {
//     name: "Shringar",
//     image: VastraCat4,
//     itemCount: 29,
//     color: "#fff ",
//   },
//   {
//     name: "Shangar",
//     image: VastraCat3,
//     itemCount: 29,
//     color: "#fff ",
//   },
//   {
//     name: "Mukhravind",
//     image: VastraCat,
//     itemCount: 29,
//     color: "#fff ",
//   },
//   {
//     name: "Shringar",
//     image: VastraCat4,
//     itemCount: 29,
//     color: "#fff ",
//   },
//   {
//     name: "Shangar",
//     image: VastraCat3,
//     itemCount: 29,
//     color: "#fff ",
//   },
//   {
//     name: "Shangar",
//     image: VastraCat3,
//     itemCount: 29,
//     color: "#fff ",
//   },
//   {
//     name: "Shangar",
//     image: VastraCat3,
//     itemCount: 29,
//     color: "#fff ",
//   },
//   {
//     name: "Shangar",
//     image: VastraCat3,
//     itemCount: 29,
//     color: "#fff ",
//   },

//   // Add more categories here...
// ];

const CategoryCard = ({ name, image, itemCount, color , id }) => (
  <div className="col-12  col-md-6 col-lg-3  category col-lg-1-5">
    <Link to={`/product-list/${id}`}>
      <div className="card" style={{ backgroundColor: color }}>
        <img src={`${url}/cagtegory/${image}`} className="card-img-top" alt={name} />
        <div className="card-body">
          <p className="card-text mt-2 d-block">
            <span className="fw-bold ">
              <Link to={`/product-list/${id}`}>{name}</Link>
            </span>
            
          </p>
        </div>
      </div>
    </Link>
  </div>
);


  const url = `${process.env.REACT_APP_BASE_URL}`;

  const { getCategories } = useContext(SignContext);
  const navigate = useNavigate();

  const [CategoryData, setCategoryData] = useState([]);

  const Getcategories = async () => {
    const res = await getCategories();
    // console.log(res);
    if (res !== undefined) {
    const transformedData = res.map((category, index) => ({
      ...category,
      id: index + 1,
    }));
    setCategoryData(transformedData);}
  };

  useEffect(() => {
    // Scroll back to the top when the component loads
    Getcategories();
    window.scrollTo(0, 0);
  }, []);

  const inlineStyle = {
    padding: "20px",
    paddingTop: "1px",
    // marginTop: "-50px",


    background: background || "#f2fce4", // Use the prop value if provided, or red as a default
  };
  return (
    <div>
      <Header />
      <MobileSidebar />

      <div style={inlineStyle}>
        <div className="container">
        <div className="row text-start">
          <div className="col">
          <h1 className="fs-1 mt-4 mb-4 fw-bold text-start">Our Category</h1>
          </div>
          <div className="col text-end d-flex align-items-center justify-content-end">
            <Link to="/shop" className="mb-2"><strong>view all Products</strong></Link>
          </div>
          </div>
          <div className="row">
            {CategoryData.map((category, index) => (
            <CategoryCard
              key={index}
              name={category.name}
              image={category.image}
              // itemCount={category.noOfProducts}
              id={category._id}
              // onClick={()=>{category._id}}
              // color={category.color}
            />
          ))}
          </div>
        </div>
      </div>
      <Subscribe />
      <Featured />
      <MidFooter />
    </div>
  );
};

export default AllCategory;
