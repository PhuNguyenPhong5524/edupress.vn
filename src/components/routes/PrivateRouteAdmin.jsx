import { Spin } from "antd";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";




const PrivateRouteAdmin = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spin fullscreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};
export default PrivateRouteAdmin;