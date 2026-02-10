import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Spin } from "antd";



const PrivateRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user || user === null || user === undefined) {
        return <Navigate to="/login"  replace/>
    };

    return children;
};

export default PrivateRoute;