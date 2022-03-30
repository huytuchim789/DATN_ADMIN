import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Table, Space, Button } from 'antd'
import { getUsers } from '../../api/Users'
import { Link } from 'react-router-dom'
import { Typography, Divider } from 'antd'
const { Title } = Typography

const columns = [
  {
    title: 'Số Điện Thoại',
    dataIndex: 'phone_number',
    width: '20%',
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    width: '20%',
  },
  {
    title: 'Quyền',
    dataIndex: 'role',
    width: '20%',
  },
  {
    title: 'Ngày Đăng Ký',
    dataIndex: 'created_at',
    width: '20%',
  },
  {
    title: 'Hành Động',
    key: 'action',
    render: (text, record) => (
      <Space size="small">
        {record.role !== 'admin' ? (
          <>
            <Link to={`edit/${record.id}`}>
              <Button type="primary">Sửa</Button>
            </Link>
            <Link to={`delete/${record.id}`}>
              <Button type="danger">Xóa</Button>
            </Link>
          </>
        ) : null}
      </Space>
    ),
  },
]
function Users(props) {
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({ current: 1, pageSize: 0 })
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    getUsers(pagination.current).then((res) => {
      console.log(res.data.data)
      setData(res.data.data)
      setLoading(false)
      setPagination({ ...pagination, pageSize: res.data.data.length })
    })
  }, [])
  const handleTableChange = (pagination, filters, sorter) => {
    // this.fetch({
    //   sortField: sorter.field,
    //   sortOrder: sorter.order,
    //   pagination,
    //   ...filters,
    // })
    setLoading(true)
    getUsers(pagination.current)
      .then((res) => {
        setLoading(false)
        setData(res.data.data)
        console.log(res)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  return (
    <div className="cities">
      <header>
        <Title level={1}>Người Dùng</Title>
        {/* <Link to="create">
          <Button type="primary" size="large">
            Thêm Người Dùng
          </Button>
        </Link> */}
      </header>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  )
}

Users.propTypes = {}

export default Users
