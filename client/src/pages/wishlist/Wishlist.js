import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import MobileSidebar from "../../components/MobileSidebar";
import Subscribe from "../../components/Subscribe";
import Featured from "../../components/Featured";
import image1 from "../../images/ShangarSmallCategory.png";
import image2 from "../../images/VastraCatagorySmall.jpg";
import image3 from "../../images/ShringarSmallCategory.jpg";
import "./Wishlist.css";
import { Link, useParams } from "react-router-dom";
import SignContext from "../../contextAPI/Context/SignContext";
import MidFooter from "../../components/MidFooter";

const Wishlist = () => {
  const url = `${process.env.REACT_APP_BASE_URL}`;
  const { id } = useParams();
  const { GetLoggedInWishlistItems, addToCart, removeItemFromWishlist } =
    useContext(SignContext);

  const [WishlistData, setWishlistData] = useState([]);

  useEffect(() => {
    console.log("customerId:", id);
    getLoggedinWishlist(id);
    console.log("inside useeffect");
  }, [id]);

  const getLoggedinWishlist = async (CustomerId) => {
    const res = await GetLoggedInWishlistItems(CustomerId);
    console.log("get cart", res);
    if (res.success) {
      setWishlistData(res.wishlistItems);
    }
  };

  const handleCartClick = async (ProductId) => {
    try {
      const customerId = id; // Replace with the actual customer ID
      const cartInfo = {
        ProductId : ProductId,
        quantity: 1,
      };
      const res = await addToCart(customerId, cartInfo);

      if (res.success) {
        // Cart updated successfully
        console.log("Cart updated successfully");
        // navigate(`/cart/${customerId}`);
      } else {
        // Handle the error
        console.error(res.msg);
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Unexpected error:", error);
    }
  };

  const handleRemoveItemFromWishList = async (productId) => {
    try {
      const customerId = id; // Replace with the actual customer ID
      const res = await removeItemFromWishlist(customerId, productId);

      if (res.success) {
        // Cart updated successfully
        console.log("Wishlist updated successfully");
        getLoggedinWishlist(id);
        // navigate(`/cart/${customerId}`);
      } else {
        // Handle the error
        console.error(res.msg);
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Unexpected error:", error);
    }
  };

  // const products = [
  //   {
  //     id: 1,
  //     name: "Field Roast Chao Cheese Creamy Original",
  //     price: "₹2.51",
  //     stockStatus: "In Stock",
  //     imageUrl: image1, // Replace with the actual image URL
  //   },
  //   {
  //     id: 2,
  //     name: "Blue Diamond Almonds Lightly Salted",
  //     price: "₹3.2",
  //     stockStatus: "In Stock",
  //     imageUrl: image2, // Replace with the actual image URL
  //   },
  //   {
  //     id: 3,
  //     name: "Fresh Organic Mustard Leaves Bell Pepper",
  //     price: "₹2.43",
  //     stockStatus: "In Stock",
  //     imageUrl: image3, // Replace with the actual image URL
  //   },
  //   {
  //     id: 4,
  //     name: "Angie’s Boomchickapop Sweet & Salty",
  //     price: "₹3.21",
  //     stockStatus: "Out Stock",
  //     imageUrl: image1, // Replace with the actual image URL
  //   },
  //   {
  //     id: 5,
  //     name: "Foster Farms Takeout Crispy Classic",
  //     price: "₹3.17",
  //     stockStatus: "In Stock",
  //     imageUrl: image2, // Replace with the actual image URL
  //   },
  // ];

  const renderProductDetails = () => {
    return WishlistData.map((item) => (
      <tr key={item.id}>
        {/* <td className="custome-checkbox pl-30">
          <input
            className="form-check-input"
            type="checkbox"
            name="checkbox"
            id={`exampleCheckbox${product.id}`}
            defaultValue
          />
          <label
            className="form-check-label"
            htmlFor={`exampleCheckbox${product.id}`}
          />
        </td> */}
        <td className="product-thumbnail pt-40">
          <img
            src={`${url}/products/${item.product.imageGallery[0]}`}
            alt="#"
          />
        </td>
        <td className="product-des product-name">
          <h6>
            <Link className="product-name mb-10" to="#">
              {item.product.name}
            </Link>
          </h6>
        </td>
        <td className="price" data-title="Price">
          <h3 className="text-grand fs-4">{item.product.prices.discounted?item.product.prices.discounted:item.product.prices.calculatedPrice}</h3>
        </td>
        <td className="text-center detail-info" data-title="Stock">
          <span className="stock-status in-stock mb-0">
            {item.product.stock.quantity}
          </span>
        </td>
        <td className="text-right" data-title="Cart">
          <button className="btn btn-sm" onClick={() => {
              handleCartClick(item.product._id);
            }}>
            Add to cart
          </button>
        </td>
        <td className="action text-center" data-title="Remove">
          <Link
            onClick={() => {
              handleRemoveItemFromWishList(item.product._id);
            }}
            className="text-body"
          >
            <i className="fi-rs-trash bi bi-trash" />
          </Link>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <Header />
      <MobileSidebar />
      <div className="container mb-30 mt-50">
        <div className="row">
          <div className="col-xl-10 col-lg-12 m-auto">
            <div className="mb-50 text-start">
              <h1 className="heading-2 mb-10 fs-1">Your Wishlist</h1>
              <h6 className="text-body">
                There are{" "}
                <span className="">
                  {WishlistData ? WishlistData.length : null}
                </span>{" "}
                products in this list
              </h6>
            </div>
            <div className="table-responsive shopping-summery">
              <table className="table table-wishlist">
                <thead>
                  <tr className="main-heading">
                    {/* <th className="custome-checkbox start pl-30">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="checkbox"
                        id="selectAllCheckbox"
                        defaultValue
                      />
                      <label
                        className="form-check-label"
                        htmlFor="selectAllCheckbox"
                      />
                    </th> */}
                    <th scope="col" colSpan={2}>
                      Product
                    </th>
                    <th scope="col">Price</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Action</th>
                    <th scope="col" className="end">
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody>{renderProductDetails()}</tbody>
              </table>
              {/* <h1 className="text-warning">This Page is Under Process.</h1> */}
            </div>
          </div>
        </div>
      </div>

      <Subscribe />
      <Featured />
      <MidFooter />
    </div>
  );
};

export default Wishlist;
