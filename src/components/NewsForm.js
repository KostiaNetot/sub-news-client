import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Button, Form, Modal, Label, Checkbox} from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {fetchData} from "../redux/actions";


const NewsForm = (props) => {
  const initialInputs = {
    title: props.editing ? props.news.title : '',
    reporter: props.editing ? props.news.reporter : '',
    date: props.editing ? new Date(props.news.date) : new Date(),
    text: props.editing ? props.news.text : '',
  };

  const initialCheckBoxes = {};

  const setInitialCheckBoxes = () => {
    categories.forEach(categ => {
      initialCheckBoxes[categ.name] = props.editing ? checkIsMatch(categ.name) : false;
    });
    setCheckBoxesValues(initialCheckBoxes);
  };

  const { categories } = useSelector(state => state);
  const dispatch = useDispatch();
  const [ open, setOpen ] = useState(false);
  const [ newsInputs, setNewsInputs ] = useState(initialInputs);
  const [ checkBoxesValues, setCheckBoxesValues ] = useState(initialCheckBoxes);

  useEffect(() => {
    setInitialCheckBoxes();
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    const isEmptyFields = Object.values(newsInputs).includes('');
    const isCheckedCategory = !Object.values(checkBoxesValues).every(el => el === false);

    if (isEmptyFields || !isCheckedCategory) {
      alert('All fields should be filled and checked for at least one category');
    } else {
      // props.editing
      //   ? updateEditedNews(newsInputs, checkBoxesValues)
      //   : saveNews(newsInputs, checkBoxesValues);
      saveNews(newsInputs, checkBoxesValues);
    }
  };

  const saveNews = (inputs, boxes) => {
    const checkedCategories = Object.keys(boxes).filter(key => {
      return boxes[key] === true;
    });

    const url = props.editing ? `http://localhost:5000/news/upd/${props.news._id}` : 'http://localhost:5000/news/add';
    const method = props.editing ? 'put' : 'post';

    axios({
      method: method,
      url: url,
      data: { ...inputs, categories: checkedCategories }
    })
      .then(() => {
        setOpen(false);
        dispatch(fetchData());
      })
      .catch(err => console.log(err));
  };

  const resetForm = (e) => {
    e.preventDefault();
    setNewsInputs(initialInputs);
    setInitialCheckBoxes();
  };

  const handleCheckBoxes = (e) => {
    const { innerText: name } = e.target;
    setCheckBoxesValues({ ...checkBoxesValues, [name]: !checkBoxesValues[name] });
  };

  const handleInputsChange = (e) => {
    const { name, value } = e.target;
    setNewsInputs({
      ...newsInputs,
      [name]: value
    });
  };

  const checkIsMatch = (categName) => {
    let isMatch = false;
    props.news.categories.forEach(categ => {
      if (categ === categName) {
        isMatch = true;
      }
    });
    return isMatch;
  };

  const renderCheckBoxes = () => {
      return (
      categories.map(categ => {
        return (
          <Checkbox
            defaultChecked={ props.editing ? checkIsMatch(categ.name) : false }
            onChange={ handleCheckBoxes }
            key={categ._id}
            label={categ.name}
            name={categ.name}
          />
        )
      })
      )
  };

  return (
    <Modal
      closeOnDimmerClick={false}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={ props.editing
                  ? <Label className='edit-news-btn' color='yellow'>edit</Label>
                  : <Button basic color='green' size='mini'>create news</Button>
              }
    >
      <Modal.Content>
        <Form onSubmit={handleForm}>
          <Modal.Description>
            {/*//title*/}
            <Form.Field>
              <label>title:</label>
              <input defaultValue={ newsInputs.title }
                placeholder='news title' className='news-title-input'
                name='title'
                onChange={handleInputsChange}
              />
            </Form.Field>
            {/*//reporter*/}
            <Form.Field>
              <label>reporter:</label>
              <input defaultValue={ newsInputs.reporter }
                placeholder='news reporter' className='news-reporter-input'
                name='reporter'
                onChange={handleInputsChange}
              />
            </Form.Field>
            {/*//date:*/}
            <Form.Field>
              <label>date:</label>
              <DatePicker
                selected={ newsInputs.date }
                maxDate={ new Date() }
                onChange={(val) => { setNewsInputs({ ...newsInputs, date: val }) }}
              />
            </Form.Field>
            {/*//categories*/}
            <Form.Field>
              <label>categories:</label>

              <div className='checkbox-wrapper'>
                { renderCheckBoxes() }
              </div>

            </Form.Field>
            {/*//text:*/}
            <Form.Field>
              <label>text:</label>
              <textarea defaultValue={ newsInputs.text }
                className='news-text'
                placeholder='news text...'
                onChange={handleInputsChange}
                name='text'
              >
              </textarea>
            </Form.Field>
          </Modal.Description>
          <Modal.Actions>
            <Button color='black' onClick={(e) => {
              resetForm(e);
              setOpen(false);
            } }>
              Cancel
            </Button>
            <Button
              type='submit'
              content={ props.editing ? 'Update' : 'Create' }
              positive
            />
          </Modal.Actions>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default NewsForm;
