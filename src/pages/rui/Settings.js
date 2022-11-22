// material-ui
import { Typography,
         FormControl,
         InputLabel,
         Input,
         FormHelperText
        }
from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import OrdersTable from 'pages/dashboard/OrdersTable';

import { useState, useEffect } from 'react';

// ==============================|| SAMPLE PAGE ||============================== //

function Settings() {
    const [currentTime, setCurrentTime] = useState(0);

    const [rows_data, setRowsData] = useState(new Array(0));


	useEffect(() => {
    //get data..
    setRowsData([{"idMachine":41341, "name":'sdagag',"partProgram":1, "type":'fafa'}, {"idMachine":413413, "name":'caaca', "partProgram":2, "type":'fafa'}]);
	}, []);

    return (
      <MainCard sx={{ mt: 2 }} content={false}>
        <OrdersTable rows={rows_data} />
      </MainCard>

    );
}

export default Settings;
