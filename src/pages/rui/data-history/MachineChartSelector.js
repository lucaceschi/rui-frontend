import {
    useState,
    Fragment
} from 'react';

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Checkbox,
    Divider,
    FormControlLabel,
    Stack,
    Typography
} from '@mui/material';

import {
    DownOutlined,
    SettingOutlined
} from '@ant-design/icons';

import Android12Switch from "./Android12Switch";

// ======================================================================


function MachineChartSelector(props) {

    const selPower = props.selPower;
    const setSelPower = props.setSelPower;
    const selStatus = props.selStatus;
    const setSelStatus = props.setSelStatus;

    const [globalSel, setGlobalSel] = useState([false, false]);

    const onChangeGlobal = (event) => {
        const val = event.target.checked;
        setGlobalSel([val, false]);
        setSelPower({
            'powerMin': val,
            'powerMax': val,
            'powerAvg': val,
            'energyCost': val
        });
        setSelStatus({
            'activity': val
        })
    }

    const handlePowerMin = (event) => {
        setSelPower({...selPower, 'powerMin': event.target.checked});
        const checkAll = (event.target.checked &&
                          selPower['powerMax'] &&
                          selPower['powerAvg'] &&
                          selPower['energyCost']
                          );
        
        const checkInd =  (!checkAll && (
                           event.target.checked ||
                           selPower['powerMax'] ||
                           selPower['powerAvg'] ||
                           selPower['energyCost']));

        setGlobalSel([checkAll, checkInd]);
    };

    const handlePowerMax = (event) => {
        setSelPower({...selPower, 'powerMax': event.target.checked});
        const checkAll = (event.target.checked &&
                          selPower['powerMin'] &&
                          selPower['powerAvg'] &&
                          selPower['energyCost']
                          );
        
        const checkInd =  (!checkAll && (
                           event.target.checked ||
                           selPower['powerMin'] ||
                           selPower['powerAvg'] ||
                           selPower['energyCost']));

        setGlobalSel([checkAll, checkInd]);
    };

    const handlePowerAvg = (event) => {
        setSelPower({...selPower, 'powerAvg': event.target.checked});
        const checkAll = (event.target.checked &&
                          selPower['powerMin'] &&
                          selPower['powerMax'] &&
                          selPower['energyCost']
                          );
        
        const checkInd =  (!checkAll && (
                           event.target.checked ||
                           selPower['powerMin'] ||
                           selPower['powerMax'] ||
                           selPower['energyCost']));

        setGlobalSel([checkAll, checkInd]);
    };

    const handleEnergyCost = (event) => {
        setSelPower({...selPower, 'energyCost': event.target.checked});
        const checkAll = (event.target.checked &&
                          selPower['powerMin'] &&
                          selPower['powerMax'] &&
                          selPower['powerAvg']);
        
        const checkInd =  (!checkAll && (
                           event.target.checked ||
                           selPower['powerMin'] ||
                           selPower['powerMax'] ||
                           selPower['powerAvg']));

        setGlobalSel([checkAll, checkInd]);
    };

    // =======================================================================

    const handleActivity = (event) => {
        setSelStatus({...selStatus, 'activity': event.target.checked});
        const checkAll = (event.target.checked &&
                          selPower['powerMin'] &&
                          selPower['powerMax'] &&
                          selPower['powerAvg'] &&
                          selPower['energyCost']
                          );
        
        const checkInd =  (!checkAll && (
                           event.target.checked ||
                           selPower['powerMin'] ||
                           selPower['powerMax'] ||
                           selPower['powerAvg'] ||
                           selPower['energyCost']));

        setGlobalSel([checkAll, checkInd]);
    };

    /*const handleActivity   = (event) => { setSel({...sel, 'activity': event.target.checked}); };
    const handleAlarms     = (event) => { setSel({...sel, 'alarms': event.target.checked}); };
    const handlePieceTime  = (event) => { setSel({...sel, 'pieceTime': (event.target.checked? props.pps : []) }); };
    const handlePieceCount = (event) => { setSel({...sel, 'pieceCount': (event.target.checked? props.pps : []) }); };

    console.log(sel);
    console.log(selPower);*/

    return (
        <Accordion defaultExpanded={true}>
            <AccordionSummary
            expandIcon={<DownOutlined />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
            >
                <Stack direction="row" alignItems="center" spacing={1}>
                    <FormControlLabel
                    label={<Fragment><SettingOutlined style={{'verticalAlign':'0.1em', 'padding': '0 6px 0 0'}}/>Machine data: {props.name}</Fragment>}
                    control={
                        <Checkbox
                        checked={globalSel[0]}
                        indeterminate={globalSel[1]}
                        onChange={onChangeGlobal}
                        size='small'
                        style={{'padding':'0px 14px 0px 8px'}}
                        />}
                    />
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                <Stack spacing={2}>
                    {/*
                    <div><Box sx={{ display: 'flex', flexDirection: 'column', ml: 2, mr: 2}}>
                        <Divider textAlign="center" variant='middle'><Typography variant='overline'>Production</Typography></Divider>
                        <FormControlLabel
                            label="Cycle time"
                            control={<Android12Switch checked={sel['pieceTime'].length > 0} onChange={handlePieceTime} />}
                        />
                        <FormControlLabel
                            label="Produced items"
                            control={<Android12Switch checked={sel['pieceCount'].length > 0} onChange={handlePieceCount} />}
                        />
                    </Box></div>*/}
                    <div><Box sx={{ display: 'flex', flexDirection: 'column', ml: 2, mr: 2 }}>
                        <Divider textAlign="center" variant='middle'><Typography variant='overline'>Energy</Typography></Divider>
                        <FormControlLabel
                            label="Min Power Consumption"
                            control={<Android12Switch checked={selPower['powerMin']} onChange={handlePowerMin} />}
                        />
                        <FormControlLabel
                            label="Max Power Consumption"
                            control={<Android12Switch checked={selPower['powerMax']} onChange={handlePowerMax} />}
                        />
                        <FormControlLabel
                            label="Average Power Consumption"
                            control={<Android12Switch checked={selPower['powerAvg']} onChange={handlePowerAvg} />}
                        />
                        <FormControlLabel
                            label="Average Energy Costs"
                            control={<Android12Switch checked={selPower['energyCost']} onChange={handleEnergyCost} />}
                        />
                    </Box></div>

                    <div><Box sx={{ display: 'flex', flexDirection: 'column', ml: 2, mr: 2}}>
                        <Divider textAlign="center" variant='middle'><Typography variant='overline'>Status</Typography></Divider>
                        <FormControlLabel
                            label="Activity"
                            control={<Android12Switch checked={selStatus['activity']} onChange={handleActivity} />}
                        />
                        {/*<FormControlLabel
                            label="Alarms"
                            control={<Android12Switch checked={sel['alarms']} onChange={handleAlarms} />}
                        />*/}
                    </Box></div>
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
}

export default MachineChartSelector;