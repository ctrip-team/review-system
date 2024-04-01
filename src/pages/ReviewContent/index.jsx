import React, { useState, useEffect } from 'react'
import { Table, Space, Tag, Image, Modal, Form, Select, Input, Button, message } from 'antd';
import { deleteTravelAPI, getTravelsAPI, passTravelAPI, rejectTravelAPI } from '../../apis/travel';
import { useSelector } from 'react-redux';
import './index.scss'
const { Column } = Table;
const { TextArea } = Input;

const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
};

function ReviewContent() {
    const [travelList, setTravelList] = useState([])
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [contentModalOpen, setContentModalOpen] = useState(false)
    const [content, setContent] = useState('')
    const [rejectId, setRejectId] = useState('')
    const [operationType, setOperationType] = useState(null);
    const [deleteId, setDeletedId] = useState('')
    const [form] = Form.useForm()
    const { roleInfo: { is_admin } } = useSelector(state => state.role)

    // 获取所有travel
    useEffect(() => {
        async function getTravels() {
            const res = await getTravelsAPI()
            setTravelList(res.travelList)
        }
        getTravels()
    }, [operationType])


    // 通过
    const handlePass = async ({ travel_id }) => {
        const res = await passTravelAPI(travel_id)
        setOperationType(`pass${travel_id}`)
        message.success(res.msg)
    }

    // 拒绝
    const handleReject = async ({ travel_id }) => {
        setIsRejectModalOpen(true)
        setRejectId(travel_id)
    }

    const confirmReject = async (values) => {
        const res = await rejectTravelAPI({ reason: values.reason, travel_id: rejectId })
        message.success(res.msg)
        setIsRejectModalOpen(false)
        setOperationType(`reject${rejectId}`)
        form.setFieldsValue({
            'reason': '',
            'quickFill': ''
        })
    }

    const onChange = (value) => {
        form.setFieldValue('reason', value)
    }

    // 删除
    const handleDelete = async ({ travel_id }) => {
        setIsDeleteModalOpen(true)
        setDeletedId(travel_id)
    }

    const confirmDelete = async () => {
        const res = await deleteTravelAPI(deleteId)
        message.success(res.msg)
        setIsDeleteModalOpen(false)
    }


    // 展示详细文案
    const showAllContent = (content) => {
        setContent(content)
        setContentModalOpen(true)
    }

    const contentModalCancel = () => {
        setContentModalOpen(false)
    }


    return (
        <>
            <Table dataSource={travelList} pagination={{ defaultPageSize: 5, showSizeChanger: true, onShowSizeChange, pageSizeOptions: ['5', '10', '20'] }}>
                {/* 渲染图片集 */}
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

                    render={(status) => {
                        let color = 'green'
                        let tag = '已通过'
                        if (status === '1') {
                            color = 'volcano';
                            tag = '未通过'
                        }
                        else if (status === '0') {
                            color = 'geekblue'
                            tag = '待审核'
                        }
                        return (
                            <Tag color={color}>
                                {tag}
                            </Tag>
                        );

                    }}
                    filters={[
                        {
                            text: '待审核',
                            value: '0'
                        },
                        {
                            text: '未通过',
                            value: '1'
                        },

                        {
                            text: '通过',
                            value: '2'
                        }
                    ]}

                    onFilter={(value, record) => record.status === value}
                />
                <Column
                    title="操作"
                    key="action"
                    align="center"

                    render={(_, record) => (
                        <Space size="middle">
                            <a onClick={() => handlePass(record)}>通过</a>
                            <a onClick={() => handleReject(record)}>拒绝</a>
                            {is_admin ? <a onClick={() => handleDelete(record)}>删除</a> : null}
                        </Space>
                    )}
                />
            </Table>


            <Modal title="拒绝通过" footer={null} open={isRejectModalOpen} onCancel={() => setIsRejectModalOpen(false)}>
                <Form
                    form={form}
                    onFinish={confirmReject}
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 8,
                    }}
                >
                    <Form.Item label="快速填写" name="quickFill">
                        <Select onChange={onChange}>
                            <Select.Option value="违规图片">违规图片</Select.Option>
                            <Select.Option value="违规内容">违规内容</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="拒绝原因"
                        name="reason"
                        rules={[{ required: true, message: '请输入拒绝原因！' }]}
                    >
                        <Input.TextArea showCount maxLength={100} style={{ resize: 'none', width: 200, height: 100 }} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 10 }}>
                        <Button type="primary" htmlType="submit">
                            确认
                        </Button>
                    </Form.Item>
                </Form>
            </Modal >

            <Modal title="删除" open={isDeleteModalOpen} onOk={confirmDelete} onCancel={() => setIsDeleteModalOpen(false)}>
                <p>确定要删除吗？</p>
            </Modal>

            <Modal title="详细文案" footer={null} closable={false} open={contentModalOpen} onCancel={contentModalCancel} style={{ overflowY: 'auto', height: '80%' }} className='contentModal'>
                <div>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            </Modal>
        </>
    )
}

export default ReviewContent