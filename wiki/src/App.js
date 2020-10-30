import React from 'react';
import logo from './logo.svg';
import './App.css';
const axios = require('axios');
class App extends React.Component {
   state = {
        fruits: []
  }

  componentDidMount = () => { //This is called when component mounts

    this.getFruitsFromAPI()

  }


// functions
// set state.fruits with data returned from API
  setFruitDataIntoAppState = (fruitdata) => {
    this.setState({
      fruits: fruitdata
    })
    console.log(this.state)
  }


// get data from localhost:5000/fruits
getFruitsFromAPI = () => {
  axios.get('http://localhost:5000/fruits')
  .then((response)=> {
    console.log('Response from backend', response)
    this.setFruitDataIntoAppState(response.data)
  })
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.

          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }

}

export default App;
