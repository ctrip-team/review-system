import React, { useEffect, useState } from 'react'
import { HomeOutlined, AppstoreOutlined, UserOutlined, CheckCircleOutlined, UserAddOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

function ReviewMenu() {
    const location = useLocation()
    const navigate = useNavigate()
    const [openKeys, setOpenKeys] = useState('')
    const [menuItems, setMenuItems] = useState([])
    const { roleInfo: { is_admin } } = useSelector(state => state.role)

    function handleMenuClick({ key }) {
        navigate(key)
    }

    function handleOpenChange(key) {
        setOpenKeys(key)
    }

    // 刷新后子项仍展开
    useEffect(() => {
        const path = location.pathname
        if (path === '/role' || path === '/newRole') {
            setOpenKeys(['/system'])
        } else if (path === '/review' || path === '/delete') {
            setOpenKeys(['/content'])
        }
    }, [])

    // 权限管理
    useEffect(() => {
        const items = []
        items.push(
            {
                label: '首页',
                key: '/',
                icon: <HomeOutlined />,
            }
        )

        const contentManage = {
            label: '游记管理',
            key: '/content',
            icon: <CheckCircleOutlined />,
            children: [
                {
                    label: '游记审核',
                    key: '/review',
                    icon: <CheckCircleOutlined />,
                }
            ]
        }

        const systemManage = {
            label: '系统管理',
            key: '/system',
            icon: <AppstoreOutlined />,
            children: [
                {
                    label: '角色管理',
                    key: '/role',
                    icon: <UserOutlined />,
                }
            ]
        }
        
        if (is_admin) {
            contentManage.children.push(
                {
                    label: '已删除',
                    key: '/delete',
                    icon: <CloseCircleOutlined />,
                }
            )
            systemManage.children.push(
                {
                    label: '角色创建',
                    key: '/newRole',
                    icon: <UserAddOutlined />,
                }
            )
        }
        items.push(contentManage)
        items.push(systemManage)
        setMenuItems(items)
    }, [])

    return (
        <Menu mode="inline" defaultSelectedKeys={location.pathname} items={menuItems} onClick={handleMenuClick} openKeys={openKeys} onOpenChange={handleOpenChange} />
    )
}

export default ReviewMenu