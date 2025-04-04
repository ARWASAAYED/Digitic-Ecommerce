import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import authService from "./authService";



const userDefaultState = {
    id: null,
    firstname: null,
    lastname: null,
    email: null,
    mobile: null,
    token: null,
  };
  
  const initialState = {
    user: userDefaultState,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  };
  

  export const login = createAsyncThunk(
    "auth/admin-login",
    async (user, thunkAPI) => {
      try {
        return await authService.login(user);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  
  // Create the auth slice
  export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      /*logout: (state) => {
        state.user = userDefaultState;
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = "";
      },*/
    },
    extraReducers: (builder) => {
     builder
        .addCase(login.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
            state.user = null;
        });
    },
  });
  
  export default authSlice.reducer;