import React from 'react';
import {useState, useEffect} from 'react';
import {Grid, Typography} from '@mui/material'
import PieceCount from "./PieceCount";
import EnergyActivityGraph from "./EnergyActivityGraph";
import Alarms from "./Alarms";

function MachineRealTime(props) {
    //state variables
    const [time_point, setTimePoint] = useState(1);
    const [chart_energy, setChartEnergy] = useState([]);
    const [chart_activity, setChartActivity] = useState([]);
    const [chart_piece_count, setChartPieceCount] = useState([]);
    const [min_range, setMinRange] = useState(new Date());
    const [chart_alarms, setChartAlarms] = useState([]);
    const [total_items, setTotalItems] = useState(0);
    const [total_alarms, setTotalAlamrs] = useState([[],[],[],[]]);
    const [sum_alarms, setSumAlarms] = useState([0,0,0,0]);

    //function to add the new data in real time
    const update_chart = (chart_data, timestamp ,new_value) => {
        let new_data = [...chart_data, [timestamp, new_value]];
        if(new_data.length === 240){
            new_data.shift();
        }
        //new_data.shift();
        return new_data;
    };
    //to update alarms data that has different format (to be improved)
    const update_alarm = (chart_data, new_value) => {
        let new_data = [...chart_data, new_value];
        return new_data;
    };
    //to update the cumulative alarms count in the last four hours
    const update_total_alarms = (total_alarms, new_value) => {
        let new_data = total_alarms.slice();
        for(let i = 0; i < new_data.length; i++){
            new_data[i].push(new_value[i]);
            if(new_data[i].length === 240){
                new_data[i].shift();
            }
        }
        return new_data;
    };

    const sum_array = (array) => {
        let sum = 0;
        for(let i = 0; i < array.length; i++){
            sum += array[i];
        }
        return sum;
    };

    let asset = 'P01';

    useEffect(() => {
        const interval = setInterval(() => {
            fetch('/get_real_time_data?' + new URLSearchParams({asset:asset, index: time_point})).then(res => res = res.json()).then(data => {
                let idle = 100 - data[0].idle_time;
                let time = Date.parse(data[0].ts);
                setTimePoint(time_point => time_point + 1);
                setChartEnergy(update_chart(chart_energy, time, data[0].power_avg));
                setChartActivity(update_chart(chart_activity, time, idle));
                setChartPieceCount(update_chart(chart_piece_count, time, data[0].items));
                // generate fake alarms data to show something
                let alarms_data = new Array(4).fill(0);
                for(let i = 0; i < alarms_data.length; i++){
                    let choice = Math.floor(Math.random() * 50);
                    if(choice === 1){
                        alarms_data[i] = Math.floor(Math.random() * 60);
                    }
                }
                //handle alarms data
                setMinRange(time);
                for(let i = 0; i < alarms_data.length; i++){
                    if(alarms_data[i] != 0){
                        let new_value = {x: 'alarm ' + (i + 1), y: [time, time + (alarms_data[i]) * 1000]};
                        setChartAlarms(update_alarm(chart_alarms, new_value));
                    }
                }

                let sum = 0;
                for(let i = 0; i < chart_piece_count.length; i++){
                    sum += chart_piece_count[i][1];
                }
                setTotalItems(sum);
                setTotalAlamrs(update_total_alarms(total_alarms, alarms_data));
                let sums = new Array(4).fill(0);
                for(let i = 0; i < sum_alarms.length; i++){
                    sums[i] = sum_array(total_alarms[i]);
                }
                setSumAlarms(sums);
                console.log(sum_alarms);
            });
        }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, [time_point]);

    return(
        <Grid container rowSpacing={3.5} columnSpacing={2.75}>
            <Grid item xs={12}>
                <EnergyActivityGraph machine={props.machine} data={{chart_energy: chart_energy, chart_activity: chart_activity}}/>
            </Grid>
            <Grid item xs={12}>
                <PieceCount machine={props.machine} data={chart_piece_count} items={total_items}/>
            </Grid>
            <Grid item xs={12}>
                <Alarms machine={props.machine} data={chart_alarms} min={min_range - 3600000} max={min_range} cumulative_data={sum_alarms}/>
            </Grid>
        </Grid>
    );
}

export default MachineRealTime;