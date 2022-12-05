import React, { useContext, useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Input, Space } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Button } from 'antd'

import { login } from '../../api/Login'
import { UserContext } from '../../context/AuthContext'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  Typography,
  Divider,
  message,
  Spin,
  Empty,
  Skeleton,
  Select,
} from 'antd'
import { getUser, updateUser } from '../../api/Users'

const { Title } = Typography
const { Option } = Select
const EditUser = () => {
  let { id } = useParams()

  const [loading, setLoading] = useState(true)
  const [spinning, setSpinning] = useState(false)
  const [data, setData] = useState({})
  useEffect(() => {
    setLoading(true)
    getUser(id)
      .then((res) => {
        setLoading(false)
        setData(res.data)
        console.log(res)
      })
      .catch((err) => {
        setLoading(false)
        setData(null)
      })
  }, [])
  const handleSelectChange = (e) => {
    formik.setFieldValue('admin', e)
  }
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      username: data.username,
      email: data.email,
      admin: data.admin ? 'admin' : 'user',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      username: Yup.string()
        .min(6, 'Username phải hơn 6 kí tự')
        .required('Bạn chưa nhập username'),
      email: Yup.string()
        .required('Bạn chưa nhập email')
        .email('Email chưa đúng định dạng')
        .max(100, 'Email không được quá 100 kí tự'),
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values, { validate }) => {
      setSpinning(true)
      const { username, email, admin } = values
      console.log(values)
      updateUser(id, username, email, admin === 'admin' ? true : false)
        .then((res) => {
          setSpinning(false)
          message.success('Sửa thành công')
          navigate(-1)
        })
        .catch((err) => {
          message.error('Sửa thất bại')
          navigate(-1)
        })
    },
  })
  console.log(formik.errors)
  return (
    <>
      {loading ? (
        <Skeleton />
      ) : data ? (
        <Spin spinning={spinning}>
          <div className="cities__create">
            <header>
              <Title level={1}>Sửa Người Dùng</Title>
            </header>
            <form
              onSubmit={formik.handleSubmit}
              className="cities__create__form"
            >
              <Title level={4} htmlFor="">
                Username
              </Title>
              <Input
                id="phone"
                name="username"
                placeholder="Tên Người Dùng"
                type="text"
                size="large"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              {formik.errors.username ? (
                <div className="error-message">{formik.errors.username}</div>
              ) : null}
              <Title level={4} htmlFor="email">
                Email
              </Title>
              <Input
                id="email"
                name="email"
                placeholder="Email"
                type="text"
                size="large"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.errors.email ? (
                <div className="error-message">{formik.errors.email}</div>
              ) : null}
              <Title level={4} htmlFor="role">
                Quyền
              </Title>
              <Select
                value={formik.values.admin}
                style={{ width: 120 }}
                id="role"
                name="role"
                size="large"
                onChange={handleSelectChange}
                // onBlur={formik.handleBlur}
              >
                <Option value="admin">Admin</Option>
                <Option value="user">User</Option>
              </Select>
              {formik.errors.admin ? (
                <div className="error-message">{formik.errors.admin}</div>
              ) : null}

              {/* <Title level={4} htmlFor="password">
                Password
              </Title>
              <Input.Password
                id="password"
                name="password"
                placeholder="Group Facebook ID"
                size="large"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
              {formik.touched.groupID && formik.errors.groupID ? (
                <div className="error-message">{formik.errors.groupID}</div>
              ) : null} */}
              <Space style={{ marginTop: '30px' }}>
                <Button
                  className="save_btn"
                  type="primary"
                  htmlType="submit"
                  size="large"
                  disabled={!formik.isValid || !formik.dirty}
                >
                  Lưu
                </Button>
                <Button
                  className="cancel_btn"
                  type="danger"
                  size="large"
                  onClick={() => {
                    navigate(-1)
                  }}
                >
                  Hủy
                </Button>
              </Space>
            </form>
          </div>
        </Spin>
      ) : (
        <Empty />
      )}
    </>
  )
}
export default EditUser
