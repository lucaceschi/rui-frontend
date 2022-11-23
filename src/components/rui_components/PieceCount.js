import React from 'react';
import Chart from 'react-apexcharts';
import {Grid, Typography} from '@mui/material';

function PieceCount(props) {

    const series = [
        {
            name: 'piece count',
            data: props.data,
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
            width: [4,4,9],
        },
        title: {
            text: 'piece count ' + props.machine,
        },
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            min: 0,
            tickAmount: 4,
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
                    <Chart series={series} options={options} height={300}/>
                </Grid>
                <Grid item xs={2}>
                    <Typography>
                        Items Produced: <br/> {props.items}
                    </Typography>
                </Grid>
            </Grid>
    );
}

export default PieceCount;