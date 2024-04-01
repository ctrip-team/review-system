import React, { useState, useEffect } from 'react'
import { Table, Space, Tag, Image, Modal, Form, Select, Input, Button, message } from 'antd';
import { getDeleteTravelsAPI, recoverTravelAPI } from '../../apis/travel';
import { useSelector } from 'react-redux';
const { Column } = Table;
const { TextArea } = Input;
const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
};

function DeletePage() {
    const [deleteTravelList, setDeleteTravelList] = useState([])
    const [contentModalOpen, setContentModalOpen] = useState(false)
    const [recoverModalOpen, setRecoverModalOpen] = useState(false)
    const [recoverId, setRecoverId] = useState('')
    const [operation, setOperation] = useState('')
    const [content, setContent] = useState('')

    useEffect(() => {
        async function getTravels() {
            const res = await getDeleteTravelsAPI()
            setDeleteTravelList(res.deleteTravelList)
        }
        getTravels()
    }, [operation])

    // 展示详细文案
    const showAllContent = (content) => {
        setContent(content)
        setContentModalOpen(true)
    }

    const contentModalCancel = () => {
        setContentModalOpen(false)
    }


    // 处理恢复数据
    const handleRecover = ({ travel_id }) => {
        setRecoverModalOpen(true)
        setRecoverId(travel_id)
    }

    const confirmRecover = async () => {
        const res = await recoverTravelAPI(recoverId)
        message.success(res.msg)
        setOperation('recover')
        setRecoverModalOpen(false)
    }
    return (
        <>
            <Table dataSource={deleteTravelList} pagination={{ defaultPageSize: 5, showSizeChanger: true, onShowSizeChange, pageSizeOptions: ['5', '10', '20'] }}>
                <Column
                    title="图片"
                    dataIndex="imgs"
                    key="imgs"
                    align="center"
                    render={
                        (_, record) => {
                            return (
                                <Image.PreviewGroup
                                    items={record.imgs}>
                                    <Image width={200} src={record.imgs[0]} />
                                </Image.PreviewGroup>
                            )
                        }
                    }
                />
                <Column
                    title="标题"
                    dataIndex="title"
                    key="title"
                    align="center"
                    render={(_, record) => {
                        return (
                            <TextArea
                                showCount
                                maxLength={30}
                                defaultValue={record.title}
                                disabled
                                style={{
                                    height: 80,
                                    resize: 'none',
                                    border: 'none'
                                }}
                            />
                        )
                    }}
                />
                <Column
                    title="文案"
                    dataIndex="content"
                    key="content"
                    align="center"

                    render={(_, record) => {
                        return (
                            <div className="richTextContainer" onClick={() => showAllContent(record.content)}>
                                <div dangerouslySetInnerHTML={{ __html: record.content }} />
                            </div>
                        )
                    }}
                />
                <Column
                    title="状态"
                    dataIndex="status"
                    key="status"
                    align="center"

                    render={() => {
                        return (
                            <Tag color='gray'>
                                已删除
                            </Tag>
                        );

                    }}
                />
                <Column
                    title="操作"
                    key="action"
                    align="center"
                    render={(_, record) => (
                        <Space size="middle">
                            <a onClick={() => handleRecover(record)}>恢复数据</a>
                        </Space>
                    )}
                />
            </Table>

            <Modal title="详细文案" footer={null} closable={false} open={contentModalOpen} onCancel={contentModalCancel} style={{ overflowY: 'auto', height: '80%' }} className='contentModal'>
                <div>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            </Modal>

            <Modal title="恢复数据" open={recoverModalOpen} onOk={confirmRecover} onCancel={() => setRecoverModalOpen(false)}>
                <p>确定要恢复这个数据吗？</p>
            </Modal>
        </>
    )
}

export default DeletePage