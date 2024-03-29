import React from 'react'
import { Bar } from '@ant-design/plots';

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


    return (
        <>
            <h1>欢迎回来，xxx</h1>
            <Bar {...config} />
        </>
    )
}

export default Home