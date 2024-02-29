import Avatar from '@mui/material/Avatar';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer } from 'react-toastify';
import ModelForm from '../components/ModelForm';
import Tables from '../components/Tables';
import { getRequest } from '../saga/actiontypes';

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const App = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state?.getUser);
 const [input,setInput] = useState("");
  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
        Header: 'Avatar',
        accessor: 'avatar',
        Cell: ({ cell: { value } }) => <Avatar src={value} alt="User"  />,
      },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
        Header: 'Password',
        accessor: 'password',
      },
      {
        Header: 'Gender',
        accessor: 'gender',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
     
      {
        Header: 'CreatedAt',
        accessor: 'createdAt',
        Cell: ({ cell: { value } }) => format(new Date(value), 'MM/dd/yyyy'), // Format the date using date-fns
    },
  
  ];

  const filterDate = selector?.filter(item => item.name.toLowerCase().includes(input.toLowerCase()) )

  const [datas, setDatas] = useState(null);
  const [loading, setLoading] = useState(true);


  const [modelOpen, setModelOpen] = React.useState(false);
  const [open, setOpen] = React.useState(true);




    useEffect(() => {
          dispatch(getRequest()) 
      }, [dispatch]);

  return (
    <div>
      <div style={{background:"blue",padding:"12px","marginBottom":"21px",color:"white",display:"flex","justifyContent":"space-between"}}><h1>User Data</h1><input  placeholder="Enter to search" type="text" onChange={(e)=>{setInput(e.target.value)}}/></div>
      <ToastContainer />

          <ModelForm/>

          {
            !selector  && <ClipLoader
            color={"white"}
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          } 
          {
              selector &&    <Tables columns={columns} data={filterDate} />
          }
    </div>
  );
};

export default App;
