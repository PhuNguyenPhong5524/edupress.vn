import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Spin } from "antd";



const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (!loading && !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large"  fullscreen tip="Đang xử lý..."/>
      </div>
    );
  }

  if (!user || user === null || user === undefined){
    return <Navigate to="/login" replace />;
  }


  return children;
};

export default PrivateRoute;