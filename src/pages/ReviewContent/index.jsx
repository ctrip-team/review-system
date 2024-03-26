import React, { useState, useEffect } from 'react'
import { Table, Space, Tag, Image } from 'antd';
const { Column } = Table;

const data = [
    {
        key: '1',
        imgs: ["https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png", "https://img1.baidu.com/it/u=1965663592,580944689&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1711558800&t=3ab78293c25353ee5dd2b366c408637f"],
        title: '标题test',
        content: 'New York No. 1 Lake Park',
        tag: ['通过'],
    },
    {
        key: '2',
        imgs: ["https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png", "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"],
        title: 'Jim',
        content: 'London No. 1 Lake Park',
        tag: ['未通过'],
    },
    {
        key: '3',
        imgs: ["https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png", "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"],
        title: 'Joe',
        content: 'Sydney No. 1 Lake Park',
        tag: ['待审核'],
    },
    {
        key: '4',
        imgs: ["https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png", "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"],
        title: 'Joe',
        content: 'Sydney No. 1 Lake Park',
        tag: ['待审核'],
    },
    {
        key: '5',
        imgs: ["https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png", "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"],
        title: 'Joe',
        content: 'Sydney No. 1 Lake Park',
        tag: ['待审核'],
    },
    {
        key: '6',
        imgs: ["https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png", "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"],
        title: 'Joe',
        content: 'Sydney No. 1 Lake Park',
        tag: ['待审核'],
    },
];

const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
};
function ReviewContent() {
    return (
        <Table dataSource={data} pagination={{ defaultPageSize: 5, showSizeChanger: true, onShowSizeChange, pageSizeOptions: ['5', '10', '20'] }}>
            {/* 第一列渲染图片集 */}
            <Column
                title="图片"
                dataIndex="imgs"
                key="imgs"
                render={
                    (_, record) => {
                        return (
                            <Image.PreviewGroup
                                items={record.imgs}>
                                <Image width={200} src={record.imgs[1]} />
                            </Image.PreviewGroup>
                        )
                    }
                }
            />
            <Column title="标题" dataIndex="title" key="title" />
            <Column title="文案" dataIndex="content" key="content" />
            <Column
                title="状态"
                dataIndex="tag"
                key="tag"
                render={(tags) => (
                    <>
                        {tags.map((tag) => {
                            let color = 'green';
                            if (tag === '未通过') {
                                color = 'volcano';
                            }
                            else if (tag === '待审核') {
                                color = 'geekblue'
                            }
                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            );
                        })}
                    </>
                )}
                filters={[
                    {
                        text: '未通过',
                        value: '未通过'
                    },
                    {
                        text: '待审核',
                        value: '待审核'
                    },
                    {
                        text: '通过',
                        value: '通过'
                    }
                ]}

                onFilter={(value, record) => record.tag[0] === value}
            />
            <Column
                title="操作"
                key="action"
                render={(_, record) => (
                    <Space size="middle">
                        <a>通过</a>
                        <a>拒绝</a>
                        <a>删除</a>
                    </Space>
                )}
            />
        </Table>
    )
}

export default ReviewContent