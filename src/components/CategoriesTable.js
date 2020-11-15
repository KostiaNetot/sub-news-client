import React from 'react';
import { useSelector} from "react-redux";
import { Table } from "semantic-ui-react";
import CategoriesTableItem from "./CategoriesTableItem";
import CategoryCreateForm from "./CategoryCreateForm";

const CategoriesTable = () => {

  const { categories } = useSelector(state => state);

  return (
    <>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>

              <CategoryCreateForm/>

            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            categories.map(category => {
              return(
               <CategoriesTableItem category={category} key={category._id} />
              )
            })
          }
        </Table.Body>
      </Table>
    </>
  );
};

export default CategoriesTable;
