import React from "react";
import ReactApexChart from "react-apexcharts";

export function Meter({ param, label, color1, color2 }) {
  var options = {
    chart: {
      type: 'radialBar',
      offsetY: -20,
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -150,
        endAngle: 150,
        track: {
          background: ["#efefef", "aa6666", "11bb43"],
          strokeWidth: '97%',
          margin: 5, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: '#999',
            opacity: 1,
            blur: 2
          }
        },
        dataLabels: {
          name: {
            show: true,
            color: '#2774AE',
            fontSize: '2em',
            offsetY: 30
          },
          value: {
            offsetY: -25,
            fontSize: '2em',
            fontWeight: 'bold',
            color: '',
            formatter: function (val) {
              return val
            }
          }
        }
      }
    },
    grid: {
      padding: {
        top: -10
      }
    },
    fill: {
      type: 'gradient',
      colors: [color1],
      gradient: {
        shade: 'dark',
        shadeIntensity: 0.5,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        gradientToColors: [color2],
        stops: [0, 100],
      },
    },
    labels: [label],
  }

  return (
    <div>
      <div>
        <ReactApexChart options={options} series={[param]} type="radialBar" />
      </div>
      <div></div>
    </div >
  )

}



