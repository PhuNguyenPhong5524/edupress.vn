import React, { use, useState } from 'react';
import {
  BellOutlined,
  CheckOutlined,
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;
import { Outlet, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import MenuUser from '../components/Header/BoxMenu/MenuUser';
import UserIcon from '../components/icons/UserIcon';
import { useTranslation } from 'react-i18next';
const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const nav = useNavigate();
  const { isAuthenticated, user, logout, getAvatarLetter } = useAuth();
  const { t } = useTranslation();

   const handleChangePassword = () => {
    nav("change-password");
  };
  const handleNotification = () => {
    nav("notification");
  }
  return (
    <Layout style={{ minHeight: '100vh', background: '#ffffff !important' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} >
        <h1 className='text-[#ffffff] text-center py-[10px] text-[20px] font-bold' >Admin</h1>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          className='
            admin-menu 
          '
          items={[
            {
              key: '1',
              icon: <UserOutlined style={{ fontSize: '20px' }} />,
              label: 'Quản lý tài khoản',
              onClick: () => {
                nav('employee');
              }
            },
            {
              key: '2',
              icon: <BellOutlined style={{ fontSize: '20px' }} />,
              label: 'Quản lý thông báo',
              onClick: () => {
                nav('notification');
              }
            },
            {
              key: '3',
              icon: <OrderedListOutlined style={{ fontSize: '20px' }} />,
              label: 'Quản lý giao dịch',
            },
          ]}
        />
      </Sider>
      <Layout>
        <div
          className='
           bg-[#ffffff] flex justify-between items-center 
           pr-[20px] shadow-md
          '
        > 
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div>
            {/* User */}
              <div className="relative group hidden lg:block">
           
                  <div
                      className="
                          flex items-center gap-2 p-2
                      "
                  >
                      {
                          isAuthenticated ?
                              <div className="flex items-center gap-2 group ">
                                <Avatar 
                                    className='avatar_header' 
                                >
                                    <span className="text-[#000000] font-semibold">{getAvatarLetter(user.username)}</span>
                                </Avatar>
                                <div className="leading-[20px]">
                                  <p className="text-[#2c2c2c] font-semibold p-0 m-0">{user.username}</p>
                                  <p className="text-[#a4a4a4] text-[14px] font-regular p-0 m-0">{user.email}</p>
                                </div>
                                <div className='transition-transform duration-300 group-hover:rotate-180'>
                                  <DownOutlined />
                                </div>
                              </div>
                          :
                          <UserIcon size={24} />
                      }
                  </div>
                  {/* Spacer */}
                  <div className="absolute top-full right-0 h-3 w-full"></div>
                  {/* Menu User */}
                      <MenuUser 
                          t={t}
                          user={user}
                          logout={logout}
                          isAuthenticated={isAuthenticated}
                          getAvatarLetter={getAvatarLetter}
                          handleChangePassword={handleChangePassword}
                          handleNotification={handleNotification}
                      />
              </div>
          </div>
        </div>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;