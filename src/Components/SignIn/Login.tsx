// LoginForm.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { axiosPost } from '../../Common/commonAPI';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getUserDetails } from '../../Actions/userActions';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } :any= useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state: any) => {
    console.log("state", state);
  });
  const handleFormSubmit = async (data:any) => {
  console.log(data);
  try {
    const response: any = await axiosPost(data,"login");
    console.log('response', response.status)
    if (response.status == 200) {
      window.localStorage.setItem("accessToken", response?.data?.accessToken);
       toast.success("Login successful!");
      dispatch({ type: getUserDetails, payload: response?.data });
      navigate("/allBlogs");
    }
  } catch (error: any) {
    if (error.response.status == 401) {
      toast.error(error?.response?.data?.message);
    }
    navigate("/");
  }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} style={{ maxWidth: 300, margin: 'auto' }}>
      <Typography variant="h5" align="center" gutterBottom>Login</Typography>
      <TextField
        {...register('email', { required: 'Email is required' })}
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email ? errors.email.message : ''}
      />
      <TextField
        {...register('password', { required: 'Password is required' })}
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        error={!!errors.password}
        helperText={errors.password ? errors.password.message : ''}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 20 }}>
        Login
      </Button>    
      <Typography align="center" style={{ marginTop: 10 }}>
        Don't have an account? <Link to="/signup">Register now</Link>
      </Typography>
      </form>
  );
};

export default Login;
