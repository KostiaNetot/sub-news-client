import React from 'react';
import { Container } from "semantic-ui-react";
import { useSelector } from "react-redux";
import AuthForm from "../components/AuthForm";
import AdminPanel from "../components/AdminPanel";


const AdminPage = () => {
  const { isAuthorized } = useSelector(state => state);

  return (
    <Container fluid={isAuthorized} className='admin-container'>
      { isAuthorized ? <AdminPanel/> : <AuthForm/> }
    </Container>
  );
};

export default AdminPage;
