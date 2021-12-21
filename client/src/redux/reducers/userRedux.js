import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
  name: "user",
  initialState: {currentUser: ''},
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload
    },
    logout: (state) => {
      state.currentUser = {}
    }
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;