import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './router'
import { RouterProvider } from 'react-router'
// 设置中文
import { ConfigProvider, theme } from 'antd'
import zhCN from "antd/es/locale/zh_CN"
import { Provider, useSelector } from 'react-redux'
import store from './store'
const { defaultAlgorithm, darkAlgorithm } = theme;

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ConfigProvider
    locale={zhCN}
    theme={{
      algorithm: false ? darkAlgorithm : defaultAlgorithm,
    }}>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </ConfigProvider>
  // </React.StrictMode>,
)
