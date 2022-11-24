import React from 'react';
import Chart from 'react-apexcharts';
import {Grid, Typography} from '@mui/material';

function PieceCount(props) {

    const series = [
        {
            name: 'part_program1',
            data: props.data[0],
        },
        {
            name: 'part_program2',
            data: props.data[1]
        }
    ];

    const options = {
        chart: {
            animations: {
                enabled: false,
            },
        },
        stroke: {
            curve: 'smooth',
            width: [3,3],
        },
        title: {
            text: 'piece count ' + props.machine,
        },
        xaxis: {
            type: 'datetime'
        },
        yaxis: [
            {
                seriesName: 'part_program1'
            },
            {
                seriesName: 'part_program2'

            }        ],
        tooltip: {
            x: {
                show: true,
                format: 'H:m',
            },
        }
    };

    const series_cumulative = [{
        name: 'total items',
        data: props.total_items,
    }];

    const options_cumulative = {
        title: {
            text: 'total items ' + props.machine + 'last ' + props.time_range + ' hours',
        },
        chart: {
            height: 300,
            type: 'bar',
        },
        xaxis: {
            categories: ['porgram1', 'program2']
        },
        yaxis: {
            title: {
                text: 'number of items'
            }
        }
    };

    return(
            <Grid container rowSpacing={3.5} columnSpacing={2.75}>
                <Grid item xs={8}>
                    <Chart series={series} options={options} height={300}/>
                </Grid>
                <Grid item xs={4}>
                    <Chart series={series_cumulative} options={options_cumulative} type={'bar'} height={300}/>
                </Grid>
            </Grid>
    );
}

export default PieceCount;