import { Layout, Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
const { Header, Sider, Content } = Layout
const nav = [
  {
    key: 1,
    icon: <UserOutlined />,
    text: 'Thành Phố',
  },
  {
    key: 2,
    icon: <VideoCameraOutlined />,
    text: 'Người Dùng',
  },
  {
    key: 3,
    icon: <UploadOutlined />,
    text: 'User',
  },
]
const Navigation = ({ content }) => {
  const [collapsed, setCollapsed] = useState(false)

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          {nav.map((e, index) => (
            <Menu.Item key={e.key} icon={e.icon}>
              {e.text}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {collapsed ? (
            <MenuUnfoldOutlined className="trigger" onClick={toggle} />
          ) : (
            <MenuFoldOutlined className="trigger" onClick={toggle} />
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {content}
        </Content>
      </Layout>
    </Layout>
  )
}
export default Navigation
