import React from 'react'
import { Bar } from '@ant-design/plots';
import { useSelector } from 'react-redux';

function Home() {
    const data = [
        { rank: 'test1', value: 54 },
        { rank: 'test2', value: 40 },
        { rank: 'test3', value: 35 },
        { rank: 'test4', value: 20 },
        { rank: 'test5', value: 15 },
    ];

    const config = {
        data,
        title: '审核量排行榜',
        xField: 'rank',
        yField: 'value',
        // shapeField: 'hollow',
        colorField: 'rank',
    };
    const role = useSelector(state => state.role)
    return (
        <>
            <h1>欢迎回来，{role.roleInfo.username}</h1>
            <Bar {...config} />
        </>
    )
}

export default Home