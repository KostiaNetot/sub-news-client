import React from 'react';
import { Grid } from "semantic-ui-react";
import CategoriesTable from "./CategoriesTable";
import NewsTable from "./NewsTable";

const AdminPanel = () => {
  return (
    <>
      <Grid celled>
        <Grid.Row>
          <Grid.Column width={5}>

            <CategoriesTable/>

          </Grid.Column>
          <Grid.Column width={11}>

            <NewsTable/>

          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default AdminPanel;
