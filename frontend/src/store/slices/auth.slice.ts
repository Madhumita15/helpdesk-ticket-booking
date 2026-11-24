// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { getErrorMessage } from "../../services/helper/global.helper";
// import { axiosInstance } from "../../lib/axiosInstance";
// import { ENDPOINT } from "../../services/helper/endPoint";
// import type { LoginDataType, UserInitialState } from "../../typescript/types/user.type";


// const initialState: UserInitialState = {
//   loading: {
//     login: false,
//     create: false,
//     logout: false,
//   },
//   error: {
//     login: null,
//     logout: null,
//     create: null
//   }
// };

// export const login = createAsyncThunk(
//   "user/login",
//   async (
//     data:  LoginDataType,
//     { rejectWithValue },
//   ) => {
//     try {
//       const response = await axiosInstance.post(ENDPOINT.login, data);
//       console.log("response from login", response.data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   },
// );





// export const logout = createAsyncThunk(
//   "user/logout",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post(ENDPOINT.logout);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   },
// );







// const userSlice = createSlice({
//   name: "user/slice",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.loading.login = true;
//         state.error.login = null;
//       })
//       .addCase(login.fulfilled, (state) => {
//         state.loading.login = false;
//         state.error.login = null;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading.login = false;
//         state.error.login =
//           (action.payload as string) || "something went wrong";
//       })
//       .addCase(createUser.pending, (state) => {
//         state.loading.create = true;
//         state.error.create = null;
//       })
//       .addCase(createUser.fulfilled, (state) => {
//         state.loading.create = false;
//         state.error.create = null;
//       })
//       .addCase(createUser.rejected, (state, action) => {
//         state.loading.create = false;
//         state.error.create =
//           (action.payload as string) || "something went wrong";
//       })
//        .addCase(logout.pending, (state) => {
//         state.loading.create = true;
//         state.error.create = null;
//       })
//       .addCase(logout.fulfilled, (state) => {
//         state.loading.create = false;
//         state.error.create = null;
//       })
//       .addCase(logout.rejected, (state, action) => {
//         state.loading.create = false;
//         state.error.create =
//           (action.payload as string) || "something went wrong";
//       })
//     }
// });

// export default userSlice.reducer;
