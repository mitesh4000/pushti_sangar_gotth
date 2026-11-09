import {
  GET_CATEGORY,
  GET_GST,
  GET_SUB_CATEGORY,
  GET_SUB_SUB_CATEGORY,
  GET_PRODUCTS,
  GET_COLOR,
  GET_SEASON,
  GET_MATERIAL,
  GET_DAILY_PRICE,
} from "./actionTypes";

const INIT_STATE = {
  products: [],
  category: [],
  subCategory: [],
  subSubCategory: [],
  gst: [],
  colors:[],
  seasons:[],
  materials:[],
  DailyPrices:[]
};

const Product = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload.data,
      };

    case GET_SUB_CATEGORY:
      return {
        ...state,
        subCategory: action.payload.data,
      };

    case GET_SUB_SUB_CATEGORY:
      return {
        ...state,
        subSubCategory: action.payload.data,
      };

    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.data,
      };

    case GET_GST:
      return {
        ...state,
        gst: action.payload.data,
      };
      case GET_COLOR:
      return {
        ...state,
        colors: action.payload.data,
      };
      case GET_SEASON:
      return {
        ...state,
        seasons: action.payload.data,
      };
      case GET_MATERIAL:
      return {
        ...state,
        materials: action.payload.data,
      };
      case GET_DAILY_PRICE:
      return {
        ...state,
        DailyPrices: action.payload.data,
      };
    default:
      return state;
  }
};

export default Product;
