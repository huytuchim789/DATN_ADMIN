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
        setData(res.data.data)
        console.log(res)
      })
      .catch((err) => {
        setLoading(false)
        setData(null)
      })
  }, [])
  const handleSelectChange = (e) => {
    formik.setFieldValue('role', e)
  }
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: data.name,
      phoneNumber: data.phone_number,
      role: data.role,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      phoneNumber: Yup.string()
        .min(10, 'Số điện thoại phải hơn 10 kí tự')
        .max(100, 'SĐT không được quá 100 kí tự')
        .required('Bạn chưa nhập sđt'),
      name: Yup.string()
        .required('Bạn chưa nhập tên user')
        .max(100, 'Tên user không được quá 100 kí tự'),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values, { validate }) => {
      setSpinning(true)
      const { name, phoneNumber, role } = values
      console.log(values)
      updateUser(id, name, phoneNumber, role)
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
                Số Điện Thoại
              </Title>
              <Input
                id="phone"
                name="phoneNumber"
                placeholder="Tên Người Dùng"
                type="text"
                size="large"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div className="error-message">{formik.errors.phoneNumber}</div>
              ) : null}
              <Title level={4} htmlFor="name">
                Tên Người Dùng
              </Title>
              <Input
                id="name"
                name="name"
                placeholder="Tên Người Dùng"
                type="text"
                size="large"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error-message">{formik.errors.name}</div>
              ) : null}
              <Title level={4} htmlFor="role">
                Quyền
              </Title>
              <Select
                value={formik.values.role}
                style={{ width: 120 }}
                id="role"
                name="role"
                size="large"
                onChange={handleSelectChange}
                // onBlur={formik.handleBlur}
              >
                <Option value="admin">Admin</Option>
                <Option value="member">Member</Option>
                <Option value="user">User</Option>
              </Select>
              {formik.touched.name && formik.errors.name ? (
                <div className="error-message">{formik.errors.name}</div>
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
