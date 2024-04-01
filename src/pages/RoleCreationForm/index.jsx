import React from 'react'
import { Button, message, Form, Input, Select } from 'antd';
import { registerAPI } from '../../apis/role';
import './index.scss'

const onFinish = async (values) => {
    const res = await registerAPI(values)
    if (res.msg === '注册成功')
        message.success(res.msg)
    else
        message.error(res.msg)
};

function RoleCreationForm() {
    const [form] = Form.useForm()
    form.setFieldValue('role', '审核员')
    return (
        <div className='form-container'>
            <h1 className='form-title'>角色创建</h1>
            <Form
                name="RegisterForm"
                className='register-form'
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 10,
                }}
                style={{
                    maxWidth: 400,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
                form={form}
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名!',
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
                    <Input />
                </Form.Item>

                <Form.Item
                    label="角色"
                    name="role"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select>
                        <Select.Option value="审核员">审核员</Select.Option>
                        <Select.Option value="管理员">管理员</Select.Option>
                    </Select>
                </Form.Item>


                <Form.Item
                    wrapperCol={{
                        offset: 10,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        注册
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default RoleCreationForm