import { createSlice } from "@reduxjs/toolkit";
import { GetProfileResponse } from "../../services/profile/profileServices";
import { RootState } from "../../stores/store";

interface ProfileState {
  credentialProfile?: GetProfileResponse;
}

const initialState: ProfileState = {};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setCredentialProfile: (state, { payload }) => {
      if (!payload) {
        state.credentialProfile = {} as ProfileState["credentialProfile"];
        return;
      }

      state.credentialProfile = {
        ...state.credentialProfile,
        ...payload,
      };
    },
  },
});

export const { setCredentialProfile } = profileSlice.actions;

export default profileSlice.reducer;
export const selectCredentalProfile = (state: RootState) =>
  state.profile.credentialProfile;
