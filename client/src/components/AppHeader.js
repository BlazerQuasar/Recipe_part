import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const { Header } = Layout;

const AppHeader = () => {
  const location = useLocation();
  
  // 根据当前路径确定选中的菜单项
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === '/') return '1';
    if (path.includes('/add-recipe')) return '2';
    return '1'; // 默认选中首页
  };

  return (
    <Header className="header">
      <div className="logo">
        <Link to="/">
          <h1 style={{ color: 'white', margin: 0 }}>菜谱管理系统</h1>
        </Link>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[getSelectedKey()]}
        style={{ lineHeight: '64px', marginLeft: '30px' }}
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/">首页</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<PlusOutlined />}>
          <Link to="/add-recipe">添加菜谱</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default AppHeader; 