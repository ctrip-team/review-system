import React, { useState, useEffect, useRef } from 'react'
import { Table, Space, Tag, Image, Modal, Form, Select, Input, Button, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { deleteTravelAPI, getTravelsAPI, passTravelAPI, rejectTravelAPI } from '../../apis/travel';
import { useSelector } from 'react-redux';
import { WaterMark } from '@ant-design/pro-components'
import {
    Player,
    ControlBar,
    PlayToggle, // PlayToggle 播放/暂停按钮 若需禁止加 disabled
    ReplayControl, // 后退按钮
    ForwardControl,  // 前进按钮
    CurrentTimeDisplay,
    TimeDivider,
    PlaybackRateMenuButton,  // 倍速播放选项
    VolumeMenuButton,
    BigPlayButton
} from 'video-react';
import Highlighter from 'react-highlight-words';
import "video-react/dist/video-react.css";
import './index.scss'
const { Column } = Table;

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
    const { roleInfo } = useSelector(state => state.role)
    const is_admin = roleInfo.is_admin


    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    // 获取所有travel
    useEffect(() => {
        async function getTravels() {
            const res = await getTravelsAPI()
            setTravelList(res.travelList)
            console.log(res.travelList);
        }
        getTravels()
    }, [operationType])


    // 通过
    const handlePass = async ({ travel_id }) => {
        if (roleInfo.username === 'demo') {
            message.error('游客账号没有权限')
            return
        }
        const res = await passTravelAPI({ travel_id, role_id: roleInfo.role_id })
        travelList.find(item => item.travel_id === travel_id).status = '2'
        setTravelList([...travelList])
        message.success(res.msg)
    }

    // 拒绝
    const handleReject = async ({ travel_id }) => {
        if (roleInfo.username === 'demo') {
            message.error('游客账号没有权限')
            return
        }
        setIsRejectModalOpen(true)
        setRejectId(travel_id)
    }

    const confirmReject = async (values) => {
        const res = await rejectTravelAPI({ reason: values.reason, travel_id: rejectId, role_id: roleInfo.role_id })
        message.success(res.msg)
        setIsRejectModalOpen(false)
        travelList.find(item => item.travel_id === rejectId).status = '1'
        setTravelList([...travelList])
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
        if (roleInfo.username === 'demo') {
            message.error('游客账号没有权限')
            return
        }
        setIsDeleteModalOpen(true)
        setDeletedId(travel_id)
    }

    const confirmDelete = async () => {
        const res = await deleteTravelAPI(deleteId)
        message.success(res.msg)
        setIsDeleteModalOpen(false)
        setOperationType(`delete${deleteId}`)
    }

    // 展示详细文案
    const showAllContent = (content) => {
        setContent(content)
        setContentModalOpen(true)
    }

    const contentModalCancel = () => {
        setContentModalOpen(false)
    }

    // 正则匹配高亮显示
    function highlightRichText(content, keyword) {
        if (!keyword) return content;
        return content.replace(new RegExp(`(${keyword}+)`, 'gi'), (match) => `<mark style="background-color: rgb(255, 192, 105); padding: 0px;">${match}</mark>`);
    }
    return (
        <>
            <WaterMark content={roleInfo.username}>
                <Table
                    bordered={true}
                    dataSource={travelList}
                    pagination={{ defaultPageSize: 5, showSizeChanger: true, onShowSizeChange, pageSizeOptions: ['5', '10', '20'] }}
                    scroll={{
                        y: 600,
                    }}
                >
                    {/* 渲染图片集 */}
                    <Column
                        title="图片"
                        dataIndex="imgs"
                        key="imgs"
                        align="center"
                        render={
                            (_, record) => {
                                if (record.video_url) {
                                    return (
                                        <Player
                                            playsInline
                                            src={record.video_url}
                                            className='player'
                                        >
                                            <BigPlayButton position="center" />
                                            <ControlBar autoHide={false}>
                                                <ForwardControl seconds={5} order={3.1} />
                                                <ReplayControl seconds={5} order={1.1} />
                                                <PlayToggle />
                                                <CurrentTimeDisplay order={4.1} />
                                                <TimeDivider order={4.2} />
                                                <PlaybackRateMenuButton rates={[2, 1.5, 1, 0.5]} order={7.1} />
                                                <VolumeMenuButton />
                                            </ControlBar>
                                        </Player>
                                    )
                                } else {
                                    return (
                                        <Image.PreviewGroup
                                            items={record.imgs}>
                                            <Image width={200} src={record.imgs[0]} />
                                        </Image.PreviewGroup>
                                    )
                                }
                            }
                        }
                    />
                    <Column
                        title="标题"
                        dataIndex="title"
                        key="title"
                        align="center"
                        width={'18%'}
                        filterDropdown={({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
                            <div
                                style={{
                                    padding: 8,
                                }}
                                onKeyDown={(e) => e.stopPropagation()}
                            >
                                <Input
                                    ref={searchInput}
                                    placeholder={`搜索标题`}
                                    value={selectedKeys[0]}
                                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                                    onPressEnter={() => handleSearch(selectedKeys, confirm, 'title')}
                                    style={{
                                        marginBottom: 8,
                                        display: 'block',
                                    }}
                                />
                                <Space>
                                    <Button
                                        type="primary"
                                        onClick={() => handleSearch(selectedKeys, confirm, 'title')}
                                        icon={<SearchOutlined />}
                                        size="small"
                                        style={{
                                            width: 90,
                                        }}
                                    >
                                        搜索
                                    </Button>
                                    <Button
                                        onClick={() => clearFilters && handleReset(clearFilters)}
                                        size="small"
                                        style={{
                                            width: 90,
                                        }}
                                    >
                                        重置
                                    </Button>
                                    <Button
                                        type="link"
                                        size="small"
                                        onClick={() => {
                                            confirm({
                                                closeDropdown: false,
                                            });
                                            setSearchText(selectedKeys[0]);
                                            setSearchedColumn('title');
                                        }}
                                    >
                                        过滤
                                    </Button>
                                    <Button
                                        type="link"
                                        size="small"
                                        onClick={() => {
                                            close();
                                        }}
                                    >
                                        关闭
                                    </Button>
                                </Space>
                            </div>
                        )}
                        filterIcon={(filtered) => (
                            <SearchOutlined
                                style={{
                                    color: filtered ? '#1677ff' : undefined,
                                }}
                            />
                        )}
                        onFilter={(value, record) =>
                            record['title'].toString().toLowerCase().includes(value.toLowerCase())}
                        onFilterDropdownOpenChange={(visible) => {
                            if (visible) {
                                setTimeout(() => searchInput.current?.select(), 100);
                            }
                        }}
                        render={(_, record) => {
                            return searchedColumn === 'title' ? (
                                <h3>
                                    <Highlighter
                                        highlightStyle={{
                                            backgroundColor: '#ffc069',
                                            padding: 0,
                                        }}
                                        searchWords={[searchText]}
                                        autoEscape
                                        textToHighlight={record.title ? record.title.toString() : ''}
                                    /></h3>
                            ) : (
                                <h3>{record.title}</h3>
                            )
                        }}
                    />
                    <Column
                        title="文案"
                        dataIndex="content"
                        key="content"
                        align="center"
                        filterDropdown={({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
                            <div
                                style={{
                                    padding: 8,
                                }}
                                onKeyDown={(e) => e.stopPropagation()}
                            >
                                <Input
                                    ref={searchInput}
                                    placeholder={`搜索文案`}
                                    value={selectedKeys[0]}
                                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                                    onPressEnter={() => handleSearch(selectedKeys, confirm, 'content')}
                                    style={{
                                        marginBottom: 8,
                                        display: 'block',
                                    }}
                                />
                                <Space>
                                    <Button
                                        type="primary"
                                        onClick={() => handleSearch(selectedKeys, confirm, 'content')}
                                        icon={<SearchOutlined />}
                                        size="small"
                                        style={{
                                            width: 90,
                                        }}
                                    >
                                        搜索
                                    </Button>
                                    <Button
                                        onClick={() => clearFilters && handleReset(clearFilters)}
                                        size="small"
                                        style={{
                                            width: 90,
                                        }}
                                    >
                                        重置
                                    </Button>
                                    <Button
                                        type="link"
                                        size="small"
                                        onClick={() => {
                                            confirm({
                                                closeDropdown: false,
                                            });
                                            setSearchText(selectedKeys[0]);
                                            setSearchedColumn('content');
                                        }}
                                    >
                                        过滤
                                    </Button>
                                    <Button
                                        type="link"
                                        size="small"
                                        onClick={() => {
                                            close();
                                        }}
                                    >
                                        关闭
                                    </Button>
                                </Space>
                            </div>
                        )}
                        filterIcon={(filtered) => (
                            <SearchOutlined
                                style={{
                                    color: filtered ? '#1677ff' : undefined,
                                }}
                            />
                        )}
                        onFilter={(value, record) =>
                            record['content'].toString().toLowerCase().includes(value.toLowerCase())}
                        onFilterDropdownOpenChange={(visible) => {
                            if (visible) {
                                setTimeout(() => searchInput.current?.select(), 100);
                            }
                        }}
                        render={(_, record) => {
                            return searchedColumn === 'content' ? (
                                <div className="richTextContainer" onClick={() => showAllContent(record.content)}>
                                    <div dangerouslySetInnerHTML={{ __html: highlightRichText(record.content, searchText) }} />
                                </div>
                            ) : (
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
                        width={'10%'}
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
                        width={'16%'}
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
            </WaterMark>
        </>
    )
}

export default ReviewContent