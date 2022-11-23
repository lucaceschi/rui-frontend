
import { useState, Fragment } from 'react';
import { Grid,Typography,Card,CardContent,TextField,Box,InputAdornment,Checkbox,FormControlLabel } from '@mui/material';

import ReactApexChart from 'react-apexcharts';

import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { CalendarOutlined, DownOutlined } from '@ant-design/icons';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';


// ==============================|| SAMPLE PAGE ||============================== //

function generateDayWiseTimeSeries(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
  
      series.push([baseval, y]);
      baseval += 86400000;
      i++;
    }
    return series;
  }

function DataHistory() {
    const [series, setSeries] = useState([{
        data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
          min: 10,
          max: 60
        })
    }]);

    const [options, setOptions] = useState({
        chart: {
          id: 'fb',
          group: 'social',
          type: 'line',
          height: 160
        },
        xaxis: {
            labels: {
                show: false
            }
        },
        colors: ['#008FFB']
    });

    const [seriesLine, setSeriesLine] = useState([{
        data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
          min: 10,
          max: 30
        })
    }]);

    const [optionsLine2, setOptionsLine2] = useState({
        chart: {
          id: 'tw',
          group: 'social',
          type: 'line',
          height: 160
        },
        xaxis: {
            labels: {
                show: false
            }
        },
        colors: ['#546E7A']
    });

    // calendar span    
    const [value, setValue] = useState([null, null]);

    // checkboxes
    const [checked, setChecked] = useState([true, true, false, false, false]);

    const handleChange1 = (event) => {
        setChecked([event.target.checked, event.target.checked, event.target.checked, event.target.checked, event.target.checked]);
    };

    const handleChange2 = (event) => {
        setChecked([event.target.checked, checked[1], checked[2], checked[3], checked[4]]);
    };

    const handleChange3 = (event) => {
        setChecked([checked[0], event.target.checked, checked[2], checked[3], checked[4]]);
    };

    const handleChange4 = (event) => {
        setChecked([checked[0], checked[1], event.target.checked, checked[3], checked[4]]);
    };

    const handleChange5 = (event) => {
        setChecked([checked[0], checked[1], checked[2], event.target.checked, checked[4]]);
    };

    const handleChange6 = (event) => {
        setChecked([checked[0], checked[1], checked[2], checked[3], event.target.checked]);
    };
    /*
    const [cycleTime, setCycleTime] = useState([{
        data: []
    }]);

    const [activity, setActivity] = useState([{
        data: []
    }]);

    
    fetch('/get_data_range?' + new URLSearchParams({asset: 'P01', start_date:'2022-10-01 00:00', end_date:'2022-11-01 00:00'})).then(res => res = res.json()).then(data => {
        var cycle_time = [];
        var activity = [];

        for(var i=0; i<data.length; i++) {
            cycle_time[i] = data[i].cycle_time;
            activity[i] = (60 - data[i].idle_time) / 60 * 100;
        }

        setCycleTime([{data: cycle_time}]);
        setActivity([{data: activity}]);

        console.log(cycleTime);
    });*/

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                <Grid item xs={8} sx={{ mb: -2.25 }}>
                    <Card variant="outlined">
                        <CardContent>
                        <div id="wrapper">
                            <div id="chart-line">
                            <ReactApexChart options={options} series={series} type="line" height={300} />
                            </div>
                            <div id="chart-line2">
                            <ReactApexChart options={optionsLine2} series={seriesLine} type="line" height={300} />
                            </div>
                        </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4} sx={{ mb: -2.25 }}>
                    <Card variant="outlined">
                        <CardContent>
                            <Accordion defaultExpanded="true">
                                <AccordionSummary
                                    expandIcon={<DownOutlined />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    >
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        Date span
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <DateRangePicker
                                    calendars={3}
                                    value={value}
                                    onChange={(newValue) => {
                                    setValue(newValue);
                                    }}
                                    renderInput={(startProps, endProps) => (
                                        <Fragment>
                                        <TextField InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                <CalendarOutlined />
                                                </InputAdornment>
                                            ),
                                        }} {...startProps} />
                                        <Box sx={{ mx: 2 }}> to </Box>
                                        <TextField InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                <CalendarOutlined />
                                                </InputAdornment>
                                            ),
                                        }} {...endProps} />
                                        </Fragment>
                                    )}
                                />
                                </AccordionDetails>
                            </Accordion>
                            <Accordion defaultExpanded="true">
                                <AccordionSummary
                                    expandIcon={<DownOutlined />}
                                    aria-controls="panel2bh-content"
                                    id="panel2bh-header"
                                    >
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        Machine Data
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <FormControlLabel
                                        label="Machine 1"
                                        control={
                                            <Checkbox
                                                checked={checked[0] && checked[1]}
                                                indeterminate={checked[0] !== checked[1]}
                                                onChange={handleChange1}
                                            />}
                                    />
                                    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                                        <FormControlLabel
                                            label="Activity"
                                            control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
                                        />
                                        <FormControlLabel
                                            label="Alarms"
                                            control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
                                        />
                                        <FormControlLabel
                                            label="Cycle time"
                                            control={<Checkbox checked={checked[2]} onChange={handleChange4} />}
                                        />
                                        <FormControlLabel
                                            label="Power consumption"
                                            control={<Checkbox checked={checked[3]} onChange={handleChange5} />}
                                        />
                                        <FormControlLabel
                                            label="Produced items"
                                            control={<Checkbox checked={checked[4]} onChange={handleChange6} />}
                                        />
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<DownOutlined />}
                                    aria-controls="panel2bh-content"
                                    id="panel2bh-header"
                                    >
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        Factory Data
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    
                                </AccordionDetails>
                            </Accordion>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </LocalizationProvider>
        
    );
}

export default DataHistory;