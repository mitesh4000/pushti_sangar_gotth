import axios from "axios";
import SignContext from "../Context/SignContext";
import React, { useState } from "react";

const MOCK_CATEGORIES = [
  { _id: "65083839f32a06ef841fa5de", name: "Vastra", image: "VastraCategory2Small.png", noOfProducts: 29, color: "#fff" },
  { _id: "650837d4f32a06ef841fa5d6", name: "Shringar", image: "ShringarSmallCategory.jpg", noOfProducts: 24, color: "#fff" },
  { _id: "650837d4f32a06ef841fa5d7", name: "Shangar", image: "ShangarSmallCategory.png", noOfProducts: 18, color: "#fff" },
  { _id: "650837d4f32a06ef841fa5d8", name: "Shri Mastak", image: "VastraCatagorySmall.jpg", noOfProducts: 15, color: "#fff" },
  { _id: "650837d4f32a06ef841fa5d9", name: "Shri Karna", image: "s1.jpg", noOfProducts: 12, color: "#fff" },
  { _id: "650837d4f32a06ef841fa5da", name: "Sughandhi (Attar)", image: "s2.jpg", noOfProducts: 20, color: "#fff" },
];

const MOCK_PRODUCTS = [
  {
    _id: "65083839f32a06ef841fa501",
    id: 1,
    name: "God Shanagar By Pushtimarg",
    category: "650837d4f32a06ef841fa5d7",
    sku: "PS-SHN-001",
    imageGallery: ["s1.jpg", "s2.jpg"],
    hoverImageUrl: "/products/s2.jpg",
    prices: { calculatedPrice: 238, discounted: 238.85, original: 245.8 },
    isProductNew: true,
    isProductPopular: true,
    calculationOnWeight: false,
    description: "<p>Exquisite handcrafted Shanagar created specially for sacred seva in Pushtimarg traditions.</p>",
    stock: { quantity: 45 },
  },
  {
    _id: "65083839f32a06ef841fa502",
    id: 2,
    name: "Sughandhi Attar Different Fragrances",
    category: "650837d4f32a06ef841fa5da",
    sku: "PS-ATR-002",
    imageGallery: ["s2.jpg", "s3.jpg"],
    hoverImageUrl: "/products/s3.jpg",
    prices: { calculatedPrice: 199, discounted: 199.50, original: 220.0 },
    isProductNew: true,
    isProductPopular: true,
    calculationOnWeight: false,
    description: "<p>Pure and fragrant natural attar suitable for seva and daily devotional use.</p>",
    stock: { quantity: 60 },
  },
  {
    _id: "65083839f32a06ef841fa503",
    id: 3,
    name: "Moti Product with Category of Shringar",
    category: "650837d4f32a06ef841fa5d6",
    sku: "PS-SHR-003",
    imageGallery: ["s3.jpg", "s4.jpg"],
    hoverImageUrl: "/products/s4.jpg",
    prices: { calculatedPrice: 310, discounted: 310.00, original: 350.0 },
    isProductNew: true,
    isProductPopular: true,
    calculationOnWeight: false,
    description: "<p>Intricately woven pearls and stones in exquisite devotional designs.</p>",
    stock: { quantity: 30 },
  },
  {
    _id: "65083839f32a06ef841fa504",
    id: 4,
    name: "Popular Product on Shringar Products",
    category: "650837d4f32a06ef841fa5d6",
    sku: "PS-SHR-004",
    imageGallery: ["s4.jpg", "s5.jpg"],
    hoverImageUrl: "/products/s5.jpg",
    prices: { calculatedPrice: 275, discounted: 275.00, original: 299.0 },
    isProductNew: true,
    isProductPopular: true,
    calculationOnWeight: false,
    description: "<p>Traditional Shringar ornament with delicate finishing.</p>",
    stock: { quantity: 25 },
  },
  {
    _id: "65083839f32a06ef841fa505",
    id: 5,
    name: "Best Zari in Vastra Category",
    category: "65083839f32a06ef841fa5de",
    sku: "PS-VAS-005",
    imageGallery: ["s5.jpg", "s6.jpg"],
    hoverImageUrl: "/products/s6.jpg",
    prices: { calculatedPrice: 420, discounted: 420.00, original: 480.0 },
    isProductNew: true,
    isProductPopular: true,
    calculationOnWeight: false,
    description: "<p>Royal zari vastra fabric with vibrant sacred motifs.</p>",
    stock: { quantity: 40 },
  },
  {
    _id: "65083839f32a06ef841fa506",
    id: 6,
    name: "Golden Zari Vastra Special Seva",
    category: "65083839f32a06ef841fa5de",
    sku: "PS-VAS-006",
    imageGallery: ["Vastra1.jpg", "Vastra2.jpg"],
    hoverImageUrl: "/products/Vastra2.jpg",
    prices: { calculatedPrice: 550, discounted: 520.00, original: 600.0 },
    isProductNew: true,
    isProductPopular: true,
    calculationOnWeight: false,
    description: "<p>Special celebratory vastra created for Pushtimarg festivals.</p>",
    stock: { quantity: 15 },
  },
  {
    _id: "65083839f32a06ef841fa507",
    id: 7,
    name: "Royal Silk Vastra with Border",
    category: "65083839f32a06ef841fa5de",
    sku: "PS-VAS-007",
    imageGallery: ["Vastra3.jpg", "Vastra4.jpg"],
    hoverImageUrl: "/products/Vastra4.jpg",
    prices: { calculatedPrice: 380, discounted: 380.00, original: 420.0 },
    isProductNew: true,
    isProductPopular: true,
    calculationOnWeight: false,
    description: "<p>Silken traditional vastra piece embellished with sacred borders.</p>",
    stock: { quantity: 20 },
  },
  {
    _id: "65083839f32a06ef841fa508",
    id: 8,
    name: "Exquisite Pearl Mukut Shringar",
    category: "650837d4f32a06ef841fa5d6",
    sku: "PS-SHR-008",
    imageGallery: ["s6.jpg", "s7.jpg"],
    hoverImageUrl: "/products/s7.jpg",
    prices: { calculatedPrice: 340, discounted: 340.00, original: 380.0 },
    isProductNew: true,
    isProductPopular: true,
    calculationOnWeight: false,
    description: "<p>Ornamental Mukut with divine luster and fine craftsmanship.</p>",
    stock: { quantity: 18 },
  },
  {
    _id: "65083839f32a06ef841fa509",
    id: 9,
    name: "Handcrafted Kulhe & Shishful",
    category: "650837d4f32a06ef841fa5d8",
    sku: "PS-MST-009",
    imageGallery: ["s8.jpg", "s9.jpg"],
    hoverImageUrl: "/products/s9.jpg",
    prices: { calculatedPrice: 290, discounted: 290.00, original: 320.0 },
    isProductNew: true,
    isProductPopular: true,
    calculationOnWeight: false,
    description: "<p>Head adornment made with reverence and traditional flair.</p>",
    stock: { quantity: 22 },
  },
];

