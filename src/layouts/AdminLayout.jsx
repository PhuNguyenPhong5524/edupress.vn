import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;
import { Outlet, useNavigate } from 'react-router';

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const nav = useNavigate();
  return (
    <Layout style={{ minHeight: '100vh', background: '#ffffff !important' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} >
        <h1 className='text-[#ffffff] text-center py-[10px] text-[20px] font-bold' >Admin</h1>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}

          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Quản lý tài khoản',
              onClick: () => {
                nav('employee');
              }
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'Quản lý sản phẩm',
              onClick: () => {
                nav('products');
              }
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'Quản lý đơn hàng',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#ffffff' }}>
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
        </Header>
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