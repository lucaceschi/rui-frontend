// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

import { useState, useEffect } from 'react';

// ==============================|| SAMPLE PAGE ||============================== //

function DataHistory() {
    const [currentTime, setCurrentTime] = useState(0);

    
    return (
        <MainCard title="Sample Card">
            <Typography variant="body2">
                The current time is
            </Typography>
        </MainCard>
    );
}

export default DataHistory;
