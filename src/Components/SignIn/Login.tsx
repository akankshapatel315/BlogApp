// LoginForm.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } :any= useForm();

  const handleFormSubmit = (data:any) => {
  console.log(data);
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
