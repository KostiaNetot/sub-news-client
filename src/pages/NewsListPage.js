import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { Loader, Card, Icon, Container } from "semantic-ui-react";

const NewsListPage = (props) => {
  const [ newsList, setNewsList ] = useState(null);
  const { news: allNews } = useSelector(state => state);
  const categoryName = props.match.params.name;

  useEffect(() => {
    if (!categoryName && allNews) {
      setNewsList(allNews);
    }
    if (categoryName && allNews) {
      const newsList = allNews.filter(news => {
        if (news.categories.indexOf(categoryName) !== -1) {
          return news;
        }
      });
      setNewsList(newsList);
    }
  }, [allNews, categoryName]);

  const renderNewsList = () => {
    return newsList.map(news => {
      return (
        <Link to={`/news/${news._id}`} key={news._id}>
          <Card className='news-list-item' fluid>
            <Card.Content header={news.title} />
            <Card.Content description={news.text} />
            <Card.Content extra>
              <Icon name='calendar alternate outline' />{news.date.substring(0, 10)}
              <Icon name='newspaper outline' />{news.reporter}
            </Card.Content>
          </Card>
        </Link>
      )
    });
  };

  return (
    <Container>
      { newsList ? renderNewsList() : <Loader active/> }
    </Container>
  );
};

export default NewsListPage;
