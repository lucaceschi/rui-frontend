import { useState, useEffect } from 'react';
import SLChart from './Sparklines';
import DonutChart from './DonutChartEnergy';
import {styled, makeStyles} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
// material-ui
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Grid,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Stack,
    TextField,
    Typography
} from '@mui/material';

// project import
import OrdersTable from './OrdersTable';
import IncomeAreaChart from './IncomeAreaChart';
import MonthlyBarChart from './MonthlyBarChart';
import ReportAreaChart from './ReportAreaChart';
import SalesColumnChart from './SalesColumnChart';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// assets
import { GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';

// avatar style
const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem'
};

// action style
const actionSX = {
    mt: 0.75,
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',
    transform: 'none'
};

// sales report status
const status = [
    {
        value: 'today',
        label: 'Today'
    },
    {
        value: 'month',
        label: 'This Month'
    },
    {
        value: 'year',
        label: 'This Year'
    }
];


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    const [value, setValue] = useState('today');
    const [slot, setSlot] = useState('week');
    const [chart_energy, setChartEnergy] = useState([0,0,0,0]);
    const [chart_idle, setChartIdle] = useState([0,0,0,0]);
    const [chart_piece_count, setChartPieceCount] = useState([0,0,0,0]);
    const[time_point, setTimePoint] = useState(1);
    const [donut_chart_data, setDonutChartData] = useState([10,10,10]);

    const update_chart = (chart_data, new_value)=>{
        let new_data = [...chart_data, new_value];
        new_data.shift();
        return new_data;
    };

    const update_donut_chart = (new_donut_data)=>{
        setDonutChartData(new_donut_data);
    };

    const generate_donut_data = (data)=>{
        var max = data * 1.2;
        var min = data * 0.8;
        var array = [];
        for(let i = 0; i < 4; i++) {
            var new_data = Math.random() * (max - min) + min;
            array.push(~~new_data);
        }
        return array;
    };

    useEffect(() => {
        var asset= 'P01';
        const interval = setInterval(() => {
            fetch('/get_real_time_data?' + new URLSearchParams({asset: asset, index: time_point})).then(res => res = res.json()).then(data => {
                var energy_avg = data[0].power_avg;
                var idle = 100 - data[0].idle_time;
                var piece_count = data[0].items;
                setTimePoint(time_point + 1);
                setChartEnergy(update_chart(chart_energy, energy_avg));
                setChartPieceCount(update_chart(chart_piece_count, piece_count));
                setChartIdle(update_chart(chart_idle, idle));
                var donut_data = generate_donut_data(energy_avg);
                update_donut_chart(donut_data);
            });
        }, 1000);
        return ()=>{
            clearInterval(interval);
        }
    }, [time_point]);

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Dashboard</Typography>
            </Grid>
            <Grid item xs={4} sx={{ mb: -2.25 }}>
                <Item>
                    <SLChart data={chart_energy} series_type={'Energy Usage'}/>
                </Item>
            </Grid>
            <Grid item xs={4} sx={{ mb: -2.25 }}>
                <Item>
                    <SLChart data={chart_idle} series_type={'Activity %'}/>
                </Item>
            </Grid>
            <Grid item xs={4} sx={{ mb: -2.25 }}>
                <Item>
                    <SLChart data={chart_piece_count} series_type={'Piece Count'}/>
                </Item>
            </Grid>
            <Grid item xs={4} sx={{ mb: -2.25 }}>
                <Item>
                    <DonutChart data={donut_chart_data} machines={['machine1', 'machine2', 'machine3', 'machine4']}/>
                </Item>
            </Grid>

        </Grid>
    );
};

export default DashboardDefault;
