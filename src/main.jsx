import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './router'
import { RouterProvider } from 'react-router'
// 设置中文
import { ConfigProvider } from 'antd'
import zhCN from "antd/es/locale/zh_CN"


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ConfigProvider locale={zhCN}>
    <RouterProvider router={router}></RouterProvider>
  </ConfigProvider>
  // </React.StrictMode>,
)
