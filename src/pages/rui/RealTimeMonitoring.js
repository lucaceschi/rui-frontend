// material-ui
import { Button, Fade, Grid, Menu, MenuItem, Typography } from '@mui/material';
import {styled, makeStyles} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
// project import
import MachineRealTime from "../../components/rui_components/MachineRealTime";

import { useState, useEffect } from 'react';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function RealTimeMonitoring() {
    const [anchor_el, setAnchorEl] = useState(null);
    const [machine, setMachine] = useState('machine 1');
    const open = Boolean(anchor_el);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (e) => {
        setAnchorEl(null);
        setMachine(e.currentTarget.firstChild.data);
    };

    return (
        <Grid container rowSpacing={3.5} columnSpacing={2.75}>
            <Grid item xs={12}>
                <div>
                    <Button
                        id="fade-button"
                        aria-controls={open ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        Choose machine
                    </Button>
                    <Menu
                        id="fade-menu"
                        MenuListProps={{
                            'aria-labelledby': 'fade-button',
                        }}
                        anchorEl={anchor_el}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                    >
                        <MenuItem onClick={handleSelect}>machine 1</MenuItem>
                        <MenuItem onClick={handleSelect}>machine 2</MenuItem>
                        <MenuItem onClick={handleSelect}>machine 3</MenuItem>
                    </Menu>
                </div>
            </Grid>
            <Grid item xs={12}>
                <Item>
                    <MachineRealTime machine={machine}/>
                </Item>
            </Grid>
        </Grid>

    );
}

export default RealTimeMonitoring;

