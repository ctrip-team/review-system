import React from 'react'

import EChartsReact from 'echarts-for-react'

function Home() {
    const options = {
        title: {
            text: '首页可以尝试做一些图表'
        },
        tooltip: {},
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
            {
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
    }


    return (
        <EChartsReact option={options} style={{ height: '400px' }} />
    )
}

export default Home