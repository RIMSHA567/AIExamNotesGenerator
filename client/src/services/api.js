import axios from "axios";
import { serverUrl } from "../App.jsx";
import { setUserData } from "../redux/userSlice.js";

// Backend se current user data get

// 14*
export const getCurrentUser = async (dispatch) => {
  try {
    //yahan result my user diya gya hy current user cookie sy nikal kay
    // 15* go to backend in index.js

    //22*
    const result = await axios.get(`${serverUrl}/api/user/currentuser`, {
      withCredentials: true,
    });

    // ya store my rakha diya, hy jab dispatch chly ga componnnet dobara app.jsx pora repaint ho ga ,and user data ki base my sab kuch new dikhay ga ui py .
    // 23*
    dispatch(setUserData(result.data)); // Redux me save
  } catch (error) {
    // console.log(error);
    console.log(error.response?.data || error.message);
  }
};