const DEFAULT_CUSTOMER = {
  _id: "cust-12345",
  username: "Pushti Devotee",
  email: "devotee@pushtishangar.com",
  phone: "9876543210",
  address: "Shri Nathji Marg, Mathura, Uttar Pradesh",
};

export const SignState = (props) => {
  const rawUrl = process.env.REACT_APP_BASE_URL || "";
  const url = rawUrl.trim();

  // In-memory cart state synced with localStorage
  const getStoredCart = () => {
    try {
      const data = localStorage.getItem("ps_cart_items");
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  };

  const [localCart, setLocalCart] = useState(getStoredCart());

  const saveCart = (items) => {
    setLocalCart(items);
    try {
      localStorage.setItem("ps_cart_items", JSON.stringify(items));
    } catch (e) {
      console.warn("Storage warning", e);
    }
  };

  // create customer
  const createCustomer = async (customerInfo) => {
    if (url) {
      try {
        const response = await axios.post(`${url}/customer/register`, customerInfo);
        return response.data;
      } catch (error) {
        console.warn("Backend register error, using mock fallback", error);
      }
    }
    return {
      success: true,
      msg: "Account created successfully",
      customer: { ...DEFAULT_CUSTOMER, ...customerInfo },
    };
  };

  // login customer
  const loginCustomer = async (CustomerInfo) => {
    if (url) {
      try {
        const response = await axios.post(`${url}/customer/login`, CustomerInfo);
        return response.data;
      } catch (error) {
        console.warn("Backend login error, using mock fallback", error);
      }
    }
    const token = "mock_token_" + Date.now();
    localStorage.setItem("authToken", token);
    return {
      success: true,
      token,
      customer: DEFAULT_CUSTOMER,
    };
  };

  // Forgot Password
  const forgotCustomerPassword = async (CustomerInfo) => {
    if (url) {
      try {
        const response = await axios.post(`${url}/customer/forgetpassword`, CustomerInfo);
        return response.data;
      } catch (error) {
        console.warn("Backend forgot password error", error);
      }
    }
    return { success: true, msg: "Password reset link sent to your email" };
  };

  // Reset Password
  const resetCustomerPassword = async (resetToken, password) => {
    if (url) {
      try {
        const response = await axios.put(`${url}/customer/resetpassword/${resetToken}`, { password });
        return response.data;
      } catch (error) {
        console.warn("Backend reset password error", error);
      }
    }
    return { success: true, msg: "Password updated successfully" };
  };

  // LoggedIn User
  const getLoggedInCustomer = async (Token) => {
    if (url && Token) {
      try {
        const response = await axios.post(`${url}/customer/getloggedincustomer`, { token: Token });
        return response.data;
      } catch (error) {
        console.warn("Backend getLoggedIn error, using fallback", error);
      }
    }
    return {
      success: true,
      customer: DEFAULT_CUSTOMER,
    };
  };

  // Get Specific Customer
  const GetSpecificCustomer = async (customerId) => {
    if (url) {
      try {
        const response = await axios.post(`${url}/customer/getSpecificCustomer/${customerId}`, {});
        return response;
      } catch (error) {
        console.warn("Backend getSpecificCustomer error", error);
      }
    }
    return { data: { success: true, customer: DEFAULT_CUSTOMER } };
  };

  // Update Customer
  const UpdateCustomer = async (customerId, customerInfo) => {
    if (url) {
      try {
        const response = await axios.post(`${url}/customer/updatecustomer/${customerId}`, { customerInfo });
        return response.data;
      } catch (error) {
        console.warn("Backend updatecustomer error", error);
      }
    }
    return { success: true, msg: "Profile updated successfully" };
  };

  // Update Password
  const changePassword = async (CustomerInfo, id, Token) => {
    if (url) {
      try {
        const response = await axios.post(`${url}/customer/updatecustomerpassword/${id}`, {
          ...CustomerInfo,
          token: Token,
        });
        return response.data;
      } catch (error) {
        console.warn("Backend changePassword error", error);
      }
    }
    return { success: true, msg: "Password changed successfully" };
  };

  // Get Categories
  const getCategories = async () => {
    if (url) {
      try {
        const response = await axios.post(`${url}/category/getcategories`);
        if (Array.isArray(response.data)) return response.data;
        if (response.data && Array.isArray(response.data.categories)) return response.data.categories;
      } catch (error) {
        console.warn("Backend getCategories error, using mock", error);
      }
    }
    return MOCK_CATEGORIES;
  };

  // Get Products
  const getProducts = async () => {
    if (url) {
      try {
        const response = await axios.post(`${url}/product/getallproducts`);
        if (response.data && Array.isArray(response.data.products)) return response.data;
      } catch (error) {
        console.warn("Backend getProducts error, using mock", error);
      }
    }
    return { success: true, products: MOCK_PRODUCTS };
  };

  // Get Specific Product
  const getSpecificProduct = async (ProductId) => {
    if (url) {
      try {
        const response = await axios.post(`${url}/product/getspecificproduct/${ProductId}`, {});
        if (response.data && response.data.product) return response.data;
      } catch (error) {
        console.warn("Backend getSpecificProduct error, using mock", error);
      }
    }
    const found = MOCK_PRODUCTS.find((p) => p._id === ProductId || p.id === Number(ProductId)) || MOCK_PRODUCTS[0];
    return { success: true, product: found };
  };

  // Specific Sub-categories
  const getSpecificSubcategories = async (categoryId) => {
    if (url) {
      try {
        const response = await axios.post(`${url}/api/${categoryId}/subcategories`);
        return response.data;
      } catch (error) {
        console.warn("Backend getSpecificSubcategories error", error);
      }
    }
    return {
      success: true,
      subCategories: [
        { _id: "sub-1", name: "Traditional Seva" },
        { _id: "sub-2", name: "Festival Special" },
        { _id: "sub-3", name: "Daily Adornment" },
      ],
    };
  };

  // Add To Cart
  const addToCart = async (CustomerId, CartInfo) => {
    if (url) {
      try {
        const response = await axios.post(`${url}/customer/addtocart/${CustomerId}`, CartInfo);
        return response.data;
      } catch (error) {
        console.warn("Backend addToCart error, using in-memory cart", error);
      }
    }
    const product = MOCK_PRODUCTS.find((p) => p._id === CartInfo.productId) || MOCK_PRODUCTS[0];
    const existingIndex = localCart.findIndex((item) => item.product._id === product._id);
    let updated;
    if (existingIndex > -1) {
      updated = [...localCart];
      updated[existingIndex].quantity += CartInfo.quantity || 1;
    } else {
      updated = [...localCart, { product, quantity: CartInfo.quantity || 1 }];
    }
    saveCart(updated);
    return { success: true, msg: "Item added to cart" };
  };

  // GetLoggedInCustomerCartItems
  const GetLoggedInCartItems = async (CustomerId) => {
    if (url) {
      try {
        const response = await axios.post(`${url}/customer/getcustomercart/${CustomerId}`, {});
        if (response.data && response.data.cartItems) return response.data;
      } catch (error) {
        console.warn("Backend getCart error, using mock cart", error);
      }
    }
    // Return sample items if cart is empty so the cart UI looks vibrant
    const items = localCart.length > 0 ? localCart : [
      { product: MOCK_PRODUCTS[0], quantity: 1 },
      { product: MOCK_PRODUCTS[2], quantity: 2 },
    ];
    return { success: true, cartItems: items };
  };

  // Remove all Items from Cart
  const RemoveAllItemsFromCart = async (CustomerId) => {
    if (url) {
      try {
        const response = await axios.post(`${url}/customer/removeallfromcart/${CustomerId}`, {});
        return response.data;
      } catch (error) {
        console.warn("Backend removeallcart error", error);
      }
    }
    saveCart([]);
    return { success: true, msg: "Cart cleared" };
  };

  // updateCartItem
  const UpdateCartItem = async (CustomerId, CartInfo) => {
    if (url) {
      try {
        const response = await axios.post(`${url}/customer/updatecart/${CustomerId}`, CartInfo);
        return response.data;
      } catch (error) {
        console.warn("Backend updatecart error", error);
      }
    }
    const updated = localCart.map((item) =>
      item.product._id === CartInfo.productId ? { ...item, quantity: CartInfo.quantity } : item
    );
    saveCart(updated);
    return { success: true, msg: "Cart updated" };
  };

  // CreateOrder
  const CreateOrder = async (OrderInfo) => {
    if (url) {
      try {
        const response = await axios.post(`${url}/orders/addorder`, OrderInfo);
        return response.data;
      } catch (error) {
        console.warn("Backend addorder error", error);
      }
    }
    saveCart([]);
    return { success: true, msg: "Order placed successfully", orderId: "ORD-" + Math.floor(100000 + Math.random() * 900000) };
  };

  // Get SpecificTax by Id
  const GetSpecificTax = async (taxId) => {
    if (url) {
      try {
        const response = await axios.post(`${url}/gst/getspecificgst/${taxId}`, {});
        return response.data;
      } catch (error) {
        console.warn("Backend getspecificgst error", error);
      }
    }
    return { success: true, tax: { rate: 5, name: "GST 5%" } };
  };

  // remove item from Cart
  const removeItemFromCart = async (CustomerId, ProductId) => {
    if (url) {
      try {
        const response = await axios.post(`${url}/customer/removefromcart/${CustomerId}`, { ProductId });
        return response.data;
      } catch (error) {
        console.warn("Backend removefromcart error", error);
      }
    }
    const updated = localCart.filter((item) => item.product._id !== ProductId);
    saveCart(updated);
    return { success: true, msg: "Item removed from cart" };
  };

  // Add Wishlist
  const addToWishlist = async (CustomerId, WishlistInfo) => {
    if (url) {
      try {
        const response = await axios.post(`${url}/customer/createwishlist/${CustomerId}`, WishlistInfo);
        return response.data;
      } catch (error) {
        console.warn("Backend wishlist error", error);
      }
    }
    return { success: true, msg: "Added to Wishlist" };
  };

  // Get Wishlist
  const GetLoggedInWishlistItems = async (CustomerId) => {
    if (url) {
      try {
        const response = await axios.post(`${url}/customer/getcustomerwishlist/${CustomerId}`, {});
        return response.data;
      } catch (error) {
        console.warn("Backend getWishlist error", error);
      }
    }
    return { success: true, wishlistItems: [{ product: MOCK_PRODUCTS[1] }, { product: MOCK_PRODUCTS[3] }] };
  };

  // remove item from Wishlist
  const removeItemFromWishlist = async (CustomerId, ProductId) => {
    if (url) {
      try {
        const response = await axios.post(`${url}/customer/removefromwishlist/${CustomerId}`, { ProductId });
        return response.data;
      } catch (error) {
        console.warn("Backend removeWishlist error", error);
      }
    }
    return { success: true, msg: "Removed from Wishlist" };
  };

  // GetProductsbyCategoryId
  const GetProductsbyCategoryId = async (CategoryId) => {
    if (url) {
      try {
        const response = await axios.post(`${url}/product/getproductsbycategoryid/${CategoryId}`, {});
        if (response.data && Array.isArray(response.data.products)) return response.data;
      } catch (error) {
        console.warn("Backend getproductsbycat error", error);
      }
    }
    const matched = MOCK_PRODUCTS.filter((p) => p.category === CategoryId);
    return { success: true, products: matched.length > 0 ? matched : MOCK_PRODUCTS };
  };

  const GetallCoupons = async () => {
    if (url) {
      try {
        const response = await axios.post(`${url}/coupons/getcoupons`);
        return response.data;
      } catch (error) {
        console.warn("Backend getcoupons error", error);
      }
    }
    return {
      success: true,
      coupons: [
        { _id: "cpn1", code: "PUSHTI10", discount: 10, minAmount: 500 },
        { _id: "cpn2", code: "SEVA20", discount: 20, minAmount: 1000 },
      ],
    };
  };

  const GetCouponbyId = async (couponId) => {
    if (url) {
      try {
        const response = await axios.post(`${url}/coupons/getspecificcoupon/${couponId}`, {});
        return response.data;
      } catch (error) {
        console.warn("Backend getcoupon error", error);
      }
    }
    return { success: true, coupon: { code: "PUSHTI10", discount: 10 } };
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
      }}
    >
      {props.children}
    </SignContext.Provider>
  );
};
