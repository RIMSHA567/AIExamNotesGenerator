// client/src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom"; // React Router import
import { Provider } from "react-redux"; // Redux Provider import
import store from "./redux/store.js"; // Tumhara Redux store import

// Root create karna
const root = createRoot(document.getElementById("root"));

// Render app
root.render(
  <StrictMode>
    {/* Provider se Redux store provide kar rahe hain */}
    <Provider store={store}>
      {/* BrowserRouter se routing enable ho rahi hai */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
