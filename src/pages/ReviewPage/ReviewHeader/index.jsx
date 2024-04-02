import React, { useState } from 'react'
import { Layout, Dropdown, Space, message, Switch, Modal, theme, Button, Form, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './index.scss'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearRole, setRoleInfo } from '../../../store/role';
import { setDarkMode } from '../../../store/dark';
import { updateRoleAPI } from '../../../apis/role'
const { Header } = Layout;


function ReviewHeader() {
    const { token: { colorBgContainer } } = theme.useToken();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [editForm] = Form.useForm()
    const { roleInfo } = useSelector(state => state.role)
    const dark = useSelector(state => state.dark)

    const dropdownItems = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" onClick={handleLogOut}>
                    退出登录
                </a>
            ),
        }
    ];

    function handleLogOut() {
        dispatch(clearRole())
        navigate('/login')
        message.success('登出成功')
    }

    const changeDarkMode = (e) => {
        dispatch(setDarkMode(e))
    }

    const handleEdit = () => {
        setIsEditModalOpen(true)
        editForm.setFieldsValue({
            username: roleInfo.username,
            password: roleInfo.password,
            role: roleInfo.is_admin ? '管理员' : '审核员'
        })
    }
    const confirmEdit = async (values) => {
        const res = await updateRoleAPI({ ...values, role_id: roleInfo.role_id })
        setIsEditModalOpen(false)
        message.success(res.msg)
        dispatch(setRoleInfo({ ...roleInfo, username: values.username, password: values.password }))
    }
    return (
        <>
            <Header className='review-header' style={{ background: colorBgContainer }}>
                <Switch checkedChildren="暗黑" unCheckedChildren="明亮" onChange={changeDarkMode} defaultChecked={dark.isDarkMode} />
                <Dropdown
                    menu={{
                        items: dropdownItems,
                    }}
                    className='username-dropdown'
                >
                    <a onClick={handleEdit}>
                        <Space>
                            {roleInfo.username}
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </Header>

            <Modal
                title="编辑角色"
                open={isEditModalOpen}
                onCancel={() => { setIsEditModalOpen(false); }}
                footer={null}
            >
                <Form
                    labelCol={{
                        span: 10,
                    }}
                    wrapperCol={{
                        span: 10,
                    }}
                    style={{
                        maxWidth: 400,
                        marginTop: 24
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={confirmEdit}
                    autoComplete="off"
                    form={editForm}
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

                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 12,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            编辑
                        </Button>
                    </Form.Item>

                </Form>
            </Modal>
        </>

    )
}

export default ReviewHeader