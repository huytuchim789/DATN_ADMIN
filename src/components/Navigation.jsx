import {
  Layout,
  Menu,
  Avatar,
  Badge,
  Dropdown,
  Button,
  Spin,
  message,
} from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../api/Login'
import ScrollToTop from 'react-scroll-to-top'

const { Header, Sider, Content } = Layout
const nav = [
  {
    key: 1,
    icon: <EnvironmentOutlined className="icon-antd" />,
    text: 'Sản phẩm',
    link: '/home/products',
  },
  {
    key: 2,
    icon: <UserOutlined className="icon-antd" />,
    text: 'Người dùng',
    link: '/home/users',
  },
]
const Navigation = ({ content }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [spinning, setSpinning] = useState(false)

  const navigate = useNavigate()
  const toggle = () => {
    setCollapsed(!collapsed)
  }
  const handleLogout = () => {
    setSpinning(true)
    logout()
      .then(() => {
        setSpinning(false)
        localStorage.removeItem('auth')
        navigate(0, { replace: true })
      })
      .catch(() => {
        setSpinning(false)
        localStorage.removeItem('auth')
        navigate(0, { replace: true })

        message.error('Xảy ra lỗi xin vui lòng thử lại')
      })
  }
  return (
    <Spin spinning={spinning}>
      <Layout className="layout">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            {nav.map((e, index) => (
              <Menu.Item
                key={e.key}
                icon={e.icon}
                onClick={() => {
                  navigate(`${e.link}`, { replace: true })
                }}
              >
                {e.text}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background header"
            style={{ padding: 0 }}
          >
            {collapsed ? (
              <MenuUnfoldOutlined
                className="trigger icon-antd"
                onClick={toggle}
              />
            ) : (
              <MenuFoldOutlined
                className="trigger icon-antd"
                onClick={toggle}
              />
            )}

            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="0">
                    <Button type="link" block onClick={handleLogout}>
                      Đăng Xuất
                    </Button>
                  </Menu.Item>
                </Menu>
              }
            >
              <span style={{ cursor: 'pointer' }}>
                <Badge dot>
                  <Avatar shape="square" icon={<UserOutlined />} />
                </Badge>
              </span>
            </Dropdown>
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
            <ScrollToTop
              smooth
              color="yellow"
              style={{ background: 'black' }}
            />
          </Content>
        </Layout>
      </Layout>
    </Spin>
  )
}
export default Navigation
