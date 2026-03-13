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
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
