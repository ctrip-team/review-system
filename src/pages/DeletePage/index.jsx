import React, { useState, useEffect, useRef } from 'react'
import { Table, Space, Tag, Image, Modal, Input, message, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getDeleteTravelsAPI, recoverTravelAPI } from '../../apis/travel';
import { useSelector } from 'react-redux';
import { WaterMark } from '@ant-design/pro-components'
import {
    Player,
    ControlBar,
    PlayToggle,
    ReplayControl,
    ForwardControl,
    CurrentTimeDisplay,
    TimeDivider,
    PlaybackRateMenuButton,
    VolumeMenuButton,
    BigPlayButton
} from 'video-react';
import "video-react/dist/video-react.css";
import Highlighter from 'react-highlight-words';
const { Column } = Table;
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
    const { roleInfo } = useSelector(state => state.role)

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

    function highlightRichText(content, keyword) {
        if (!keyword) return content;
        return content.replace(new RegExp(`(${keyword}+)`, 'gi'), (match) => `<mark style="background-color: rgb(255, 192, 105); padding: 0px;">${match}</mark>`);
    }
    return (
        <>
            <WaterMark content={roleInfo.username}>
                <Table
                    bordered={true}
                    dataSource={deleteTravelList}
                    pagination={{ defaultPageSize: 5, showSizeChanger: true, onShowSizeChange, pageSizeOptions: ['5', '10', '20'] }}
                    scroll={{
                        y: 600,
                    }}
                >
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
            </WaterMark>
        </>
    )
}

export default DeletePage