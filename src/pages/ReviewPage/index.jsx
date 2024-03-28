import React from 'react';
import { Layout, theme } from 'antd';
import ReviewMenu from './ReviewMenu';
import ReviewHeader from './ReviewHeader';
import { Outlet } from 'react-router';
import './index.scss'
const { Content, Sider } = Layout;
const ReviewPage = () => {
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    return (
        <Layout>
            <Sider
                theme='light'
                breakpoint="lg"
                collapsedWidth="0"
                className='sider'
            >
                <div className="logo" >
                    <img src="/vite.svg" alt="" />
                    <h1>审核管理系统</h1>
                </div>
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
                            minHeight: 360,
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