import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./modules/home"
import entireReducer from "./modules/entire"
import detailReducer from "./modules/detail"

// 这里使用的toolikit本质其实也是对redux的封装，所以这里无论是使用的普通方法创建的reducer还是toolkit创建的都可以直接使用
const store = configureStore({
    reducer: {
        // toolkit创建的reducer
        home: homeReducer,
        detail: detailReducer,
        // 普通方式创建的reducer
        entire: entireReducer
    }
})

export default store