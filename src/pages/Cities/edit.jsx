import React, { useContext, useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Input, Space, Select } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Button } from 'antd'

import { login } from '../../api/Login'
import { UserContext } from '../../context/AuthContext'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Typography, Divider, message, Spin, Modal, Skeleton } from 'antd'
import { createCity, getCity } from '../../api/Cities'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { set } from 'date-fns'

const { Title } = Typography
const { Option } = Select

const CityCreate = () => {
  let { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})
  const [ske, setSke] = useState(false)
  // const renderOptions = (e) => {
  //   e.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>)
  // }
  function handleChange(value) {
    formik.setFieldValue('groupID', value)
  }
  useEffect(() => {
    setSke(true)
    getCity(id)
      .then((res) => {
        setSke(false)
        console.log(res.data)
        setData(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  function showConfirm(values) {
    Modal.confirm({
      title: 'Xác Nhận',
      icon: <ExclamationCircleOutlined />,
      content:
        'Hãy đảm bảo ID là một ID của group. Bạn có chắc chắn muốn thêm? ',
      onOk() {
        formik
          .submitForm()
          .then(() => {
            const { name, groupID } = formik.values
            console.log(name)
            setLoading(true)
            createCity(name, groupID)
              .then((res) => {
                setLoading(false)
                message.success('Thêm mới thành công')
                navigate(-1)
                console.log(res)
              })
              .catch((err) => {
                message.error('Thêm mới thất bại')
                navigate(-1)
              })
          })
          .catch((e) => {
            console.log(e)
            setLoading(false)
          })
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: data.name,
      groupID: data.groups ? data.groups.map((g) => g.facebook_group_id) : [],
    },
    enableReinitialize: true,

    validationSchema: Yup.object({
      name: Yup.string()
        .required('Bạn chưa tên thành phố')
        .max(100, 'Tên thành phố không được quá 100 kí tự'),
      groupID: Yup.array().min(1, 'Bạn chưa nhập groupID'),
    }),
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: (values, { validate }) => {
      // showConfirm(values, validate)
    },
  })
  return (
    <>
      {ske ? (
        <Skeleton />
      ) : (
        <Spin tip="Loading..." spinning={loading}>
          <div className="cities__create">
            <header>
              <Title level={1}>Sửa Thành Phố</Title>
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
                Groups Facebook ID
              </Title>
              {/* <Input
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
          /> */}
              <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="Groups ID"
                size="large"
                id="groupID"
                name="groupID"
                onChange={handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.groupID}
                open={false}
              >
                {/* {children} */}
              </Select>
              {formik.touched.groupID && formik.errors.groupID ? (
                <div className="error-message">{formik.errors.groupID}</div>
              ) : null}
              <Space style={{ marginTop: '30px' }}>
                <Button
                  className="save_btn"
                  type="primary"
                  // htmlType="submit"
                  size="large"
                  onClick={showConfirm}
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
      )}
    </>
  )
}
export default CityCreate
