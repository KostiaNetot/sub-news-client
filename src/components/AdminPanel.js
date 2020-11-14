import React from 'react';
import { Container, Grid } from "semantic-ui-react";
import CategoriesTable from "./CategotiesTable";

const AdminPanel = () => {
  return (
    <>
      <Grid celled>
        <Grid.Row>
          <Grid.Column width={5}>
            <CategoriesTable/>
          </Grid.Column>
          <Grid.Column width={11}>
            news list table
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default AdminPanel;
