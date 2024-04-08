import React, { useEffect, useState } from 'react'
import { Bar, Pie } from '@ant-design/plots';
import { useSelector } from 'react-redux';
import './index.scss'
import { getTopAPI } from '../../apis/role';
import { Card, Col, Row, Flex } from 'antd';
import { getTravelInfoAPI } from '../../apis/travel';

function Home() {
    const [barConfig, setBarConfig] = useState({})
    const [pieConfig, setPieConfig] = useState({})
    const [reviewCount, setReviewCount] = useState(0)
    const [statusCounts, setStatusCounts] = useState({})
    const { isDarkMode } = useSelector(state => state.dark)
    const { roleInfo } = useSelector(state => state.role)

    // 饼图及其他
    useEffect(() => {
        async function getInfo() {
            const res = await getTravelInfoAPI(roleInfo.role_id)
            setReviewCount(res.review_count)
            setStatusCounts(res.status_counts)
            const data = [
                { type: '待审核', value: parseInt(res.status_counts.status0) },
                { type: '审核通过', value: parseInt(res.status_counts.status2) },
                { type: '未通过', value: parseInt(res.status_counts.status1) },
                { type: '已删除', value: parseInt(res.status_counts.status4) },
            ]
            setPieConfig({
                data,
                height: 200,
                width: 400,
                radius: 0.8,
                angleField: 'value',
                colorField: 'type',
                label: {
                    text: (d) => `${d.type}\n ${d.value}`,
                    position: 'spider',
                },
                legend: false,
                theme: isDarkMode ? "classicDark" : "classic",
            })
        }
        getInfo()
    }, [isDarkMode])

    // 排行榜
    useEffect(() => {
        async function getTop() {
            const res = await getTopAPI()
            const data = []
            res.tops.forEach(item => {
                data.push({
                    '用户名': item.username,
                    '审核量': item.review_count
                })
            });
            setBarConfig({
                data,
                height: 200,
                width: 400,
                xField: '用户名',
                yField: '审核量',
                axis: {
                    x: {
                        tick: false,
                    },
                    y: {
                        grid: false,
                        tick: false,
                        label: false,
                    },
                },
                theme: isDarkMode ? "classicDark" : "classic"
            })

        }

        getTop()
    }, [isDarkMode])

    const role = useSelector(state => state.role)
    return (
        <>
            <Flex gap="large" vertical>
                <Card bordered>
                    <h1>🌻欢迎回来，<span className='welcome-username'>{role.roleInfo.username}</span></h1>
                    <p className='welcome-word'>“I've never met a strong person with an easy past.”</p>
                </Card>

                <Row gutter={16}>
                    <Col span={8}>
                        <Card title="个人审核量" bordered>
                            <span className='show-number'>{reviewCount}</span>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="待审核量" bordered>
                            <span className='show-number'>{statusCounts.status0}</span>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="审核完成量" bordered>
                            <span className='show-number'>{statusCounts.status2}</span>
                        </Card>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Card title="审核量排行榜" bordered>
                            <div className='canvas-display'>
                                <Bar {...barConfig} />

                            </div>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="审核数据" bordered >
                            <div className='canvas-display'>
                                <Pie {...pieConfig} />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Flex>
        </>
    )
}

export default Home