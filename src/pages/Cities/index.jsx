import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Table, Space, Button, message, Popconfirm } from 'antd'
import { deleteGroup, getCities } from '../../api/Cities'
import { Link } from 'react-router-dom'
import { Typography, Divider, Tag } from 'antd'

import { Navigate, useNavigate } from 'react-router-dom'

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
          <Button disabled type="danger">
            Xóa
          </Button>
        </Link>
      </Space>
    ),
  },
]
function Cities(props) {
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({ current: 1, pageSize: 0 })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    setLoading(true)
    getCities(pagination.current).then((res) => {
      console.log(res.data.data)
      res.data.data = res.data.data.map((e) => {
        e.key = e.id
        return e
      })
      setData(res.data.data)
      setLoading(false)
      setPagination({
        ...pagination,
        pageSize: res.data.per_page,
        total: res.data.total,
      })
    })
  }, [])
  const handleTableChange = (pagination, filters, sorter) => {
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
  const handleDelete = (record, row) => {
    setLoading(true)
    deleteGroup(record.id)
      .then((res) => {
        message.success('Xóa Thành Công')
        navigate(0)

        // const newData = [...data]
        // newData.forEach((e) => {
        //   if (e.id === row.id) {
        //     e.groups.forEach((r, index) => {
        //       if (r.id === record.id) {
        //         e.groups.splice(index, 1)
        //       }
        //     })
        //   }
        // })
        // console.log(newData)
      })
      .catch((e) => {
        message.error('Xóa Thất Bại')
        setLoading(false)
      })
  }
  const expandedRowRender = (row) => {
    const columns = [
      {
        title: 'Facebook Group ID',
        dataIndex: 'facebook_group_id',
        key: 'facebook_group_id',
      },
      {
        title: 'Type',
        key: 'type',
        dataIndex: 'public',
        render: (text, record) => {
          console.log('here', record)
          return record.public ? (
            <Tag color="cyan">Public</Tag>
          ) : (
            <Tag color="black">Private</Tag>
          )
        },
      },
      {
        title: 'Hành Động',
        key: 'action',
        render: (text, record) => (
          <Space size="small">
            <Link to={`edit/${record.id}`}>
              <Button disabled type="primary">
                Sửa
              </Button>
            </Link>
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa?"
              onConfirm={() => {
                handleDelete(record, row)
              }}
              okText="Có"
              cancelText="Không"
            >
              <Button type="danger">Xóa</Button>
            </Popconfirm>
          </Space>
        ),
      },
    ]

    const inData = row.groups
    console.log(inData)
    return <Table columns={columns} dataSource={inData} pagination={false} />
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
        expandable={{ expandedRowRender }}
        onChange={handleTableChange}
      />
    </div>
  )
}

Cities.propTypes = {}

export default Cities
