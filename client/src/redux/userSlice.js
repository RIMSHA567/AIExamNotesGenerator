import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { userData: null },
  reducers: {
    // 11* go to app.jsx(repaint )
    // 24* go to app.jsx(repaint )
    setUserData: (state, action) => {
      state.userData = action.payload; // Redux me user data save,payload my wo value hoti hy jo beji gati hy store my pichay sy
    },
    updateCredits: (state, action) => {
      if (state.userData) {
        state.userData.credits = action.payload;
      }
      // Redux me user data save,payload my wo value hoti hy jo beji gati hy store my pichay sy
    },
  },
});

export const { setUserData, updateCredits } = userSlice.actions;
export default userSlice.reducer;
