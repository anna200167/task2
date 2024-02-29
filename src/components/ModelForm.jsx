import * as React from 'react';
import { useDispatch } from 'react-redux';

import { postRequest } from '../saga/actiontypes';

import { Input } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [selectedFiles, setSelectedFiles] = React.useState(null);
  const dispatch = useDispatch();
  const [data,setData] = React.useState({
    name: '',
    phone:0,
    email:'',
    password:'',
  })
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files[0]);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
   
  const updateData = (key, value) => {
    setData(prevData => ({
      ...prevData,
      [key]: value, 
    }));

  };
 const  handleSubmit = async (e)=>{
    e.preventDefault();
    try {
 
        const allData = {
            ...data,gender:selectedOption,avatar:selectedFiles
        }
        // const formData = new FormData();
        // formData.append("avatar",file[0]);
        // const response = await axios.post('https://650bc2aa47af3fd22f6676ec.mockapi.io/User', allData, {
            // headers: {
            //   'Content-Type': 'multipart/form-data',
            // },
    // });
        dispatch(postRequest(allData));
        console.log(allData)
        setSelectedOption(null)
        // console.log('Response:', response.data);
      } catch (error) {
        // Handle errors
        console.error('Error:', error.message);
      }

 }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add User
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
       
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label=" Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => updateData('name', e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => updateData('email', e.target.value)}

          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="Enter Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => updateData('password', e.target.value)}

          />
           <TextField
            autoFocus
            required
            margin="dense"
            id="phone"
            name="phone"
            label="Enter Phone"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => updateData('phone', e.target.value)}

          />
          
         
           <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio  /> } label="Female"  checked={selectedOption === 'female'}
          onChange={handleRadioChange}/>
        <FormControlLabel value="male" control={<Radio />} label="Male"  checked={selectedOption === 'male'}
          onChange={handleRadioChange}/>
      </RadioGroup>
      <Input
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }} // hide the original input
                inputProps={{
                accept: 'image/*', // specify accepted file types (e.g., images)
                }}
                id="contained-button-file"
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" component="span">
                Upload File
                </Button>
            </label>
    </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
      </form>
    </>
  );
}