import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Form, Button, Card } from "semantic-ui-react";
import { setAuthorization } from "../redux/actions";

const AuthForm = () => {
  const dispatch = useDispatch();
  const [ userData, setUserData ] = useState({ name: '', password: '' });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, password } = userData;
    if (!name || !password) {
      alert('All fields should be filled');
    } else {
      dispatch(setAuthorization(true));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>name:</label>
        <input name='name' type='text' placeholder='Name' onChange={handleChangeInput} />
      </Form.Field>
      <Form.Field>
        <label>password:</label>
        <input name='password' type='password' placeholder='Password' onChange={handleChangeInput} />
      </Form.Field>
      <Button color='green' type='submit'>Submit</Button>
    </Form>
  );
};

export default AuthForm;
