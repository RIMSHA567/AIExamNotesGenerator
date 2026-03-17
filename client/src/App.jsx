import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { getCurrentUser } from "./services/api.js";
import Home from "./pages/Home.jsx";
import Auth from "./pages/Auth.jsx";
import NotesForm from "./pages/NotesForm.jsx";
import NotesResult from "./pages/NotesResult.jsx";

export const serverUrl = "http://localhost:8000";

function App() {
  const dispatch = useDispatch();

  // yahan py hm store sy value read kar rahy haen use selctor sy
  //yahan hm user ka pora data milay ga (jo kay login howa tab hi milay ga )
  let userData = useSelector((state) => state.user.userData);

  //   Agar tum useEffect me getCurrentUser() call na karo:

  // User login karega → Redux me userData save ho jayega

  // Lekin jab page reload hoga → Redux state reset ho jati hai (empty ho jati hai)

  // App ko lagega user login nahi hai

  // Is liye Auth page / logout state show ho jayegi

  // Is liye getCurrentUser() use karte hain:

  // Page reload → backend ko request → cookie se token verify → user data wapas → Redux me dobara save → user logged in hi rehta hai.
  // 12*
  useEffect(() => {
    // 13* go to api.js in services
    //  25*  go to api.js in services(..........so on ike that )otal steps(1-25atrat from auh.jsx and end here)
    getCurrentUser(dispatch); // Page load par current user check
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path="/"
        // agr login hy to hom epage dikhao warna auth
        element={userData ? <Home /> : <Navigate to="/auth" replace />}
      />
      <Route
        path="/auth"
        element={userData ? <Navigate to="/" replace /> : <Auth />}
      />
      <Route
        path="/notes"
        element={userData ? <NotesForm /> : <Navigate to="/auth" replace />}
      />
      <Route
        path="/notes-result"
        element={userData ? <NotesResult /> : <Navigate to="/auth" replace />}
      />
    </Routes>
  );
}

export default App;
