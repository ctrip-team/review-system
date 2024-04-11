import React, { useEffect, useRef, useState } from 'react';
import { Form, List, message, Modal, Button, Input, Select, Card } from 'antd';
import VirtualList from 'rc-virtual-list';
import { deleteRoleAPI, getRolesAPI, updateRoleAPI } from '../../apis/role';
import { useSelector } from 'react-redux';
const ContainerHeight = 500;

const num = 10
const RoleManagementList = () => {
    const [roles, setRoles] = useState([]);
    const [admins, setAdmins] = useState([])
    const [reviewers, setReviewers] = useState([])
    const [isLoadAll, setIsLoadAll] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteRole, setDeleteRole] = useState({})
    const [editId, setEditId] = useState('')
    const [activeTabKey, setActiveTabKey] = useState('全部');
    const { roleInfo } = useSelector(state => state.role)
    const is_admin = roleInfo.is_admin
    const [editForm] = Form.useForm()
    const start = useRef(0)
    const appendData = async () => {
        const res = await getRolesAPI(start.current, num)
        if (res.code === 2000) {
            setRoles([...roles, ...res.roles])
            const newAdmins = res.roles.filter(item => item.is_admin === 1)
            const newReviewers = res.roles.filter(item => item.is_admin === 0)
            setAdmins([...admins, ...newAdmins])
            setReviewers([...reviewers, ...newReviewers])
            start.current += num
        } else {
            setIsLoadAll(true)
        }
    };

    useEffect(() => {
        appendData();
    }, []);

    const onScroll = (e) => {
        if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - ContainerHeight) <= 1 && !isLoadAll) {
            appendData();
        }
    };

    // 处理删除
    const handleDelete = (item) => {
        if (roleInfo.username === 'demo') {
            message.error('游客账号没有权限')
            return
        }
        setDeleteRole(item)
        setIsDeleteModalOpen(true)
    }

    const handleDeleteOk = async () => {
        const res = await deleteRoleAPI(deleteRole.username)
        setRoles(roles.filter((item) => item.role_id !== deleteRole.role_id))
        setAdmins(admins.filter((item) => item.role_id !== deleteRole.role_id))
        setReviewers(reviewers.filter((item) => item.role_id !== deleteRole.role_id))
        message.success(res.msg)
        start.current -= 1
        setIsDeleteModalOpen(false);
    };

    // 处理编辑
    const handleEdit = (item) => {
        if (roleInfo.username === 'demo') {
            message.error('游客账号没有权限')
            return
        }
        setIsEditModalOpen(true)
        editForm.setFieldsValue({
            username: item.username,
            password: item.password,
            role: item.is_admin ? '管理员' : '审核员'
        })
        setEditId(item.role_id)
    }
    const confirmEdit = async (values) => {
        const res = await updateRoleAPI({ ...values, role_id: editId })
        const role = roles.find(item => item.role_id === editId)
        if (values.role === '管理员') {
            role.is_admin = 1
            setReviewers(reviewers.filter((item) => item.role_id !== editId))
            setAdmins([...admins, role])
        } else {
            role.is_admin = 0
            setAdmins(admins.filter((item) => item.role_id !== editId))
            setReviewers([...reviewers, role])
        }
        setRoles(roles)
        setIsEditModalOpen(false)
        message.success(res.msg)
    }

    const tabChange = (key) => {
        setActiveTabKey(key);
    };
    return (
        <Card
            style={{
                width: '100%',
            }}
            tabList={[
                {
                    key: '全部',
                    label: '全部'
                },
                {
                    key: '管理员',
                    label: '管理员'
                },
                {
                    key: '审核员',
                    label: '审核员'
                },
            ]}
            activeTabKey={activeTabKey}
            onTabChange={tabChange}
            tabProps={{
                size: 'middle',
            }}
        >
            <List bordered={true}>
                <VirtualList
                    data={activeTabKey === '全部' ? roles : activeTabKey === '管理员' ? admins : reviewers}
                    height={ContainerHeight}
                    itemHeight={60}
                    itemKey="role_id"
                    onScroll={onScroll}
                >
                    {(item) => (
                        <List.Item
                            key={item.role_id}
                            actions={
                                is_admin && item.username !== 'admin' ?
                                    [
                                        <Button type="primary" onClick={() => handleEdit(item)}>编辑</Button>,
                                        <Button type="primary" danger onClick={() => handleDelete(item)}>删除</Button>
                                    ] : []
                            }>
                            <List.Item.Meta
                                title={<a onClick={() => handleEdit(item)}>{item.username}</a>}
                                description={item.is_admin ? '管理员' : '审核员'}
                            />
                        </List.Item>
                    )}
                </VirtualList>

                <Modal
                    title="删除角色"
                    open={isDeleteModalOpen}
                    onOk={handleDeleteOk}
                    onCancel={() => { setIsDeleteModalOpen(false); }}
                    okText="确认"
                    cancelText="取消"
                >
                    <p>你确定要删除该角色吗？</p>
                </Modal>

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
                                offset: 12,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                编辑
                            </Button>
                        </Form.Item>

                    </Form>
                </Modal>
            </List >
        </Card>

    );
};
export default RoleManagementList;