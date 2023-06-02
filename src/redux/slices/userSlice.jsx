import { createAsyncThunk  , createSlice , createAction} from "@reduxjs/toolkit";
import axios from "axios";




// register action

export const registerUserAction = createAsyncThunk(
    'users/register',                        //this action type
     async ( user, {rejectWithValue, getState, dispatch})=>{ //in this line user is payload

        try {
            //http call
           const config = {
            headers:{
                'Content-Type': 'application/json'
            },
           }
           const res = await axios.post(`http://localhost:5002/user-data` , user, config)  // user is payload(fname,lname,email,password)
           return res.data  
        } 
       
        catch (error) {
          if(!error?.response){
            throw error
          } 
          return rejectWithValue(error?.response?.data) 
        }

})

const usersSlices = createSlice({
    name: 'users',
    initialState:{ },
    extraReducers: (builder)=> {
        //register 
        builder.addCase(registerUserAction.pending, (state,action)=>{
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(registerUserAction.fulfilled, (state,action)=>{
             state.loading = false;
             state.registerd = action?.payload
             state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(registerUserAction.rejected, (state,action)=>{
            //console.log(action.payload)
            
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        })
    }
})

export default usersSlices.reducer