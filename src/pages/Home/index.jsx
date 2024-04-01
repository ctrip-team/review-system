import React, { useEffect, useState } from 'react'
import { Bar } from '@ant-design/plots';
import { useSelector } from 'react-redux';
import './index.scss'
import { getTopAPI } from '../../apis/role';

function Home() {
    const { isDarkMode } = useSelector(state => state.dark)
    console.log('isDarkMode', isDarkMode);
    const [config, setConfig] = useState({})

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
            console.log(data);
            setConfig({
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
            <h1>欢迎回来，<span className='welcome-username'>{role.roleInfo.username}</span></h1>
            <p className='welcome-word'>“I've never met a strong person with an easy past.”</p>
            <h3>审核量排行榜</h3>
            <Bar {...config} />
        </>
    )
}

export default Home