import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { putRequest } from '../saga/actiontypes';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Input } from '@mui/material';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
export default function EditForm(props) {
  React.useEffect(()=>{

  })
  const selector = useSelector(state => state?.getUser);
  let userData = selector.filter(item => item.id === props.id)
  userData = userData[0]
  console.log(userData)
  
  console.log(props)
  const [open, setOpen] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState(null);
  const dispatch = useDispatch();
  const [data,setData] = React.useState({
    name: userData?.name,
    phone:userData?.phone,
    email:userData?.email,
    password:userData?.password,
  })
  const [selectedOption, setSelectedOption] = React.useState(userData?.gender);
  // setSelectedOption(userData?.gender)
  console.log(data)
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
            ...data,id:props.id
        }
        dispatch(putRequest(allData));
        toast.success('Item Edited Successfully!', {
          position: 'top-right',
          autoClose: 3000, // Close the toast after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

      } catch (error) {
        // Handle errors
        console.error('Error:', error.message);
      }

 }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <Button color="success" variant="contained"  onClick={handleClickOpen}>
        Edit
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
            value={data.name}
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
            value={data.email}
            fullWidth
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
            value={data.password}

            onChange={(e) => updateData('password', e.target.value)}

          />
           <TextField
            autoFocus
            required
            margin="dense"
            id="phone"
            name="phone"
            label="Enter Phone"
            fullWidth
            value={data.phone}
            onChange={(e) => updateData('phone', e.target.value)}

          />
           <FormControl>
      {/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel> */}
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
      {/* <Input
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
            </label> */}
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