import React from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import {Menu, Dropdown, Header, Container} from "semantic-ui-react";

const AppHeader = () => {
  const { categories } = useSelector(state => state);

  const renderCategoriesList = () => {
    return categories.map(categ => {
      return <Dropdown.Item as={Link} to={`/categories/${categ.name}`} key={categ._id}>{categ.name}</Dropdown.Item>
    });
  };

  return (
    <Container fluid>
      <Header as='h1' className='header-1'>
        <Header.Content>
          NEWS
          <Header.Subheader>Antalog</Header.Subheader>
        </Header.Content>
      </Header>
      <Menu className='app-menu'>
        <Menu.Item
          as={Link} to='/'
          name='news'
        >
          News
        </Menu.Item>

        <Dropdown item text='Categories'>
          <Dropdown.Menu>
            {
              categories ? renderCategoriesList() : null
            }
          </Dropdown.Menu>
        </Dropdown>

        <Menu.Item
          as={Link} to='/admin'
          name='news'
          className='admin-link'
        >
          Admin
        </Menu.Item>
      </Menu>
    </Container>
  );
};

export default AppHeader;
