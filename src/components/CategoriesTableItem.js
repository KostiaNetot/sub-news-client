import React, {useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { fetchData } from "../redux/actions";
import {Label, Table, Input} from "semantic-ui-react";

const CategoriesTableItem = ({ category }) => {

  const [ isClicked, setIsClicked ] = useState(false);
  const [ editedName, setEditedName ] = useState(category.name);
  const { news: newsList } = useSelector(state => state);
  const dispatch = useDispatch();

  const showEditInput = (e) => {
    setIsClicked(true);
  };

  const hideEditInput = (e) => {
    e.stopPropagation();
    setIsClicked(false);
  };

  const updateCategoriesInNewsList = (replaceCateg = null) => {
    newsList.forEach(news => {
      const index = news.categories.indexOf(category.name);
      if (index !== -1) {
        replaceCateg ? news.categories.splice(index, 1, editedName)
          : news.categories.splice(index, 1);
        axios.put(`http://localhost:5000/news/upd/${news._id}`, { categories: news.categories })
          .then((res) => {
            return res;
          })
          .catch(err => console.log(err));
      }
    });
  };

  const saveEditedCategory = (e) => {
    e.stopPropagation();
    if (editedName !== category.name) {
      //replace in news list
      updateCategoriesInNewsList(true);
      //replace category
      axios.put(`http://localhost:5000/categories/upd/${category._id}`, { name: editedName.toLowerCase() })
        .then(() => {
          dispatch(fetchData());
          setIsClicked(false);
        })
        .catch(err => console.log(err));
    }
  };

  const removeCategory = (e) => {
    e.stopPropagation();
    const confirmed = window.confirm('Delete category?');
    if (confirmed) {
      //remove categories from news list
      updateCategoriesInNewsList();
      //remove category
      axios.delete(`http://localhost:5000/categories/${category._id}`)
        .then((res) => {
          dispatch(fetchData());
          return res;
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <>
      <Table.Row>
        <Table.Cell onClick={showEditInput} className='categ-list-item'>
          {
            !isClicked
            ? category.name
            : <div className='input-wrapper'>
                <Input value={editedName}
                  onChange={(e) => { setEditedName(e.target.value) }} size='mini' />
                <span onClick={hideEditInput} className='close'>x</span>
              </div>
          }
          {
            isClicked ? <Label onClick={saveEditedCategory} color='green' horizontal className='save-btn'>save</Label> : null
          }
          <Label onClick={removeCategory} color='red' horizontal className='delete-btn'>delete</Label>
        </Table.Cell>
      </Table.Row>
    </>
  );
};

export default CategoriesTableItem;
