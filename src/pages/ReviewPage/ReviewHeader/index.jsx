import React from 'react'
import { Layout, Dropdown, Space, Breadcrumb } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './index.scss'
import { useNavigate } from 'react-router-dom';
const { Header } = Layout;



function ReviewHeader() {
    const navigate = useNavigate()
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
        localStorage.removeItem('role_id')
        localStorage.removeItem('token')
        navigate('/login')
        message.success('登出成功')
    }
    return (
        <Header className='xxheader'>
            右侧可以放一个dropdown，下拉内容就是退出登录，或者做全一点是个头像。
            <Dropdown
                menu={{
                    items: dropdownItems,
                }}
                className='username-dropdown'
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        {localStorage.getItem('username')}
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </Header>
    )
}

export default ReviewHeader