import { ProfileResponse } from "@/app/api/auth";
import { createSlice } from "@reduxjs/toolkit";

export interface ProfileState {
    profile: ProfileResponse | null;
}

const initialState: ProfileState = {
    profile: null,

};


const userSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserData(state, action) {
     state.profile = action.payload;
    },
  }
});

export const {setUserData} = userSlice.actions;
export default userSlice.reducer;