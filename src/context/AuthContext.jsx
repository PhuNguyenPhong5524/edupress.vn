import { Modal } from "antd";
import { createContext, useEffect, useState } from "react";
import { message } from "antd";


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const { confirm } = Modal;

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData) =>{
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    }

    const logout = () => {
        confirm({
            title: "Đăng xuất",
            content: "Bạn có chắc chắn muốn đăng xuất không?",
            okText: "Đăng xuất",
            cancelText: "Hủy",
            onOk() {
                localStorage.removeItem("user");
                setUser(null);
                message.success("Bạn đã đăng xuất");
            }
        });
    };

    // check quyền 
    const hasRole = (role) => {
        if(!user) return false;
        return user.role === role;
    }

    // check nhiều quyền
    const hasAnyRoles = (roles) => {
        if(!user) return false;
        return roles.includes(user.role);
    }

    // Lấy chữ cái trên avatar (viết hoa)
    const getAvatarLetter = () => {
        if (!user?.username) return "";

        return user.username
        .trim() 
        .split(" ")
        .pop()
        .charAt(0)
        .toUpperCase();
    };

    return (
        <AuthContext.Provider 
            value={{
                user,
                login,
                logout,
                // !!user => (nếu user có giá trị -> true, ngược lại -> false)
                isAuthenticated: !!user,
                hasRole,
                hasAnyRoles,
                getAvatarLetter
            }}
        >
            {children}
        </AuthContext.Provider>
    );        
};

export default AuthProvider;
