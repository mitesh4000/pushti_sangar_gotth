import axios from "axios";
import SignContext from "../Context/SignContext";
import React from "react";

export const SignState = (props) => {
  // const url = `http://localhost:5000`;
  const url = `${process.env.REACT_APP_BASE_URL}`;

  //Register User
  const registerUser = async (UserInfo) => {
    const formData = new FormData();
    try {
      console.log(formData);
      formData.append("name", UserInfo.name);
      formData.append("email", UserInfo.email);
      formData.append("password", UserInfo.password);
      formData.append("confirmPassword", UserInfo.confirmPassword);
      formData.append("roles", UserInfo.roles);
      formData.append("active", UserInfo.active);
      formData.append("photo", UserInfo.photo);

      const response = await axios.post(`${url}/api/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  // try {
  //   if (UserInfo.password !== UserInfo.confirmPassword) {
  //     return {
  //       success: false,
  //       msg: "Password and confirm password do not match",
  //     };
  //   }
  //   const response = await axios.post(`${url}/api/register`, UserInfo);
  //   return response;
  // } catch (error) {
  //   return ({ success: false, msg: "server Error" })
  // }

  //Login User
  const loginUser = async (UserInfo) => {
    try {
      const response = await axios.post(`${url}/api/login`, UserInfo);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  //Forgot Password
  const forgotPassword = async (UserInfo) => {
    try {
      const response = await axios.post(`${url}/api/forgotpassword`, UserInfo);

      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  //Reset Password
  const resetPassword = async (resetToken, password) => {
    try {
      const response = await axios.put(
        `${url}/api/users/resetpassword/${resetToken}`,
        { password: password }
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Update Password
  const changePassword = async (UserInfo, Token) => {
    try {
      const response = await axios.post(`${url}/api/updatepassword`, {
        ...UserInfo,
        token: Token,
      });
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Get LoggedInUser
  const getLoggedInUser = async (Token) => {
    try {
      const response = await axios.post(`${url}/api/getloggedinuser`, {
        token: Token,
      });
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  // Get Specific user
  const getSpecificUser = async (id, role) => {
    try {
      const response = await axios.post(`${url}/api/getspecificuser`, {
        id: id,
        roles: [role],
      });
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  // GetUsers
  const getUsers = async () => {
    try {
      const response = await axios.post(`${url}/api/getusers`);
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Update User
  const updateUser = async (userInfo, photo) => {
    try {
      const formData = new FormData();
      formData.append("name", userInfo.name);
      formData.append("roles", userInfo.roles);
      formData.append("active", userInfo.active);
      formData.append("id", userInfo._id);
      if (photo) {
        formData.append("photo", photo);
      }

      const response = await axios.post(`${url}/api/updateuser`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  // delete user
  const deleteUser = async (userId) => {
    try {
      const response = await axios.post(`${url}/api/deleteuser`, {
        id: userId,
      });
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Get roles
  const GetRoles = async () => {
    try {
      const response = await axios.post(`${url}/api/getroles`, {});
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // GetrolesSpecificpermissions
  const GetRoleSpecificPermission = async (role) => {
    try {
      const response = await axios.post(`${url}/api/getrolespecificpermisson`, {
        role: role,
      });
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Add Product
  const addProduct = async (ProductData, imageGallery) => {
    try {
      const formData = new FormData();
      formData.append("name", ProductData.name);
      formData.append("description", ProductData.description);
      formData.append("category", ProductData.category);
      formData.append("subCategory", ProductData.subCategory);
      formData.append("subSubCategory", ProductData.subSubCategory);
      formData.append("original", ProductData.original);
      formData.append("discounted", ProductData.discounted);
      formData.append("stock", ProductData.stock);
      formData.append("sku", ProductData.sku);
      formData.append("status", ProductData.status);
      // formData.append("original", ProductData.original);
      // formData.append("original", ProductData.original);
      if (imageGallery) {
        console.log(imageGallery);
        formData.append("imageGallery", imageGallery);
      }
      const response = await axios.post(`${url}/product/addproduct`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  // Add Category
  const addCategory = async (categoryData) => {
    try {
      const response = await axios.post(`${url}/api/addcategory`, categoryData);
      return response;
    } catch (error) {
      console.error("Error adding category:", error);
      return {
        success: false,
        msg: "An error occurred while adding the category.",
      };
    }
  };

  // Get Categories
  const getCategories = async () => {
    try {
      const response = await axios.post(`${url}/category/getcategories`);
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  //Get Specific SubCategories
  const getSpecificSubcategories = async (categoryId) => {
    try {
      const response = await axios.post(
        `${url}/api/${categoryId}/subcategories`
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Get Products
  const getProducts = async () => {
    try {
      const response = await axios.post(`${url}/product/getallproducts`);
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Update Products
  const updateProduct = async (productData, id, mainImage) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("category", productData.category);
      formData.append("subCategory", productData.subCategory);
      formData.append("original", productData.prices.original);
      formData.append("discounted", productData.prices.discounted);
      formData.append("stock", productData.stock);
      formData.append("sku", productData.sku);
      formData.append("status", productData.status);

      if (mainImage) {
        formData.append("mainImage", mainImage);
      }
      const response = await axios.post(`${url}/api/updateproduct`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response;
    } catch (error) {
      console.error("Axios Error:", error);
      return { success: false, msg: "server Error" };
    }
  };

  // GetSpecific Product
  const getSpecificProduct = async (ProductId) => {
    try {
      const response = await axios.post(`${url}/api/getspecificproduct`, {
        id: ProductId,
      });
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Delete Product
  const deleteProduct = async (ProductId) => {
    try {
      const response = await axios.post(`${url}/api/deleteproduct`, {
        id: ProductId,
      });
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Get All Customer
  const getCustomers = async () => {
    try {
      const response = await axios.post(`${url}/customer/getcustomers`);
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Create Customer
  const createCustomer = async (customerInfo) => {
    try {
      const response = await axios.post(
        `${url}/customer/register`,
        customerInfo
      );
      return response;
    } catch (error) {
      console.error("Error", error);
      return {
        success: false,
        msg: "An error occurred while adding the category.",
      };
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
  const UpdateCustomer = async (customerInfo, id) => {
    try {
      const response = await axios.post(`${url}/customer/updatecustomer`, {
        id: id,
        customerInfo,
      });
      return response;
    } catch (error) {
      console.error("Error", error);
      return { success: false, msg: "An error occurred" };
    }
  };

  // Delete Customer
  const deleteCustomer = async (customerId) => {
    try {
      const response = await axios.post(`${url}/customer/deletecustomer`, {
        id: customerId,
      });
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Get All Content
  const GetContent = async () => {
    try {
      const response = await axios.post(`${url}/content/getcontent`);
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Add Content
  const addContent = async (ContentData) => {
    try {
      const response = await axios.post(
        `${url}/content/createcontent`,
        ContentData
      );
      return response;
    } catch (error) {
      console.error("Error adding content:", error);
      return {
        success: false,
        msg: "An error occurred while adding the category.",
      };
    }
  };

  // Get Specific Content
  const GetSpecificContent = async (id) => {
    try {
      const response = await axios.post(
        `${url}/content/getspecificcontent/${id}`,
        {}
      );
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  // Update Content
  const UpdateContent = async (contentData, id) => {
    try {
      const response = await axios.post(
        `${url}/content/updatecontent/${id}`,
        contentData
      );
      return response;
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  // Delete content
  const DeleteContent = async (id) => {
    try {
      const response = await axios.post(
        `${url}/content/deletecontent/${id}`,
        {}
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Get GalleryCategory
  const GetGalleryCat = async () => {
    try {
      const response = await axios.post(`${url}/gallery/getgallerycat`);
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // create GalleryCat
  const createGalleryCat = async (GalleryData) => {
    try {
      const formData = new FormData();
      formData.append("gallaryCategoryTitle", GalleryData.gallaryCategoryTitle);
      formData.append("description", GalleryData.description);
      formData.append("active", GalleryData.active);
      formData.append("deleted", GalleryData.deleted);
      formData.append("imagePath", GalleryData.imagePath);

      const response = await axios.post(
        `${url}/gallery/creategallery`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  // Get SpecificGalleryCat By Id
  const GetSpecificGalleryCatbyId = async (galleryId) => {
    try {
      const response = await axios.post(
        `${url}/gallery/getspecificgallery/${galleryId}`,
        {}
      );
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  // Update GalleryCat
  const UpdateGalleryCat = async (GalleryData, imagePath, GallaryId) => {
    try {
      const formData = new FormData();
      console.log(GallaryId);
      formData.append("gallaryCategoryTitle", GalleryData.gallaryCategoryTitle);
      formData.append("description", GalleryData.description);
      formData.append("active", GalleryData.active);
      formData.append("deleted", GalleryData.deleted);

      if (imagePath) {
        formData.append("imagePath", imagePath);
      }
      const response = await axios.post(
        `${url}/gallery/updategallery/${GallaryId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Axios Error:", error);
      return { success: false, msg: "server Error" };
    }
  };

  // Delete GalleryContent
  const DeleteGalleryCat = async (id) => {
    try {
      const response = await axios.post(
        `${url}/gallery/deletegallerycat/${id}`,
        {}
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Get GalleryDetails
  const GetGalleryDetails = async () => {
    try {
      const response = await axios.post(`${url}/gallerydetails/getgalleries`);
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // create galleryDetails
  const createGalleryDetails = async (GalleryDetailsData) => {
    try {
      const formData = new FormData();
      formData.append("imageTitle", GalleryDetailsData.imageTitle);
      formData.append("description", GalleryDetailsData.description);
      formData.append("galleryCategory", GalleryDetailsData.galleryCategory);
      formData.append("active", GalleryDetailsData.active);
      formData.append("deleted", GalleryDetailsData.deleted);
      formData.append("imagePath", GalleryDetailsData.imagePath);

      const response = await axios.post(
        `${url}/gallerydetails/creategalleryitem`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  // GetSpecific GalleryDetails
  const GetSpecificGalleryDetails = async (id) => {
    try {
      const response = await axios.post(
        `${url}/gallerydetails/getspecificgalleryitem/${id}`,
        {}
      );
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  // Update GalleyDetails
  const updateGalleryDetails = async (GalleryDetailsData, imagePath, id) => {
    try {
      const formData = new FormData();
      formData.append("imageTitle", GalleryDetailsData.imageTitle);
      formData.append("description", GalleryDetailsData.description);
      formData.append("galleryCategory", GalleryDetailsData.galleryCategory);
      formData.append("active", GalleryDetailsData.active);
      formData.append("deleted", GalleryDetailsData.deleted);
      if (imagePath) {
        formData.append("imagePath", imagePath);
      }
      const response = await axios.post(
        `${url}/gallerydetails/updategalleryitem/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  // Delete GalleryDetails
  const DeleteGalleryDetails = async (id) => {
    try {
      const response = await axios.post(
        `${url}/gallerydetails/deletegalleryitem/${id}`,
        {}
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Get Stocks
  const GetStocks = async () => {
    try {
      const response = await axios.post(`${url}/stocks/getstocks`);
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Create Stocks
  const AddStocks = async (stocksData) => {
    try {
      const response = await axios.post(
        `${url}/stocks/createstock`,
        stocksData
      );
      return response;
    } catch (error) {
      console.error("Error adding content:", error);
      return {
        success: false,
        msg: "An error occurred while adding the category.",
      };
    }
  };

  // Update Stocks
  const UpdateStocks = async (id, stocksData) => {
    try {
      const response = await axios.post(
        `${url}/stocks/updatestock/${id}`,
        stocksData
      );
      return response;
    } catch (error) {
      console.error("Error adding content:", error);
      return {
        success: false,
        msg: "An error occurred while adding the category.",
      };
    }
  };

  // Get Specific Stocks by Id
  const GetSpecificStocks = async (id) => {
    try {
      const response = await axios.post(
        `${url}/stocks/getspecificstock/${id}`,
        {}
      );
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  // Delete Stocks by Id
  const DeleteStocks = async (id) => {
    try {
      const response = await axios.post(`${url}/stocks/deletestocks/${id}`, {});
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Add Coupons
  const CreateCoupon = async (couponData) => {
    try {
      const response = await axios.post(
        `${url}/coupons/createcoupon`,
        couponData
      );
      return response;
    } catch (error) {
      console.error("Error adding content:", error);
      return {
        success: false,
        msg: "An error occurred while adding the category.",
      };
    }
  };

  // Get All Coupons
  const GetCoupons = async () => {
    try {
      const response = await axios.post(`${url}/coupons/getcoupons`);
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Coupon by Id
  const GetSpecificCouponbyId = async (id) => {
    try {
      const response = await axios.post(
        `${url}/coupons/getspecificcoupon/${id}`,
        {}
      );
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  // UpdateCoupon by Id
  const UpdateCoupon = async (couponData, id) => {
    try {
      const response = await axios.post(
        `${url}/coupons/updatecoupon/${id}`,
        couponData
      );
      return response;
    } catch (error) {
      console.error("Error adding content:", error);
      return {
        success: false,
        msg: "An error occurred while adding the category.",
      };
    }
  };

  // delete Coupon by Id
  const DeleteCoupon = async (id) => {
    try {
      const response = await axios.post(
        `${url}/coupons/deletecoupon/${id}`,
        {}
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Get Orders
  const GetAllOrders = async () => {
    try {
      const response = await axios.post(`${url}/orders/getallorders`);
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // GetPrice Updates
  const GetPriceUpdates = async () => {
    try {
      const response = await axios.post(`${url}/dailyrates/getprices`);
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // GetspecificPrice By Id
  const GetSpecificPricebyId = async (id) => {
    try {
      const response = await axios.post(`${url}/dailyrates/getprice/${id}`, {});
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Update Price by Id
  const UpdatePrice = async (priceData, id) => {
    try {
      const response = await axios.post(
        `${url}/dailyrates/updateprice/${id}`,
        priceData
      );
      return response;
    } catch (error) {
      console.error("Error adding content:", error);
      return {
        success: false,
        msg: "An error occurred while adding the category.",
      };
    }
  };

  // Delete Order
  const DeleteOrder = async (id) => {
    try {
      const response = await axios.post(`${url}/orders/deleteorder/${id}`, {});
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Get Specific Order by Id
  const getSpecificOrderbyId = async (id) => {
    try {
      const response = await axios.post(
        `${url}/orders/getspecificorder/${id}`,
        {}
      );
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  // Update Order By Id
  const UpdateOrder = async (OrderData, id) => {
    try {
      const response = await axios.post(
        `${url}/orders/updateorder/${id}`,
        OrderData
      );
      return response;
    } catch (error) {
      console.error("Error adding content:", error);
      return {
        success: false,
        msg: "An error occurred while adding the category.",
      };
    }
  };

  // Get Colors
  const GetColors = async () => {
    try {
      const response = await axios.post(`${url}/color/getcolors`);
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Add Colors
  const addColor = async (ColorData) => {
    try {
      const formData = new FormData();
      formData.append("product", ColorData.product);
      formData.append("name", ColorData.name);
      // formData.append("active", GalleryData.active);
      // formData.append("deleted", GalleryData.deleted);
      formData.append("photo", ColorData.photo);

      const response = await axios.post(`${url}/color/addcolor`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  // GetSpecific Colors
  const GetSpecificColorbyId =  async (colorId) => {
    try {
      const response = await axios.post(
        `${url}/color/getspecificcolor/${colorId}`,
        {}
      );
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  // Update Color
  //  delete Color
  const deleteColor = async (id) => {
    try {
      const response = await axios.post(
        `${url}/color/deletecolor/${id}`,
        {}
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Get Size 
  const Getsize  = async () => {
    try {
      const response = await axios.post(`${url}/size/getsizes`);
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Add Size 
  const AddSize = async (SizeData) => {
    try {
      const response = await axios.post(
        `${url}/size/addsize`,
        SizeData
      );
      return response;
    } catch (error) {
      console.error("Error adding content:", error);
      return {
        success: false,
        msg: "An error occurred while adding the category.",
      };
    }
  };

  // Get SpecificSize by Id
  const getSpecificSizebyId = async (id) => {
    try {
      const response = await axios.post(
        `${url}/size/getspecificsize/${id}`,
        {}
      );
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  // Delete Size 
  const DeleteSize = async (id) => {
    try {
      const response = await axios.post(
        `${url}/size/deletesize/${id}`,
        {}
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // GethighCustomerdata
  const GetHighValueCustomersData = async () => {
    try {
      const response = await axios.post(`${url}/orders/gethighcustomerdata`);
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // GetMedCustomersData
  const GetMedValueCustomersData = async () => {
    try {
      const response = await axios.post(`${url}/orders/getmedcustomerdata`);
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // GetTopSellingProducts
  const TopSellingProducts = async () => {
    try {
      const response = await axios.post(`${url}/orders/gettopsellproducts`);
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const GetorderHistorybyId = async (customerId) => {
    try {
      const response = await axios.post(`${url}/customer/getorderhistory/${customerId}`, {
      });
      return response;
    } catch (error) {
      return ({ success: false, msg: "server Error" })
    }
  };

  // categorywise stock
  const getStockbyCategoryId = async (id) => {
    try {
      const response = await axios.post(
        `${url}/stocks/getstocksbycategory/${id}`,
        {}
      );
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };


  // weighttype by stock
  const getStockbyweightTypeId = async (id) => {
    try {
      const response = await axios.post(
        `${url}/stocks/getstocksbyweighttype/${id}`,
        {}
      );
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  // GetblogCategories
  const GetblogCategories  = async () => {
    try {
      const response = await axios.post(`${url}/blogcategory/getblogcategory`);
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Add BlogCategory
  const AddBlogCategory = async (BlogCategoryData) => {
    try {
      const response = await axios.post(
        `${url}/blogcategory/addblogcategory`,
        BlogCategoryData
      );
      return response;
    } catch (error) {
      console.error("Error adding content:", error);
      return {
        success: false,
        msg: "An error occurred while adding the category.",
      };
    }
  };

  // Get Specific BlogCategory
  const getSpecificBlogCategorybyId = async (id) => {
    try {
      const response = await axios.post(
        `${url}/blogcategory/getspecificcategory/${id}`,
        {}
      );
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  // Update BlogCategory
  const UpdateBlogCateogry = async (BlogCategoryData, id) => {
    try {
      const response = await axios.post(
        `${url}/blogcategory/updateblogcategory/${id}`,
        BlogCategoryData
      );
      return response;
    } catch (error) {
      console.error("Error adding content:", error);
      return {
        success: false,
        msg: "An error occurred while adding the category.",
      };
    }
  };

  // Delete BlogCategory
  const DeleteBlogCategory = async (id) => {
    try {
      const response = await axios.post(
        `${url}/blogcategory/deletecategory/${id}`,
        {}
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const GetSubscribes  = async () => {
    try {
      const response = await axios.post(`${url}/subscribe/getsubscribe`);
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const GetContacts  = async () => {
    try {
      const response = await axios.post(`${url}/contact/getcontacts`);
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const GetContactbyId  = async (id) => {
    try {
      const response = await axios.post(`${url}/contact/getcontact/${id}`,
      {}
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const DeleteSubscribe = async (id) => {
    try {
      const response = await axios.post(
        `${url}/subscribe/deletesubscribe/${id}`,
        {}
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const Deletecontact = async (id) => {
    try {
      const response = await axios.post(
        `${url}/contact/deletecontact/${id}`,
        {}
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };



  return (
    <SignContext.Provider
      value={{
        registerUser,
        loginUser,
        forgotPassword,
        resetPassword,
        changePassword,
        getLoggedInUser,
        getSpecificUser,
        getUsers,
        updateUser,
        deleteUser,
        GetRoles,
        GetRoleSpecificPermission,
        addProduct,
        addCategory,
        getCategories,
        getSpecificSubcategories,
        getProducts,
        updateProduct,
        getSpecificProduct,
        deleteProduct,
        getCustomers,
        createCustomer,
        GetSpecificCustomer,
        UpdateCustomer,
        deleteCustomer,
        GetContent,
        addContent,
        GetSpecificContent,
        UpdateContent,
        DeleteContent,
        GetGalleryCat,
        createGalleryCat,
        GetSpecificGalleryCatbyId,
        UpdateGalleryCat,
        DeleteGalleryCat,
        GetGalleryDetails,
        createGalleryDetails,
        GetSpecificGalleryDetails,
        updateGalleryDetails,
        DeleteGalleryDetails,
        GetStocks,
        AddStocks,
        UpdateStocks,
        GetSpecificStocks,
        DeleteStocks,
        CreateCoupon,
        GetCoupons,
        UpdateCoupon,
        GetSpecificCouponbyId,
        DeleteCoupon,
        GetAllOrders,
        GetPriceUpdates,
        GetSpecificPricebyId,
        UpdatePrice,
        DeleteOrder,
        getSpecificOrderbyId,
        UpdateOrder,
        GetColors,
        addColor,
        GetSpecificColorbyId,
        deleteColor,
        Getsize,
        AddSize,
        getSpecificSizebyId,
        DeleteSize,
        GetHighValueCustomersData,
        GetMedValueCustomersData,
        TopSellingProducts,
        GetorderHistorybyId,
        getStockbyCategoryId,
        getStockbyweightTypeId,
        GetblogCategories,
        AddBlogCategory,
        getSpecificBlogCategorybyId,
        UpdateBlogCateogry,
        DeleteBlogCategory,
        GetSubscribes,
        GetContacts,
        GetContactbyId,
        DeleteSubscribe,
        Deletecontact
      }}
    >
      {props.children}
    </SignContext.Provider>
  );
};
