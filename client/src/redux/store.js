import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
// 10*
export default configureStore({
  reducer: { user: userSlice },
});
