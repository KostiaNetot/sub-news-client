import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Table, Label } from "semantic-ui-react";
import NewsForm from "./NewsForm";
import axios from "axios";
import {fetchData} from "../redux/actions";

const NewsTable = () => {

  const { news: allNews } = useSelector(state => state);
  const dispatch = useDispatch();

  const deleteNews = ({ _id }) => {
    if (window.confirm('Delete news?')) {
      axios.delete(`http://localhost:5000/news/${_id}`)
        .then((res) => {
          dispatch(fetchData());
          return res;
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>

              <NewsForm />

            </Table.HeaderCell>
            <Table.HeaderCell/>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            allNews.map(news => {
              return(
                <Table.Row key={news._id}>
                  <Table.Cell>{ news.title }</Table.Cell>
                  <Table.Cell className='btn-cell'>

                    <NewsForm editing={true} news={news} />

                    <Label color='red'
                       className='delete-news-btn'
                       onClick={ () => { deleteNews(news) } }
                    >
                      delete
                    </Label>
                  </Table.Cell>
                </Table.Row>
              )
            })
          }
        </Table.Body>
      </Table>
    </>
  );
};

export default NewsTable;
