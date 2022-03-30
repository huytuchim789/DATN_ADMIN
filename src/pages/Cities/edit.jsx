import React, { useContext, useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Input, Space } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Button } from 'antd'

import { login } from '../../api/Login'
import { UserContext } from '../../context/AuthContext'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Typography, Divider, message, Spin, Empty, Skeleton } from 'antd'
import { createCity, getCity, updateCity } from '../../api/Cities'

const { Title } = Typography
const EditCity = () => {
  let { id } = useParams()

  const [loading, setLoading] = useState(true)
  const [spinning, setSpinning] = useState(false)
  const [data, setData] = useState({})
  useEffect(() => {
    setLoading(true)
    getCity(id)
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

  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: data.name,
      groupID: data.facebook_group_id,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Bạn chưa tên thành phố')
        .max(100, 'Tên thành phố không được quá 100 kí tự'),
      groupID: Yup.string()
        .required('Bạn chưa nhập groupID')
        .max(100, 'groupID Không được quá 100 kí tự'),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values, { validate }) => {
      setSpinning(true)
      const { name, groupID } = values
      updateCity(id, name, groupID)
        .then((res) => {
          setSpinning(false)
          message.success('Sửa thành công')
          navigate(-1)
        })
        .catch((err) => {
          message.error('Sửa thất bại')
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
              <Title level={1}>Sửa thành phố</Title>
            </header>
            <form
              onSubmit={formik.handleSubmit}
              className="cities__create__form"
            >
              <Title level={4} htmlFor="name">
                Tên Thành Phố
              </Title>
              <Input
                id="name"
                name="name"
                placeholder="Tên Thành Phố"
                type="text"
                size="large"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error-message">{formik.errors.name}</div>
              ) : null}
              <Title level={4} htmlFor="name">
                Group Facebook ID
              </Title>
              <Input
                id="groupID"
                name="groupID"
                placeholder="Group Facebook ID"
                size="large"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.groupID}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
              {formik.touched.groupID && formik.errors.groupID ? (
                <div className="error-message">{formik.errors.groupID}</div>
              ) : null}
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
export default EditCity
