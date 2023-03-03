import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = process.env.REACT_APP_API_URL_ROOT;

interface UserArgs {
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, password }: UserArgs, { rejectWithValue }) => {
    console.log(backendURL);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        `${backendURL}/api/auth/register`,
        { email, password },
        config
      );
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: UserArgs, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${backendURL}/api/auth/login`,
        { email, password },
        config
      );

      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// export const getUserProfile = createAsyncThunk(
//   "auth/getProfile",
//   async (arg, { rejectWithValue, getState }) => {
//     try {
//       const {
//         auth: { userToken },
//       } = getState() as any;
//       const config = {
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//         },
//       };
//       const { data } = await axios.get(
//         `${backendURL}/api/auth/profile`,
//         config
//       );
//       return data;
//     } catch (error: any) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );
//
// export const logoutUser = createAsyncThunk(
//   "auth/logout",
//   async (arg, { rejectWithValue, getState }) => {
//     try {
//       const {
//         auth: { userToken },
//       } = getState() as any;
//       const config = {
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//         },
//       };
//       await axios.get(`${backendURL}/api/auth/logout`, config);
//     } catch (error: any) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );
