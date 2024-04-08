import React from 'react';
import { Layout, theme, Divider } from 'antd';
import ReviewMenu from './ReviewMenu';
import ReviewHeader from './ReviewHeader';
import { Outlet } from 'react-router';
import './index.scss'
const { Content, Sider } = Layout;

const ReviewPage = () => {
    const { token: { colorBgContainer, borderRadiusLG, colorTextBase } } = theme.useToken();
    return (
        <Layout className='full-screen'>
            <Sider
                theme='light'
                breakpoint="lg"
                collapsedWidth="0"
                className='sider'
            >
                <div className="logo-container" >
                    <img className='logo' src="/logo.png" alt="" />
                    <h1 style={{ color: colorTextBase }}>审核管理系统</h1>
                </div>
                <Divider style={{ margin: 0 }} />
                <ReviewMenu />
            </Sider>
            <Layout>
                <ReviewHeader />
                <Content
                    style={{
                        margin: '24px 16px 0',
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            height: '100%',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default ReviewPage;