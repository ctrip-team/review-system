import React, { useState } from 'react'
import { Layout, Dropdown, Space, message, Switch, ConfigProvider, theme, Button, Card } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './index.scss'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearRole } from '../../../store/user';
import { setDarkMode } from '../../../store/dark';
const { Header } = Layout;


function ReviewHeader() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const role = useSelector(state => state.role)
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
    return (
        <Header className='review-header'>
            <Switch checkedChildren="暗黑" unCheckedChildren="明亮" defaultChecked onChange={changeDarkMode} />

            <Dropdown
                menu={{
                    items: dropdownItems,
                }}
                className='username-dropdown'
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        {role.roleInfo.username}
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </Header>
    )
}

export default ReviewHeader