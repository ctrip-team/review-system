import React, { useEffect, useRef, useState } from 'react';
import { Avatar, List, message, Modal, Button } from 'antd';
import VirtualList from 'rc-virtual-list';
import { deleteRoleAPI, getRolesAPI } from '../../apis/role';
import { useSelector } from 'react-redux';
const ContainerHeight = 400;

const num = 6
const RoleManagementList = () => {
    const [roles, setRoles] = useState([]);
    const [isLoadAll, setIsLoadAll] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteRole, setDeleteRole] = useState({})
    const { roleInfo: { is_admin } } = useSelector(state => state.role)
    const start = useRef(0)
    const appendData = async () => {
        const res = await getRolesAPI(start.current, num)
        if (res.code === 2000) {
            setRoles([...roles, ...res.roles])
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
        setDeleteRole(item)
        setIsDeleteModalOpen(true)
    }

    const handleDeleteOk = async () => {
        const res = await deleteRoleAPI(deleteRole.username)
        message.success(res.msg)
        start.current -= 1
        setIsDeleteModalOpen(false);
    };


    const handleEditOk = async () => {
        setIsEditModalOpen(false)
    }


    return (
        <List>
            <VirtualList
                data={roles}
                height={ContainerHeight}
                itemHeight={60}
                itemKey="role_id"
                onScroll={onScroll}
            >
                {(item) => (
                    <List.Item
                        key={item.role_id}
                        actions={
                            is_admin ?
                                [
                                    <Button type="primary" onClick={() => { setIsEditModalOpen(true) }}>编辑</Button>,
                                    <Button type="primary" danger onClick={() => handleDelete(item)}>删除</Button>
                                ] : []
                        }>
                        <List.Item.Meta
                            title={<a onClick={() => { setIsEditModalOpen(true) }}>{item.username}</a>}
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
                onOk={handleEditOk}
                onCancel={() => { setIsEditModalOpen(false); }}
                okText="确认"
                cancelText="取消"
            >
                <p>form表单</p>
            </Modal>
        </List >
    );
};
export default RoleManagementList;