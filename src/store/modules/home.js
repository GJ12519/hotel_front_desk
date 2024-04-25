import { getHomeDiscountData, getHomeGoodPriceData, getHomeHighScoreData, getHomeHotRecommendData, getHomeLongforData, getHomePlusData } from '@/services'
import { getroommsg, roomregus } from '@/services/modules/room'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchHomeDataAction = createAsyncThunk("fetchdata", (payload, { dispatch }) => {
    // getHomeGoodPriceData().then(res => {
    //     dispatch(changeGoodPriceInfoAction(res))
    // })
    // getHomeHighScoreData().then(res => {
    //     dispatch(changeHighScoreInfoAction(res))
    // })
    // getHomeDiscountData().then(res => {
    //     dispatch(changeDiscountInfoAction(res))
    // })
    // getHomeHotRecommendData().then(res => {
    //     dispatch(changeRecommendInfoAction(res))
    // })
    // getHomeLongforData().then(res => {
    //     dispatch(changeLongforInfoAction(res))
    // })
    // getHomePlusData().then(res => {
    //     console.log(res);
    //     dispatch(changePlusInfoAction(res))
    // })
    getroommsg().then(res => {
        console.log(res.results);
        dispatch(changeRoomInfoAction(res.results))
    })
})

const homeSlice = createSlice({
    name: "home",
    initialState: {
        goodPriceInfo: {},
        highScoreInfo: {},
        discountInfo: {},
        recommendInfo: {},
        longforInfo: {},
        plusInfo: {},
        roominfo: {},
        userinfo: {}
    },
    reducers: {
        changeGoodPriceInfoAction(state, { payload }) {
            state.goodPriceInfo = payload
        },
        changeHighScoreInfoAction(state, { payload }) {
            state.highScoreInfo = payload
        },
        changeDiscountInfoAction(state, { payload }) {
            state.discountInfo = payload
        },
        changeRecommendInfoAction(state, { payload }) {
            state.recommendInfo = payload
        },
        changeLongforInfoAction(state, { payload }) {
            state.longforInfo = payload
        },
        changePlusInfoAction(state, { payload }) {
            console.log('111', payload);
            state.plusInfo = payload
        },
        changeRoomInfoAction(state, { payload }) {
            console.log('payload', payload);
            state.roominfo = payload
        },
        changeUserinfoAction(state, { payload }) {
            state.userinfo = payload
        }
    },
    extraReducers: {
        // [fetchHomeDataAction.fulfilled](state, { payload }) {
        //   state.goodPriceInfo = payload
        // }
    }
})

export const {
    changeGoodPriceInfoAction,
    changeHighScoreInfoAction,
    changeDiscountInfoAction,
    changeRecommendInfoAction,
    changeLongforInfoAction,
    changePlusInfoAction,
    changeRoomInfoAction,
    changeUserinfoAction
} = homeSlice.actions

export default homeSlice.reducer
