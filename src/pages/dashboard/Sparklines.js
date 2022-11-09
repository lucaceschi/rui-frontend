import PropTypes from 'prop-types';
import React from 'react';
import { useState, useEffect} from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Chart from 'react-apexcharts';
// third-party
import ReactApexChart from 'react-apexcharts';

/*class SLChart extends React.Component {
        constructor(props) {
          super(props);
          console.log(this.props.data + 'ciao');
          this.state = {

            series: [{
              name: 'energy usage',
              data: props.data
            }],
            options: {
              chart: {
                type: 'area',
                height: 160,
                sparkline: {
                  enabled: true
                },
              },
              labels: [...Array(6).keys()].map(n => `2018-09-0${n+1}`),
              stroke: {
                curve: 'straight'
              },
              fill: {
                opacity: 0.3,
              },
              yaxis: {
                min: 0
              },
              colors: ['#DCE6EC'],
              title: {
                text: '$424,652',
                offsetX: 0,
                style: {
                  fontSize: '24px',
                }
              },
              subtitle: {
                text: 'Sales',
                offsetX: 0,
                style: {
                  fontSize: '14px',
                }
              }
            },

            seriesSpark2: [{
              data: [292, 383, 489, 483, 4894, 339]
            }],
            optionsSpark2: {
              chart: {
                type: 'area',
                height: 160,
                sparkline: {
                  enabled: true
                },
              },
              labels: [...Array(6).keys()].map(n => `2018-09-0${n+1}`),
              stroke: {
                curve: 'straight'
              },
              fill: {
                opacity: 0.3,
              },
              yaxis: {
                min: 0
              },
              colors: ['#DCE6EC'],
              title: {
                text: '$235,312',
                offsetX: 0,
                style: {
                  fontSize: '24px',
                }
              },
              subtitle: {
                text: 'Expenses',
                offsetX: 0,
                style: {
                  fontSize: '14px',
                }
              }
            },

            seriesSpark3: [{
              data: [292, 383, 489, 483, 4894, 339]
            }],
            optionsSpark3: {
              chart: {
                type: 'area',
                height: 160,
                sparkline: {
                  enabled: true
                },
              },
              labels: [...Array(6).keys()].map(n => `2018-09-0${n+1}`),
              stroke: {
                curve: 'straight'
              },
              fill: {
                opacity: 0.3
              },
              xaxis: {
                crosshairs: {
                  width: 1
                },
              },
              yaxis: {
                min: 0
              },
              title: {
                text: '$135,965',
                offsetX: 0,
                style: {
                  fontSize: '24px',
                }
              },
              subtitle: {
                text: 'Profits',
                offsetX: 0,
                style: {
                  fontSize: '14px',
                }
              }
            },
          };
        }

        render(){
          return(
              <div>
                <ReactApexChart options={this.state.options} series={this.state.series} type={'area'} height={160}/>
              </div>
          );
        }
}*/

function SLChart(props){
  const series = [
    {
      name: props.series_type,
      data: props.data
    }
  ];

  const options = {
    chart: {
      type: 'area',
      height: 160,
      sparkline: {
        enabled: true
      },
    },
    stroke: {
      curve: 'straight'
    },
    fill: {
      opacity: 0.3,
    },
    yaxis: {
      min: 0
    },
    colors: ['#DCE6EC'],
    title: {
      text: props.data[props.data.length - 1],
      offsetX: 0,
      style: {
        fontSize: '24px',
      }
    },
    subtitle: {
      text: props.series_type,
      offsetX: 0,
      style: {
        fontSize: '14px',
      }
    }
  };

  return <div>
    <div>
      <Chart options={options} series={series} type={'area'} height={160}/>
    </div>
  </div>
}


export default SLChart;
