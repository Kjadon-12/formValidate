import {configureStore } from '@reduxjs/toolkit'
import usersReducer from "./slices/userSlice";
import cityReducers from './slices/citySlice'


const store = configureStore({
    reducer:{
        users: usersReducer,
        city: cityReducers
    }
})


export default store;