import { Spin } from "antd";
import { Navigate , useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin fullscreen size="large" tip="Đang xử lý..." />
      </div>
    );
  }

  // chưa login
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  // nếu là admin
  if (user.role === "admin") {
    // nếu đang ở admin rồi thì cho hiển thị
    if (location.pathname.startsWith("/admin/employee")) {
      return children;
    }

    // nếu không thì chuyển về admin
    return <Navigate to="/admin/employee" replace />;
  }

  return children;
};

export default PrivateRoute;
