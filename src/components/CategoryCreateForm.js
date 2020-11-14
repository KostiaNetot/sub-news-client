import React, { useState } from 'react';
import {Button, Form, Modal} from "semantic-ui-react";
import axios from "axios";
import {fetchData} from "../redux/actions";
import {useDispatch} from "react-redux";

const CategoryCreateForm = () => {

  const [open, setOpen] = useState(false);
  const [ newCategName, setNewCategName ] = useState('');
  const dispatch = useDispatch();

  const handleForm = (e) => {
    e.preventDefault();
    if (newCategName) {
      axios.post('http://localhost:5000/categories/add', { name: newCategName.toLowerCase() })
        .then(() => {
          setOpen(false);
          dispatch(fetchData());
        })
        .catch(err => console.log(err));
    } else {
      alert('Fill the category name input');
    }
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button basic color='green' size='mini'>create new category</Button>}
    >
      <Modal.Content>
        <Form onSubmit={handleForm}>
          <Modal.Description>
            <Form.Field>
              <label>category name:</label>
              <input onChange={(e) => { setNewCategName(e.target.value) }}
                     placeholder='Category name' className='new-categ-input' />
            </Form.Field>
          </Modal.Description>
          <Modal.Actions>
            <Button color='black' onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              type='submit'
              content="Create"
              // onClick={() => setOpen(false)}
              positive
            />
          </Modal.Actions>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default CategoryCreateForm;
