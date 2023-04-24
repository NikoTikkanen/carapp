import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCar(props) {
    const [car, setCar] = React.useState({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        year: '',
        price: ''
    });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setCar({
        brand: props.params.brand,
        model: props.params.model,
        color: props.params.color,
        fuel: props.params.fuel,
        year: props.params.year,
        price: props.params.price
        
    })
    console.log(props.params);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick')
    setOpen(false);
  };

  const handleSave =() =>{
      props.updateCar(props.params._links.car.href, car);
      setOpen(false);
  }

  return (
    <div>
      <Button size="small" onClick={handleClickOpen}>
        EDIT
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit car specs</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Brand"
            value= {car.brand}
            onChange={e => setCar({...car, brand: e.target.value})}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Model"
            value= {car.model}
            onChange={e => setCar({...car, model: e.target.value})}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Color"
            value= {car.color}
            onChange={e => setCar({...car, color: e.target.value})}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Fuel"
            value= {car.fuel}
            onChange={e => setCar({...car, fuel: e.target.value})}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Year"
            value= {car.year}
            onChange={e => setCar({...car, year: e.target.value})}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Price"
            value= {car.price}
            onChange={e => setCar({...car, price: e.target.value})}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}