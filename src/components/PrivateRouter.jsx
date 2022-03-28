import React, { Children } from 'react';
import { Layout, Menu } from 'antd';
import Navigation from './Navigation';
const { Header, Sider, Content } = Layout;

const PrivateRouter = ({ children }) => {
  return (
    <>
      <Navigation content={children} />
    </>
  );
};

export default PrivateRouter;
