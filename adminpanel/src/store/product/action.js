import { GET_CATEGORY, GET_DAILY_PRICE, GET_GST, GET_PRODUCTS, GET_SUB_CATEGORY, GET_SUB_SUB_CATEGORY } from "./actionTypes";



export const getCategorySuccess = (actionType,data) => ({
    type:GET_CATEGORY,
    payload:{actionType,data}
})


export const getSubCategorySuccess = (actionType,data) => ({
    type:GET_SUB_CATEGORY,
    payload:{actionType,data}
})

export const getSubSubCategorySuccess = (actionType,data) => ({
    type:GET_SUB_SUB_CATEGORY,
    payload:{actionType,data}
})

export const getGstSuccess = (actionType,data) => ({
    type:GET_GST,
    payload:{actionType,data}
})

export const getProductSuccess = (actionType,data) => ({
    type:GET_PRODUCTS,
    payload:{actionType,data}
})

export const getDailyPriceSuccess = (actionType,data) => ({
    type:GET_DAILY_PRICE,
    payload:{actionType,data}
})

