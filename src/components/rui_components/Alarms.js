import React from 'react';
import {useState, useEffect} from 'react';
import Chart from 'react-apexcharts';
import {Button, Grid, Typography} from '@mui/material';

function Alarms(props) {
    let series = [{
        name: 'alarm',
        data: props.data,
    }];

    let options = {
        title: {
            text: 'alarms ' + props.machine,
        },
        chart: {
            type: 'rangeBar',
            height: 300,
        },
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
        xaxis: {
            type: 'datetime',
            min: props.min,
            max: props.max,
        },
        tooltip: {
            x: {
                show: true,
                format: 'H m s',
            },
        },
    };

    let series_cumulative = [{
        name: 'seconds in alarm',
        data: props.cumulative_data,
    }];

    let options_cumulative = {
        title: {
            text: 'alarms ' + props.machine + ' last '  + props.time_range + ' hours',
        },
        chart: {
            height: 300,
            type: 'bar',
        },
        xaxis: {
            categories: ['alarm1', 'alarm2', 'alarm3', 'alarm4'],
        },
        yaxis: {
            title: {
              text: 'Time in alarm (secs)',
            },
        },
    };

    return(
        <Grid container rowSpacing={3.5} columnSpacing={2.75}>
            <Grid item xs={8}>
                <Chart series={series} options={options} type={'rangeBar'} height={300}/>
            </Grid>
            <Grid item xs={4}>
                <Chart series={series_cumulative} options={options_cumulative} type={'bar'} height={300}/>
            </Grid>
        </Grid>
    );
}

export default Alarms;