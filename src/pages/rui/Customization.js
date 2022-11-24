// material-ui
import { Typography,
         FormControl,
         InputLabel,
         Input,
         FormHelperText,
         Button,
         Grid,
         TextField,
         Dialog,
         DialogActions,
         DialogContent,
         DialogContentText,
         DialogTitle
        }
from '@mui/material';

import { useTheme } from '@mui/material/styles';

import { PlusOutlined } from '@ant-design/icons';

// project import
import MainCard from 'components/MainCard';
import OrdersTable from 'pages/dashboard/OrdersTable';

import { useState, useEffect } from 'react';



// ==============================|| SAMPLE PAGE ||============================== //

function Customization() {
    const theme = useTheme();

    const [currentTime, setCurrentTime] = useState(0);

    const [rows_data, setRowsData] = useState(new Array(0));
    const [open, setOpen] = useState(false);

    const [name, setName] = useState('');
    const [type, setType] = useState('');

    const [new_machine, setNewMachine] = useState(false);
    
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const getMachines = () => {
      fetch('/get_machines').then(res => res = res.json()).then(data => {
        if(data != null)
          data.forEach((item, i) => {
            item.id = i + 1;
          });
        console.log(data);
        setRowsData(data);
      });
    }

    const addMachine = () => {
      fetch('/save_machine_and_machine_type?' + new URLSearchParams({asset: name, machine_type: type})).then(res => res = res.json()).then(data => {
      });
      Swal.fire({
        icon: 'success',
        confirmButtonColor: '#1890ff',
        title: 'Success!',
        text: 'Machine was added',
      })
      setOpen(false);
      setNewMachine(true)
    }


	useEffect(() => {
    getMachines();
    setNewMachine(false);
	}, [new_machine]);

    return (
      <Grid container rowSpacing={3.5} columnSpacing={2.75}>
        <Grid item xs={12}>
          <Typography variant="h5">Machines</Typography>
        </Grid>
        <Grid item xs={12}>
          <MainCard sx={{ mt: 2 }} content={false}>
            <OrdersTable rows={rows_data} />
          </MainCard>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" onClick={handleClickOpen}
          style={{
              backgroundColor: "#ffffff",
          }}
          startIcon={<PlusOutlined />} color="secondary">
            ADD MACHINE
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Machine</DialogTitle>
            <DialogContent>
              <TextField
                required
                margin="dense"
                id="name"
                label="Machine Name"
                type="text"
                fullWidth
                variant="filled"
                onChange={(event) => {setName(event.target.value)}}
              />
              <TextField
                required
                margin="dense"
                id="type"
                label="Machine Type"
                type="text"
                fullWidth
                variant="filled"
                onChange={(event) => {setType(event.target.value)}}
              />
              <TextField
                required
                margin="dense"
                id="url"
                label="Connection URL"
                type="text"
                fullWidth
                variant="filled"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={addMachine}>Add</Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>

    );
}

export default Customization;
