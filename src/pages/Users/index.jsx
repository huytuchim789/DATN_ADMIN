import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Table, Space, Button, Input, Tag } from 'antd'
import { findUser, getUsers } from '../../api/Users'
import { Link } from 'react-router-dom'
import { Typography, Divider } from 'antd'
import { DebounceInput } from 'react-debounce-input'
import {
  SearchOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  UsergroupDeleteOutlined,
} from '@ant-design/icons'
import Countdown from 'react-countdown'
import { getTimeRangeMilliseconds } from './../../utils/getTimeRange'

const { Title } = Typography
const { Search } = Input
const columns = [
  {
    title: 'Số Điện Thoại',
    dataIndex: 'phone_number',
    width: '20%',
    // filterDropdown: () => {
    //   return (

    //   )
    // },
    // filterIcon: () => {
    //   return <SearchOutlined className="icon-antd" />
    // },
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
    filters: [
      { text: 'Admin', value: 'admin' },
      { text: 'Member', value: 'member' },
      { text: 'User', value: 'user' },
    ],
  },
  {
    title: 'Thời Hạn',
    dataIndex: 'expires_at',
    width: '20%',
    render: (text, record) => {
      return (
        <Countdown
          date={Date.now() + getTimeRangeMilliseconds(record.expires_at)}
          renderer={({ days, hours, minutes, seconds }) => {
            if (record.role === 'member')
              return (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  Đã Kích Hoạt
                </Tag>
              )
            else if (
              record.role === 'user' &&
              getTimeRangeMilliseconds(record.expires_at) === 0
            ) {
              return (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  Đã Hết Hạn
                </Tag>
              )
            } else if (record.role === 'admin') {
              return (
                <Tag color="cyan" icon={<UsergroupDeleteOutlined />}>
                  admin
                </Tag>
              )
            }
            return (
              <div className="datetime_countdown">
                <div className="datetime_item">
                  <span
                    className="datetime_value"
                    style={{ color: days < 3 ? 'red' : 'initial' }}
                  >
                    {days}{' '}
                  </span>
                  <span
                    className="datetime_label"
                    style={{ color: days < 3 ? 'red' : 'initial' }}
                  >
                    Ngày
                  </span>
                </div>
              </div>
            )
          }}
        />
      )
    },
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
              <Button type="danger" disabled>
                Xóa
              </Button>
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
  const [search, setSearch] = useState('')
  useEffect(() => {
    setLoading(true)
    getUsers(pagination.current).then((res) => {
      setData(res.data.data)
      setLoading(false)
      setPagination({
        ...pagination,
        current: res.data.current,
        pageSize: res.data.per_page,
        total: res.data.total,
      })
    })
  }, [])
  let handleTableChange = useCallback((pagination, filters, sorter) => {
    setLoading(true)
    console.log(search)
    if (search) {
      findUser(search, pagination.current)
        .then((res) => {
          console.log('search')

          setLoading(false)
          setData(res.data.data)
        })
        .catch((e) => {
          console.log(e)
        })
    }
    getUsers(pagination.current)
      .then((res) => {
        console.log('frist')
        setLoading(false)
        setData(res.data.data)
      })
      .catch((e) => {
        console.log(e)
      })
  })
  return (
    <div className="cities">
      <header>
        <Title level={1}>Người Dùng</Title>
        {/* <Link to="create">
          <Button type="primary" size="large">
            Thêm Người Dùng
          </Button>
        </Link> */}
        <Search
          placeholder="Tìm kiếm theo SĐT"
          allowClear
          onPressEnter={(e) => {
            setLoading(true)
            setSearch(e.target.value)
            findUser(e.target.value, 1).then((res) => {
              setData(res.data.data)
              setLoading(false)
              setPagination({
                ...pagination,
                current: res.data.current,
                pageSize: res.data.per_page,
                total: res.data.total,
              })
            })
          }}
          style={{ width: 200 }}
        />
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
