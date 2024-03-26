import React from 'react'
import { Layout } from 'antd';
import './index.scss'
const { Header } = Layout;

function ReviewHeader() {
    return (
        <Header className='xxheader'>
            右侧可以放一个dropdown，下拉内容就是退出登录，或者做全一点是个头像。
        </Header>
    )
}

export default ReviewHeader