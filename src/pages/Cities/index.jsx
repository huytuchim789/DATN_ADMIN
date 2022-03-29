import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Table, Space, Button } from 'antd'
import { getCities } from '../../api/Cities'
import { Link } from 'react-router-dom'
import { Typography, Divider } from 'antd'
const { Title } = Typography

const columns = [
  {
    title: 'Thành Phố',
    dataIndex: 'name',
    width: '30%',
  },
  {
    title: 'Group ID',
    dataIndex: 'facebook_group_id',
    width: '30%',
  },
  {
    title: 'Hành Động',
    key: 'action',
    render: (text, record) => (
      <Space size="small">
        <Link to={`edit/${record.id}`}>
          <Button type="primary">Sửa </Button>
        </Link>
        <Link to={`delete/${record.id}`}>
          <Button type="danger">Xóa</Button>
        </Link>
      </Space>
    ),
  },
]
function Cities(props) {
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({ current: 1, pageSize: 0 })
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    getCities(pagination.current).then((res) => {
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
    getCities(pagination.current)
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
        <Title level={1}>Thành Phố</Title>
        <Link to="create">
          <Button type="primary" size="large">
            Thêm Thành Phố
          </Button>
        </Link>
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

Cities.propTypes = {}

export default Cities
