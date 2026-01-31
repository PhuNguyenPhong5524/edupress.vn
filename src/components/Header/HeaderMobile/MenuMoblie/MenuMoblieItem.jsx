import React from "react";
import {
  BellOutlined,
  LockOutlined,
  LogoutOutlined,

} from "@ant-design/icons";
import { Menu, Spin } from "antd";
import { useNavigate } from "react-router-dom";

const MenuMobileItem = ({ onClose, logout}) => {
  const navigate = useNavigate();

  // map key -> route
  const routeMap = {
    changepassword: "/change-password",
    notification: "/notification",
  };

  const items = [
    {
      key: "changepassword",
      label: "Đổi mật khẩu",
      icon: <LockOutlined />
    },
    {
      key: "notification",
      label: "Thông báo",
      icon: <BellOutlined />
    },
    {
        type: 'divider',
    },
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <LogoutOutlined />
    }
  ];

const handleClick = ({ key }) => {
    if (key === "logout") {
        logout();
        onClose();
        return;
    }

    if (routeMap[key]) {
        navigate(routeMap[key]);
    }

    onClose && onClose();
};


  return (
    <div>
       <Menu
          mode="inline"
          items={items}
          onClick={handleClick}
        />
    </div>
  );
};

export default MenuMobileItem;
