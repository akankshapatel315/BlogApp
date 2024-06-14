import React from 'react'
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import { axiosPost } from '../Common/commonAPI';
export const Register = () => {

  // const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } }:any = useForm();

  const handleFormSubmit = async(data:any) => {
    try {
      const response: any = await axiosPost(data,"register");
      console.log('response', response.status)
      if (response.status == 200) {
        // window.localStorage.setItem("accessToken", response?.data?.accessToken);
       return  alert("Login successful!");
        // dispatch({ type: , payload: response?.data });
        // navigate("/allBlogs");
      }
    } catch (error: any) {
      if (error.response.status == 401) {
        toast.error(error?.response?.data?.message);
      }
      // navigate("/");
    }
  };
  return (
    <>
     <form onSubmit={handleSubmit(handleFormSubmit)} style={{ maxWidth: 300, margin: 'auto' }}>
      <Typography variant="h5" align="center" gutterBottom>Sign Up</Typography>
      <TextField
        {...register('firstName', { required: 'First name is required' })}
        label="First Name"
        fullWidth
        margin="normal"
        error={!!errors.firstName}
        helperText={errors.firstName ? errors.firstName.message : ''}
      />
      <TextField
        {...register('lastName', { required: 'Last name is required' })}
        label="Last Name"
        fullWidth
        margin="normal"
        error={!!errors.lastName}
        helperText={errors.lastName ? errors.lastName.message : ''}
      />
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
        Sign Up
      </Button>
      <Typography align="center" style={{ marginTop: 10 }}>
        Already have an account? <Link to="/">Login now</Link>
      </Typography>
    </form>
    <ToastContainer/>

    </>
  )
}
