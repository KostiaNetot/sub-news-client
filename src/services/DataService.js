import axios from "axios";

export default class DataService {

  static getAllNews() {
      axios.get('http://localhost:5000/news')
        .then(res => {
          return res.data;
        })
        .catch(err => {
          console.log(err);
        })
  }

}
