import {
    useEffect,
    useState
} from 'react';

import {
    Skeleton
} from '@mui/material';

import dayjs from 'dayjs';

import ReactApexChart from 'react-apexcharts';

// ======================================================================


function PowerChart(props) {
    const machineName = props.name;
    const dateSpan = props.dateSpan;    
    const selPower = props.selPower;
    

    const [series, setSeries] = useState(null);
    const [options, setOptions] = useState({
        chart: {
            id: 'power',
            group: 'P01',
            animations: {
                enabled: false
            },
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                autoSelected: 'zoom',
                tools: {
                    download: false
                }
            }
        },
        stroke: {
            width: 2
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            showForSingleSeries: true
        },
        title: {
            text: 'Power consumption',
            align: 'center'
        },
        xaxis: {
            type: "datetime",
            tooltip: {
                offsetY: 25
            }
        },
        yaxis: {
            decimalsInFloat: 0,
            /*axisBorder: {
                show: true,
                color: '#775DD0'
            },*/
            /*labels: {
                style: {
                    colors: '#775DD0',
                }
            },*/
            title: {
                text: "Power Consumption (kWh)",
                /*style: {
                    color: '#775DD0',
                }*/
            }
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const setMachineLoading = props.setMachineLoading;

    useEffect(() => {
        var dateStart = dateSpan[0].format('YYYY-MM-DD HH:mm');
        var dateEnd   = dateSpan[1].format('YYYY-MM-DD HH:mm');
        setIsLoading(true);
        setMachineLoading(true);
        fetch('/get_data_range?' + new URLSearchParams({asset: machineName, start_date:dateStart, end_date: dateEnd}))
            .then(res => res = res.json())
            .then(d => {
                const s = [];
                //const colors = [];
                //const dashArray = [];

                if(selPower['powerMin']) {
                    s.push({
                        name: 'Min power',
                        type: 'line',
                        data: d.map(function (currD) {
                            return {
                                x: dayjs(currD['ts']).format(),
                                y: parseFloat(currD['power_min'])
                            }
                        })
                    });
                    //colors.push('#43BCCD');
                    //dashArray.push(5);
                }

                if(selPower['powerMax']) {
                    s.push({
                        name: 'Max power',
                        type: 'line',
                        data: d.map(function (currD) {
                            return {
                                x: dayjs(currD['ts']).format(),
                                y: parseFloat(currD['power_max'])
                            }
                        })
                    });
                    //colors.push('#3f51b5');
                    //dashArray.push(5);
                }

                if(selPower['powerAvg']) {
                    s.push({
                        name: 'Avg power',
                        type: 'line',
                        data: d.map(function (currD) {
                            return {
                                x: dayjs(currD['ts']).format(),
                                y: parseFloat(currD['power_avg'])
                            }
                        })
                    });
                    //colors.push('#775DD0');
                    //dashArray.push(0);
                }

                if(selPower['powerPred']) {
                    s.push({
                        name: 'Predicted avg power',
                        type: 'line',
                        data: d.map(function (currD) {
                            return {
                                x: dayjs(currD['ts']).format(),
                                y: parseFloat(currD['power_avg'])  // TODOOOOOOOOOOOOOOOOOOOOOOOOOOOO
                            }
                        })
                    });
                    //colors.push('#FF4560');
                    //dashArray.push(0);
                }

                setSeries(s);
                //setOptions({...options, 'yaxis':yaxis, 'colors':colors, stroke:{curve:'smooth', width:2, 'dashArray':dashArray }});
                //setOptions({...options, 'yaxis':yaxis, 'colors':colors, stroke:{width:2}});
                setIsLoading(false);
                setMachineLoading(false);
            });
    }, [dateSpan, selPower]);


    if(isLoading)
        return (
            <Skeleton animation="wave" height="100px"/>
        );
    else
        return (
            <ReactApexChart series={series} options={options} type='line' height='400px'/>
        );

    /*return (
        <div>
            <p>from {dateSpan[0] === null ? '' : dateSpan[0].format('DD/MM/YYYY')} to {dateSpan[1] === null ? '' : dateSpan[1].format('DD/MM/YYYY')}</p>
            <Divider/>
            <p>{JSON.stringify(sel)}</p>
            <Divider/>
            <p>{dayjs().format('HH:mm:ss')}</p>
            
        </div>
    );*/
}

export default PowerChart;