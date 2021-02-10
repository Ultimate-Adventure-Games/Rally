import React, { Component, useEffect } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';

function Signup(props) {

  const onSubmit = (values) => {

    const data = {
      user_name: values.user_name,
      password: values.password,
    }

    axios.post('http://localhost:3000/api/users', data)
    .then(res => {
      if (res.status === 200) {
        alert("Account successfully created. Return to Login")
        props.history.push('/')
      } else {
        alert("Error creating account");
      }
    })
  };

  const { register, handleSubmit } = useForm();

  return (
    <div className="signupPage">
      
      <div className="signupForm">

        <form onSubmit={handleSubmit(onSubmit)}>

          <label>Username</label>
          <input name="user_name"  ref={register} />

          <label>Password</label>
          <input name="password" type="password" ref={register} />

          <input type='submit'></input>

        </form>
      </div>
    </div>
  )
}

export default Signup;