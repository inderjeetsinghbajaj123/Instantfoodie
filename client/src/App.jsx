import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import RestaurantProfile from "./pages/RestaurantProfile/RestaurantProfile";
import Login from "./pages/Login/Login";
import RestaurantLogin from "./pages/RestaurantLogin/RestaurantLogin";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Order from "./pages/Order/Order";
import Tracking from "./pages/Tracking/Tracking";
import Favorites from "./pages/Favorites/Favorites";
import Profile from "./pages/Profile/Profile";
import RestaurantOrders from "./pages/RestaurantOrders/RestaurantOrders";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import RestaurantMenu from "./pages/RestaurantMenu/RestaurantMenu";
import RestaurantSignup from "./pages/RestaurantSignup/RestaurantSignup";


function App() {
  return (
    <Routes>

      {/* Unprotected */}

      <Route path="/" element={<Login />} />

      <Route path="/login" element={<Login />} />
      <Route path="/restaurant-login" element={<RestaurantLogin />} />
      <Route path="/admin-login" element={<AdminLogin />} />

      <Route path="/signup" element={<Signup />} />
      <Route path="/restaurant/signup" element={<RestaurantSignup />} />


      {/* User Protected */}

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/restaurant-menu"
        element={
          <ProtectedRoute allowedRoles={["restaurant"]}>
            <RestaurantMenu />
          </ProtectedRoute>
        }
      />

      <Route
        path="/restaurant-profile"
        element={
          <ProtectedRoute allowedRoles={["restaurant"]}>
            <RestaurantProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />


      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />


      <Route
        path="/order"
        element={
          <ProtectedRoute>
            <Order />
          </ProtectedRoute>
        }
      />


      <Route
        path="/tracking/:orderId"
        element={
          <ProtectedRoute>
            <Tracking />
          </ProtectedRoute>
        }
      />


      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />


      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />


      {/* Restaurant */}

      <Route
        path="/restaurant"
        element={
          <ProtectedRoute allowedRoles={["restaurant"]}>
            <RestaurantOrders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/restaurant-orders"
        element={
          <ProtectedRoute allowedRoles={["restaurant"]}>
            <RestaurantOrders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}


export default App;