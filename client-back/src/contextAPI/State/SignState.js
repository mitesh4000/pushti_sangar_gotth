import axios from "axios";
import SignContext from "../Context/SignContext";
import React, { useState } from "react";

export const SignState = (props) => {
  const url = `${process.env.REACT_APP_BASE_URL}`;
  // console.log(url)
  // const url = `http://localhost:5000`;

  // create customer
const [OpenLoginModal, setOpenLoginModal] = useState(false);


  const createCustomer = async (customerInfo) => {
    try {
      const response = await axios.post(
        `${url}/customer/register`,
        customerInfo
      );
      return response.data;
    } catch (error) {
      console.error("Error", error);
      return {
        success: false,
        msg: "An error occurred while adding the category.",
      };
    }
  };

  // login customer
  const loginCustomer = async (CustomerInfo) => {
    try {
      const response = await axios.post(`${url}/customer/login`, CustomerInfo);
      return response.data;
    } catch (error) {
      console.error("Error during API call:", error);
      // return ({ success: false, msg: "server Error" })
    }
  };

  //Forgot Password
  const forgotCustomerPassword = async (CustomerInfo) => {
    try {
      const response = await axios.post(
        `${url}/customer/forgetpassword`,
        CustomerInfo
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  //Reset Password
  const resetCustomerPassword = async (resetToken, password) => {
    try {
      const response = await axios.post(
        `${url}/customer/resetpassword/${resetToken}`,
        { password: password }
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // LoggedIn User
  const getLoggedInCustomer = async (Token) => {
    try {
      const response = await axios.post(`${url}/customer/getloggedincustomer`, {
        token: Token,
      });
      return response.data;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  // Get Specific Customer
  const GetSpecificCustomer = async (customerId) => {
    try {
      const response = await axios.post(
        `${url}/customer/getSpecificCustomer/${customerId}`,
        {}
      );
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  // Update Customer
  const UpdateCustomer = async (customerId, customerInfo) => {
    try {
      const response = await axios.post(
        `${url}/customer/updatecustomer/${customerId}`,
        {
          customerInfo,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error", error);
      return { success: false, msg: "An error occurred" };
    }
  };

  // Update Password
  const changePassword = async (CustomerInfo, id, Token) => {
    try {
      const response = await axios.post(
        `${url}/customer/updatecustomerpassword/${id}`,
        {
          ...CustomerInfo,
          token: Token,
        }
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Get Categories
  const getCategories = async () => {
    try {
      const response = await axios.post(`${url}/category/getcategories`);
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Get Products
  const getProducts = async () => {
    try {
      const response = await axios.post(`${url}/product/getallproducts`);
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // GetSpecific Product
  const getSpecificProduct = async (ProductId) => {
    try {
      const response = await axios.post(
        `${url}/product/getspecificproduct/${ProductId}`,
        {}
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // specific Sub-categories
  const getSpecificSubcategories = async (categoryId) => {
    try {
      const response = await axios.post(
        `${url}/api/${categoryId}/subcategories`
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Add To Cart
  const addToCart = async (CustomerId, CartInfo) => {
    try {
      const response = await axios.post(
        `${url}/customer/addtocart/${CustomerId}`,
        CartInfo
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // GetLoggedInCustomerCartItems
  const GetLoggedInCartItems = async (CustomerId) => {
    try {
      const response = await axios.post(
        `${url}/customer/getcustomercart/${CustomerId}`,
        {}
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Remove all Items from Cart
  const RemoveAllItemsFromCart = async (CustomerId) => {
    try {
      const response = await axios.post(
        `${url}/customer/removeallfromcart/${CustomerId}`,
        {}
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // updateCartItem
  const UpdateCartItem = async (CustomerId, CartInfo) => {
    try {
      const response = await axios.post(
        `${url}/customer/updatecart/${CustomerId}`,
        CartInfo
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // CreateOrder
  const CreateOrder = async (OrderInfo) => {
    try {
      const response = await axios.post(`${url}/orders/addorder`, OrderInfo);
      return response.data;
    } catch (error) {
      console.error("Error", error);
      return {
        success: false,
        msg: "An error occurred while adding the category.",
      };
    }
  };

  // Get SpecificTax by Id
  const GetSpecificTax = async (taxId) => {
    try {
      const response = await axios.post(
        `${url}/gst/getspecificgst/${taxId}`,
        {}
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // remove item from Cart
  const removeItemFromCart = async (CustomerId, ProductId) => {
    try {
      const response = await axios.post(
        `${url}/customer/removefromcart/${CustomerId}`,
        { ProductId }
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Add Wishlist
  const addToWishlist = async (CustomerId, WishlistInfo) => {
    try {
      const response = await axios.post(
        `${url}/customer/createwishlist/${CustomerId}`,
        WishlistInfo
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Get Wishlist
  const GetLoggedInWishlistItems = async (CustomerId) => {
    try {
      const response = await axios.post(
        `${url}/customer/getcustomerwishlist/${CustomerId}`,
        {}
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // remove item from Wishlist
  const removeItemFromWishlist = async (CustomerId, ProductId) => {
    try {
      const response = await axios.post(
        `${url}/customer/removefromwishlist/${CustomerId}`,
        { ProductId }
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // GetProductsbyCategoryId
  const GetProductsbyCategoryId = async (CategoryId) => {
    try {
      const response = await axios.post(
        `${url}/product/getproductsbycategoryid/${CategoryId}`,
        {}
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const GetallCoupons = async () => {
    try {
      const response = await axios.post(`${url}/coupons/getcoupons`);
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const GetCouponbyId = async (couponId) => {
    try {
      const response = await axios.post(
        `${url}/coupons/getspecificcoupon/${couponId}`,
        {}
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const getAllBanner = async () => {
    try {
      const response = await axios.post(`${url}/banner/get-banner`);
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const getBlogs = async () => {
    try {
      const response = await axios.post(`${url}/blog/get-blog`);
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const getBlogbyId = async (id) => {
    try {
      const response = await axios.post(`${url}/blog/get-blog/${id}`, {});
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const GetAllVarProducts = async (otherVaraitions) => {
    try {
      console.log(otherVaraitions);
      const response = await axios.post(`${url}/product/getvarproduct`, {
        productIds: otherVaraitions,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const GetAboutUsContent = async (contentId) => {
    try {
      const response = await axios.post(
        `${url}/content/getspecificcontent/6512993637dd0d0cd33483f9`,
        {}
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const GetorderHistorybyId = async (customerId) => {
    try {
      const response = await axios.post(
        `${url}/customer/getorderhistory/${customerId}`,
        {}
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const getfilteredProducts = async (
    category,
    color,
    material,
    season,
    minPrice,
    maxPrice
  ) => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/product/getallproducts`;

      // Create an object to hold the query parameters
      const queryParams = {};

      if (category) {
        queryParams.category = category;
      }

      if (color) {
        queryParams.color = color;
      }

      if (material) {
        queryParams.material = material;
      }

      if (season) {
        queryParams.season = season;
      }

      if (minPrice !== null && minPrice !== undefined) {
        queryParams.minPrice = minPrice;
      }

      if (maxPrice !== null && maxPrice !== undefined) {
        queryParams.maxPrice = maxPrice;
      }

      // Convert the queryParams object into a query string
      const queryString = Object.keys(queryParams)
        .map((key) => `${key}=${queryParams[key]}`)
        .join("&");

      // Add the query string to the URL if there are query parameters
      const fullUrl = queryString ? `${url}?${queryString}` : url;

      const response = await axios.get(fullUrl);
      return response.data;
    } catch (error) {
      return { success: false, msg: "Server Error" };
    }
  };

  const getColors = async () => {
    try {
      const response = await axios.post(`${url}/color/getcolors`);
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const GetPrivacyPolicy = async (contentId) => {
    try {
      const response = await axios.post(
        `${url}/content/getspecificcontent/6543bb2698a219d89dd67b68`,
        {}
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const GeReturnPolicy = async (contentId) => {
    try {
      const response = await axios.post(
        `${url}/content/getspecificcontent/6543bb3b98a219d89dd67b6b`,
        {}
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const GetTermsCondition = async (contentId) => {
    try {
      const response = await axios.post(
        `${url}/content/getspecificcontent/6543bb7598a219d89dd67b73`,
        {}
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const GetFAQs = async (contentId) => {
    try {
      const response = await axios.post(
        `${url}/content/getspecificcontent/6543bb8498a219d89dd67b76`,
        {}
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const GetMidfooter = async (contentId) => {
    try {
      const response = await axios.post(
        `${url}/content/getspecificcontent/6543bbc598a219d89dd67b79`,
        {}
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const GetHotDeals = async (contentId) => {
    try {
      const response = await axios.post(
        `${url}/content/getspecificcontent/6543bbdf98a219d89dd67b7c`,
        {}
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const GetDisclaimer = async (contentId) => {
    try {
      const response = await axios.post(
        `${url}/content/getspecificcontent/652d0f1a441c0e7e4d9a4b29`,
        {}
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const getMaterials = async () => {
    try {
      const response = await axios.post(`${url}/material/getmaterial`);
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const getSeasons = async () => {
    try {
      const response = await axios.post(`${url}/season/getseasons`);
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const getBlogCategories = async () => {
    try {
      const response = await axios.post(`${url}/blogcategory/getblogcategory`);
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const GetBlogbyCategoryId = async (id) => {
    try {
      const response = await axios.post(
        `${url}/blog/getblogbycategory/${id}`,
        {}
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const GetMidBanner = async (contentId) => {
    try {
      const response = await axios.post(
        `${url}/content/getspecificcontent/65479214f12a1b3bbc592e36`,
        {}
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const GetMidBannertwo = async (contentId) => {
    try {
      const response = await axios.post(
        `${url}/content/getspecificcontent/65479232f12a1b3bbc592e39`,
        {}
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const GetMidBannerthree = async (contentId) => {
    try {
      const response = await axios.post(
        `${url}/content/getspecificcontent/65479250f12a1b3bbc592e3c
      `,
        {}
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Add Subscribe
  const AddSubscribe = async (SubscribeData) => {
    try {
      const response = await axios.post(
        `${url}/subscribe/addsubscribe`,
        SubscribeData
      );
      return response.data;
    } catch (error) {
      console.error("Error adding content:", error);
      return {
        success: false,
        msg: "An error occurred while adding the email.",
      };
    }
  };

  // Add Contact
  const AddContact = async (ContactData) => {
    try {
      const response = await axios.post(
        `${url}/contact/addcontact`,
        ContactData
      );
      return response.data;
    } catch (error) {
      console.error("Error adding content:", error);
      return {
        success: false,
        msg: "An error occurred while adding the contact.",
      };
    }
  };

  // Get subCategory & subSubCategory by CategoryId
  const GetsubandsubSubcategory = async (id) => {
    try {
      const response = await axios.post(
        `${url}/category/getsubcategories/${id}`,
        {}
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  return (
    <SignContext.Provider
      value={{
        createCustomer,
        loginCustomer,
        forgotCustomerPassword,
        resetCustomerPassword,
        getLoggedInCustomer,
        GetSpecificCustomer,
        UpdateCustomer,
        changePassword,
        getProducts,
        getCategories,
        getSpecificProduct,
        getSpecificSubcategories,
        addToCart,
        GetLoggedInCartItems,
        RemoveAllItemsFromCart,
        UpdateCartItem,
        CreateOrder,
        GetSpecificTax,
        removeItemFromCart,
        addToWishlist,
        GetLoggedInWishlistItems,
        removeItemFromWishlist,
        GetProductsbyCategoryId,
        GetallCoupons,
        GetCouponbyId,
        getAllBanner,
        getBlogs,
        GetAllVarProducts,
        GetAboutUsContent,
        GetorderHistorybyId,
        getfilteredProducts,
        getColors,
        GetPrivacyPolicy,
        GeReturnPolicy,
        GetTermsCondition,
        GetFAQs,
        GetMidfooter,
        GetHotDeals,
        GetDisclaimer,
        getMaterials,
        getSeasons,
        GetBlogbyCategoryId,
        getBlogCategories,
        getBlogbyId,
        GetMidBanner,
        GetMidBannertwo,
        GetMidBannerthree,
        AddSubscribe,
        AddContact,
        GetsubandsubSubcategory,
        OpenLoginModal,
        setOpenLoginModal
      }}
    >
      {props.children}
    </SignContext.Provider>
  );
};
