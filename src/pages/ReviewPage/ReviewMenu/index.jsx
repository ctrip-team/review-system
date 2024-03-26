import React from 'react'
import { HomeOutlined, AppstoreOutlined, UserOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router';



const menuItems = [
    {
        label: '首页',
        key: '/',
        icon: <HomeOutlined />,
    },
    {
        label: '内容审核',
        key: '/review',
        icon: <CheckCircleOutlined />,
    },
    {
        label: '系统管理',
        key: '/system',
        icon: <AppstoreOutlined />,
        children: [
            {
                label: '角色管理',
                key: '/auth',
                icon: <UserOutlined />,
            }
            // 后续可添加用户管理之类的，可以控制某些用户行为
        ]
    }
]

function ReviewMenu() {
    const location = useLocation()
    const navigate = useNavigate()

    // 点menu显示对应的二级路由
    function handleMenuClick({ key }) {
        navigate(key)
    }

    return (
        <Menu theme="light" mode="inline" defaultSelectedKeys={location.pathname} items={menuItems} onClick={handleMenuClick} />
    )
}

export default ReviewMenu