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


function StatusCharts(props) {
    const machineName = props.name;
    const dateSpan = props.dateSpan;    
    const selStatus = props.selStatus;
    

    const [series, setSeries] = useState(null);
    const [options, setOptions] = useState({
        chart: {
            id: 'status',
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
            text: 'Activity',
            align: 'center'
        },
        xaxis: {
            type: "datetime",
            tooltip: {
                offsetY: 25
            }
        },
        yaxis: {
            title: {
                text: "Activity (%)",
            },
            min: 0,
            max: 100,
            tickAmount: 4
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

                if(selStatus['activity']) {
                    s.push({
                        name: 'Activity',
                        type: 'line',
                        data: d.map(function (currD) {
                            return {
                                x: dayjs(currD['ts']).format(),
                                y: parseInt((60 - parseInt(currD['idle_time'])) * 100 / 60)
                            }
                        })
                    });
                    //colors.push('#43BCCD');
                    //dashArray.push(5);
                }

                setSeries(s);
                setIsLoading(false);
                setMachineLoading(false);
            });
    }, [dateSpan, selStatus]);


    if(isLoading)
        return (
            <Skeleton animation="wave" height="100px"/>
        );
    else
        return (
            <ReactApexChart series={series} options={options} type='line' height='200px'/>
        );
}

export default StatusCharts;