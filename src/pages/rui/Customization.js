// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

import { useState, useEffect } from 'react';

import MaterialUIPickers from './MaterialUIPickers';



// ==============================|| SAMPLE PAGE ||============================== //

function Customization() {
    const [currentTime, setCurrentTime] = useState(0);
	
	useEffect(() => {
		fetch('/time').then(res => res.json()).then(data => {
			setCurrentTime(data.time);
		});
	}, []);
    
    return (
        <MaterialUIPickers />
    );
}

export default Customization;
