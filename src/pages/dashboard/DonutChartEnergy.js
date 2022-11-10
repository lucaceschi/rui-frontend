import PropTypes from 'prop-types';
import React from 'react';
import { useState, useEffect} from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Chart from 'react-apexcharts';

function DonutChart(props){
    const series = props.data;
    const options = {
        chart: {
            height: 250
        },
        labels: props.machines,
        dataLabels: {
            dropShadow: {
                blur: 3,
                opacity: 0.8
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        total: {
                            showAlways: true,
                            show: true
                        }
                    }
                }
            }
        },
        title: {
            text: 'total energy consumption'
        }
    }

    return <div>
        <div>
            <Chart options={options} series={series} type={'donut'}/>
        </div>
    </div>
}


export default DonutChart;
