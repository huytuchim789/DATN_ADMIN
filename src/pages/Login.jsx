import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button } from 'antd';
import logo from './../resources/images/admin.png';
const Login = () => {
  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
      password: '',
    },

    validationSchema: Yup.object({
      phoneNumber: Yup.string()
        .min(10, 'Số điện thoại phải hơn 10 kí tự')
        .required('Bạn chưa nhập sđt'),
      password: Yup.string()
        .required('Bạn chưa nhập password')
        .min(6, 'Password phải có hơn 6 kí tự'),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values, { validate }) => {
      alert(values);
    },
  });
  return (
    <div className="login">
      <img src={logo} alt="" />
      <form onSubmit={formik.handleSubmit} className="login__form">
        <label htmlFor="phoneNumber">Phone</label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Số Điện Thoại"
          type="text"
          size="large"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phoneNumber}
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
          <div className="error-message">{formik.errors.phoneNumber}</div>
        ) : null}
        <label htmlFor="password">Password</label>
        <Input.Password
          id="password"
          name="password"
          placeholder="Mật Khẩu"
          size="large"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="error-message">{formik.errors.password}</div>
        ) : null}

        <Button
          className="submit_btn"
          type="primary"
          htmlType="submit"
          size="large"
        >
          Đăng Nhập
        </Button>
      </form>
    </div>
  );
};
export default Login;
