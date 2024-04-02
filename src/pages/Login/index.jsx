import React from 'react';
import { Button, message, Form, Input, ConfigProvider, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import { loginAPI } from '../../apis/role';
import './index.scss'
import { setToken, setRoleInfo } from '../../store/role';
import { useDispatch } from 'react-redux';

function Login() {
  const { token: { colorBgContainer, colorTextBase } } = theme.useToken();

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onFinish = async (values) => {
    const res = await loginAPI(values)
    console.log('res', res);
    if (res.code === 2000) {
      message.success(res.msg)
      dispatch(setToken(res.token))
      dispatch(setRoleInfo(res.role))

      navigate('/')
    } else if (res.code === 2001) {
      message.error(res.msg)
    }
  };
  return (
    <div className='login-container' style={{ background: colorBgContainer }}>
      <h1 style={{ color: colorTextBase }}>审核管理系统</h1>
      <Form
        name="loginForm"
        className='login-form'
        labelAlign='left'
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: '请输入账号！',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>


        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login