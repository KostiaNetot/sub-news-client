import React, { useEffect, useState } from 'react';
import {useSelector} from "react-redux";
import {Card, Container, Header, Icon, Loader, Segment, Label} from "semantic-ui-react";

const NewsPage = (props) => {
  const { news: allNews } = useSelector(state => state);
  const [ news, setNews ] = useState(null);
  const { id } = props.match.params;

  useEffect(() => {
    if (allNews) {
      setNews(checkedNews(id));
    }
  }, [allNews]);

  const checkedNews = (id) => {
    return allNews.filter(news => news._id === id)[0];
  };

  return (
    <Container>
      {
        news ? <>
          <Header as='h2' attached='top' className='news-header'>
            {news.title}
            <Header.Subheader>
              <Icon name='calendar alternate outline' />{news.date.substring(0, 10)}
              <Icon name='newspaper outline' />{news.reporter}
            </Header.Subheader>
          </Header>
          <Segment attached>
            {news.text}
            <div className='label-categ-wrapper'>
              { news.categories.map(categ => {
                return <Label color='teal' key={categ}>{categ}</Label>
              }) }
            </div>
          </Segment>
        </> : <Loader active/>
      }
    </Container>
  );
};

export default NewsPage;
