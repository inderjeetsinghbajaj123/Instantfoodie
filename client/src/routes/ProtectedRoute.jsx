import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthenticated = false;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;