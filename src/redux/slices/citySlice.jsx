import { createAsyncThunk  , createSlice , createAction} from "@reduxjs/toolkit";
import axios from "axios";




// register action

export const countryAction = createAsyncThunk(
    'country/list',                        //this action type
     async ( user, {rejectWithValue, getState, dispatch})=>{ //in this line user is payload

        try {
            //http call
        //    const config = {
        //     headers:{
        //         'Content-Type': 'application/json'
        //     },
        //    }
           const res = await axios.get(`http://localhost:5002/get-countryList`)  // user is payload(fname,lname,email,password)
           return res.data  
        } 
       
        catch (error) {
          if(!error?.response){
            throw error
          } 
          return rejectWithValue(error?.response?.data) 
        }

})


//get state

export const stateAction = createAsyncThunk(
    'state/list',                        //this action type
     async ( countryCode, {rejectWithValue, getState, dispatch})=>{ //in this line user is payload

        try {
            //http call
            const config = {
                     headers:{
                         'Content-Type': 'application/json'
                     },
                    }
           //console.log(countryCode)
           const res = await axios.get(`http://localhost:5002/get-stateList?countryCode=${countryCode}` , config)  // user is payload(fname,lname,email,password)
           
           return res.data

           
           //dispatch(updateStateList(data));
        } 
       
        catch (error) {
          if(!error?.response){
            throw error
          } 
          return rejectWithValue(error?.response?.data) 
        }

})



export const cityAction = createAsyncThunk(
    'city/list',                        //this action type
     async ( {countryCode, stateCode } , {rejectWithValue, getState, dispatch})=>{ //in this line user is payload
         console.log(countryCode, stateCode)
        try {
            //http call
            const config = {
                     headers:{
                         'Content-Type': 'application/json'
                     },
                    }
           //console.log(countryCode)
           const res = await axios.get(`http://localhost:5002/get-cityList?countryCode=${countryCode}&stateCode=${stateCode}` , config)  // user is payload(fname,lname,email,password)
           
           return res.data
        } 
       
        catch (error) {
          if(!error?.response){
            throw error
          } 
          return rejectWithValue(error?.response?.data) 
        }

})





const citySlice = createSlice({
    name: 'city',
    initialState:{ },
    extraReducers: (builder)=> {
        //register 
        builder.addCase(countryAction.pending, (state,action)=>{
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(countryAction.fulfilled, (state,action)=>{
             state.loading = false;
             state.countryList = action?.payload
             state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(countryAction.rejected, (state,action)=>{
            //console.log(action.payload)
            
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        })


        //register 
        builder.addCase(stateAction.pending, (state,action)=>{
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(stateAction.fulfilled, (state,action)=>{
             state.loading = false;
             state.stateList = action?.payload
             state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(stateAction.rejected, (state,action)=>{
            //console.log(action.payload)
            
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        })


        //register 
        builder.addCase(cityAction.pending, (state,action)=>{
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(cityAction.fulfilled, (state,action)=>{
             state.loading = false;
             state.cityList = action?.payload
             state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(cityAction.rejected, (state,action)=>{
            //console.log(action.payload)
            
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        })
    }
})

export default citySlice.reducer