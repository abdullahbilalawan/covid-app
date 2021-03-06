import React,{ useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import numeral from 'numeral';


const options = {
    legend: {
      display: true,
    },
    elements: {
      point: {
        radius: 2,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };





export default function LineGraph() {
    const [data, setData] = useState([{}])


    const buildChartData = (data, casesType='cases') => {
        const chartData = [];
        let lastDataPoint;
        for(let date in data.cases) {
            if (lastDataPoint){
                const newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint
                }
                chartData.push(newDataPoint)
            }
            lastDataPoint = data[casesType][date];
        }
        return chartData;

    }






    useEffect(() => {

        const fetchData = async() =>{
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=100')
            .then(response => response.json())
            .then(data => {
                const chartData = buildChartData(data);
                setData(chartData)

            })

        }
        fetchData()

        
        


       
        
    },[])

    

    return (
        <div>
            <Line data={{
                datasets: [{
                    data: data,
                    backgroundColor: "rgba(200,255,255,0.)",
                    borderColor: "#CC1034"


                }]
            }}
            options={options} />
        </div>
    )
}
