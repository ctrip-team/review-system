import React from 'react'
import router from './router'
import { RouterProvider } from 'react-router'
import { ConfigProvider, theme, Layout } from 'antd'
// 设置中文
import zhCN from "antd/es/locale/zh_CN"
import { useSelector } from 'react-redux'
import './App.scss'
const { defaultAlgorithm, darkAlgorithm } = theme;

function App() {
    const dark = useSelector(state => state.dark)
    return (
        <ConfigProvider
            locale={zhCN}
            theme={{
                algorithm: dark.isDarkMode ? darkAlgorithm : defaultAlgorithm,
            }}>
            <Layout style={{ minHeight: '100vh' }}>
                <RouterProvider router={router}></RouterProvider>
            </Layout>
        </ConfigProvider >
    )
}

export default App