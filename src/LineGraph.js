import React,{ useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
export default function LineGraph() {
    const [data, setData] = useState([{}])
    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=100')
        .then(response => response.json())
        .then(data => {

        })
    },[])

    const buildChartData = (data, casesType='cases') => {
        const chartData = [];
        let lastDataPoint;
        data.cases.forEach(date => {
            if (lastDataPoint){
                const newDataPoint = {
                    x: date,
                    y: data['cases'][date] - lastDataPoint
                }
                chartData.push(newDataPoint)
            }
            lastDataPoint = data['cases'][date];
        })
        return chartData;

    }

    return (
        <div>
            <Line />
        </div>
    )
}
