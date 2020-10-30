import React from 'react';
import logo from './logo.svg';
import './App.css';
const axios = require('axios');
class App extends React.Component {
   state = {
        artists: []
  }

  componentDidMount = () => { //This is called when component mounts

    this.getArtistsFromAPI()

  }


// functions
// set state.artists with data returned from API
  setArtistDataIntoAppState = (artistdata) => {
    this.setState({
      artists: artistdata
    })
    console.log(this.state)
  }


// get data from localhost:5000/fruits
getArtistsFromAPI = () => {
  axios.get('http://localhost:5000/artists')
  .then((response)=> {
    console.log('Response from backend', response)
    this.setArtistDataIntoAppState(response.data)
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
