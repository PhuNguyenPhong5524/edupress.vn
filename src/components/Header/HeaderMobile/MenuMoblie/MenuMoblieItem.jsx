import React from "react";
import {
  BellOutlined,
  LockOutlined,
  LogoutOutlined,

} from "@ant-design/icons";
import { Menu, message, Modal, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../../../stores/cart.store";

const MenuMobileItem = ({ onClose, logout}) => {
  const navigate = useNavigate();
  const { confirm } = Modal;
  const {clearCart} = useCartStore();
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
    confirm({
      title: "Đăng xuất",
      content: "Bạn có chắc chắn muốn đăng xuất không?",
      okText: "Đăng xuất",
      cancelText: "Hủy",
      onOk() {
        clearCart();
        logout();
        message.success("Bạn đã đăng xuất");
        navigate("/");
        onClose?.();
      },
    });
    return;
  }

  if (routeMap[key]) {
    navigate(routeMap[key]);
  }

  onClose?.();
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
