import {
    useState
} from 'react';

import {
    Card,
    CardContent,
    Grid,
    Stack,
    Typography
} from '@mui/material';

import {
    SettingOutlined,
    LoadingOutlined
} from '@ant-design/icons';

import DateSelection from './DateSelection';
import MachineChartSelector from './MachineChartSelector';
import PowerChart from './PowerChart';
import StatusCharts from './StatusCharts';
import Loader from 'components/Loader';

// ======================================================================

function DataHistory() {

    const [dateSpan, setDateSpan] = useState([null, null]);

    const [selPower, setSelPower] = useState({
        'powerMin': false,
        'powerMax': false,
        'powerAvg': false,
        'powerPred': false
    });

    const [selStatus, setSelStatus] = useState({
        'activity': false
    });

    const [isMachineLoading, setMachineLoading] = useState(false);

    const atLeastOneSel = () => {
        return (selPower['powerMin'] || selPower['powerMax'] || selPower['powerAvg'] || selPower['powerPred'] ||
                selStatus['activity']);
    };


    return (

        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={9} sx={{ mb: -2.25 }}>
                {atLeastOneSel() && dateSpan[0] !== null && dateSpan[1] !== null &&
                    <Card>
                        <CardContent>
                            <Typography variant="overline" gutterBottom>
                                { isMachineLoading && <Loader/> }
                                { isMachineLoading? 
                                    <LoadingOutlined style={{'verticalAlign':'0.05em', 'margin': '0 6px 0 0'}}/>
                                :
                                    <SettingOutlined style={{'verticalAlign':'0.05em', 'margin': '0 6px 0 0'}}/>
                                }
                                Machine data: P01
                            </Typography>
                            <Stack spacing={2}>
                                { (selPower['powerMin'] || selPower['powerMax'] || selPower['powerAvg'] || selPower['powerPred']) &&
                                    <PowerChart name='P01' dateSpan={dateSpan} selPower={selPower} setMachineLoading={setMachineLoading}/>
                                }
                                { (selStatus['activity']) &&
                                    <StatusCharts name='P01' dateSpan={dateSpan} selStatus={selStatus} setMachineLoading={setMachineLoading}/>
                                }
                            </Stack>
                        </CardContent>
                    </Card>
                }
            </Grid>
            <Grid item xs={3} sx={{ mb: -2.25 }}>
                <DateSelection dateSpanSetter={setDateSpan} />
                <MachineChartSelector
                    name='P01'
                    pps={['A', 'B', 'C']}
                    selPower={selPower} setSelPower={setSelPower}
                    selStatus={selStatus} setSelStatus={setSelStatus}
                />
            </Grid>
        </Grid>

    );

}


export default DataHistory;