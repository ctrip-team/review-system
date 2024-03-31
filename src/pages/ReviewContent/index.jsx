import React, { useState, useEffect } from 'react'
import { Table, Space, Tag, Image, Modal, Form, Select, Input, Button } from 'antd';
import { deleteTravelAPI, getTravelsAPI, passTravelAPI, rejectTravelAPI } from '../../apis/travel';
import { useSelector } from 'react-redux';
const { Column } = Table;

const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
};

function ReviewContent() {
    const [travelList, setTravelList] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteId, setDeletedId] = useState('')
    const [form] = Form.useForm()
    const { roleInfo: { is_admin } } = useSelector(state => state.role)

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        async function getTravels() {
            const res = await getTravelsAPI()
            setTravelList(res.travelList)
        }
        getTravels()
    }, [])

    const handlePass = async ({ travel_id }) => {
        const res = await passTravelAPI(travel_id)
        console.log('pass', res);
    }

    const handleReject = async ({ travel_id }) => {
        setIsModalOpen(true)
        setDeletedId(travel_id)
    }

    const handleDelete = async ({ travel_id }) => {
        const res = await deleteTravelAPI(travel_id)
    }

    const onChange = (value) => {
        console.log('value', value);
        form.setFieldValue('reason', value)
    }
    const onFinish = async (values) => {
        const res = await rejectTravelAPI({ reason: values.reason, travel_id: deleteId })
    }
    return (
        <>
            <Table dataSource={travelList} pagination={{ defaultPageSize: 5, showSizeChanger: true, onShowSizeChange, pageSizeOptions: ['5', '10', '20'] }}>
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
                                    <Image width={200} src={record.imgs[0]} />
                                </Image.PreviewGroup>
                            )
                        }
                    }
                />
                <Column title="标题" dataIndex="title" key="title" />
                <Column title="文案" dataIndex="content" key="content" />
                <Column
                    title="状态"
                    dataIndex="status"
                    key="status"
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
                    render={(_, record) => (
                        <Space size="middle">
                            <a onClick={() => handlePass(record)}>通过</a>
                            <a onClick={() => handleReject(record)}>拒绝</a>
                            {is_admin ? <a onClick={() => handleDelete(record)}>删除</a> : null}
                        </Space>
                    )}
                />
            </Table>

            <Modal title="拒绝通过" footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item label="快速填写">
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
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            确认
                        </Button>
                    </Form.Item>


                </Form>


            </Modal>
        </>
    )
}

export default ReviewContent