import React from 'react';
import { useState, useEffect} from 'react';
import Chart from 'react-apexcharts';
import {Grid, Typography} from '@mui/material';

function EnergyActivityGraph(props) {

    const series = [
        {
            name: 'energy_usage',
            type: 'line',
            data: props.data.chart_energy
        },
        {
            name: 'activity',
            type: 'line',
            data: props.data.chart_activity
        }
    ];

    const options = {
            chart: {
                height: 150,
                type: 'line',
                stacked: false,
                animations: {
                    enabled: false,
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: [1, 1, 4]
            },
            title: {
                text: 'Energy usage and activity' + props.machine,
                align: 'left',
                offsetX: 0
            },
            xaxis: {
                type: 'datetime'

            },
            yaxis: [
                {
                    seriesName: 'energy_usage',
                    title: {
                        text: 'energy usage',
                        style: {
                            color: '#008FFB',
                        },
                    },
                    axisBorder: {
                        show: true,
                        color: '#008FFB',
                        width: 0
                    },
                },
                {
                    tickAmount: 4,
                    opposite: true,
                    min: 0,
                    max: 100,
                    axisBorder: {
                        show: true,
                        color: '#00E396',
                        width: 0
                    },
                    title: {
                        text: 'activity (%)',
                        style: {
                            color: '#00E396',
                        },
                    },

                    seriesName: 'activity'
                }
            ],
            legend: {
                horizontalAlign: 'left',
                offsetX: 40
            },
            tooltip: {
                x: {
                    show: true,
                    format: 'H:m',
                },
            }
        };

    return(
        <Grid container rowSpacing={3.5} columnSpacing={2.75}>
            <Grid item xs={10}>
                <Chart series={series} options={options} type={'line'} height={300}/>
            </Grid>
            <Grid item xs={2}>
                <Typography>
                    delta
                </Typography>
            </Grid>
        </Grid>

    );
}

export default EnergyActivityGraph;