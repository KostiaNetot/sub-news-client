import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { fetchData } from "./redux/actions";
import './App.css';
import NewsListPage from "./pages/NewsListPage";
import AppHeader from "./components/AppHeader";
import NewsPage from "./pages/NewsPage";
import AdminPage from "./pages/AdminPage";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
      <div className="App">
        <Router>
          <AppHeader/>
          <Route path='/' exact component={NewsListPage} />
          <Route path='/categories/:name' component={NewsListPage} />
          <Route path='/news/:id' exact component={NewsPage} />
          <Route path='/admin' exact component={AdminPage} />
        </Router>
      </div>
  );
}

export default App;
