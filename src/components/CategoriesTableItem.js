import React, {useState} from 'react';
import {Label, Table, Input} from "semantic-ui-react";

const CategoriesTableItem = ({ category }) => {
  const [ isClicked, setIsClicked ] = useState(false);

  const showEditInput = (e) => {
    setIsClicked(true);
  };

  const hideEditInput = (e) => {
    e.stopPropagation();
    setIsClicked(false);
  };

  const saveCategory = (e) => {
    e.stopPropagation();
    console.log('saveCategory');
  };

  const removeCategory = (e) => {
    e.stopPropagation();
    console.log('removeCategory');
  };

  return (
    <>
      <Table.Row>
        <Table.Cell onClick={showEditInput} className='categ-list-item'>
          {
            !isClicked
            ? category.name
            : <div className='input-wrapper'><Input value={category.name} size='mini' />
                <span onClick={hideEditInput} className='close'>x</span>
              </div>
          }
          <Label onClick={saveCategory} color='green' horizontal className='save-btn'>save</Label>
          <Label onClick={removeCategory} color='red' horizontal className='delete-btn'>delete</Label>
        </Table.Cell>
      </Table.Row>
    </>
  );
};

export default CategoriesTableItem;
