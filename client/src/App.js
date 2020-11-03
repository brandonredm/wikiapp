import React from 'react';
import './App.css';
const axios = require('axios');

class App extends React.Component {
   state = {
        artists: [],
          artist: {
            name: '',
            label: '',
            image: '',
            description: '',
            notable_songs: ''
          }
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
  axios.get('/api/artists')
  .then((response)=> {
    console.log('Response from backend', response)
    this.setArtistDataIntoAppState(response.data)
  })
}

createArtist = (event) => {
  event.preventDefault()
  axios.post('/api/artists', this.state.artist).then(response => {
    this.getArtistsFromAPI()
  })
}

deleteArtist = (event) => {
  console.log(event.target)
  axios.delete('/api/artists/' + event.target.id)
  .then(response => this.setState(
    {artists: response.data})
  )
}

updateArtist = (event) => {
  console.log(event.target)
      event.preventDefault()
      const id = event.target.id
      axios
      .put('/api/artists/' + id, this.state.artist)
      .then(response => {
        this.setState({
          artist: response.data
        })
        this.getArtistsFromAPI()
      })
    }

  handleChange = (event) => {
    console.log(this.state)
    const artist = this.state.artist;
    artist[event.target.id] = event.target.value
    this.setState({
        artist
    })
  }

    render() {
      return (
      <>
      <details>
      <summary> add an artist</summary>
      <form onSubmit={this.createArtist}>
      <label htmlFor="image">Image: </label>
      <input onChange={this.handleChange} type="text" id="image" />
      <br />
      <label htmlFor="name">Name: </label>
      <input onChange={this.handleChange} type="text" id="name" />
      <br />
      <label htmlFor="label">Label: </label>
      <input onChange={this.handleChange} type="text" id="label" />
      <br />
      <label htmlFor="description">Description: </label>
      <input onChange={this.handleChange} type="text" id="description" />
      <br />
      <label htmlFor="notable_songs">Notable Songs: </label>
      <input onChange={this.handleChange} type="text" id="notable_songs" />
      <br />
      <input className="submit"type="submit" value="Add Artist" />
      </form>
      </details>
      <ul>
      <h2 className="myartists">Muscians</h2>
       {this.state.artists.map((musician, index) => {
         return(
           <div key={index}>
            { (musician) ?
           <aside className="musician">
           <img className="Img"src={musician.image} alt={musician.name}/>
           <h3>{musician.name}</h3>
           <details>
           <h4 className="jedi">Name: {musician.name}</h4>
           <h4>Label: {musician.label}</h4>
           <h4>Description: {musician.description}</h4>
           <h4>Notable Songs: {musician.notable_songs} </h4>
           <div className="edit">
           <details>
            <summary> Edit Artist</summary>
            <form id={musician._id} onSubmit={this.updateArtist} >
            <label htmlFor="image">Image: </label>
            <input onChange={this.handleChange} type="text" id="image" />
            <br />
            <label htmlFor="name">Name: </label>
            <input onChange={this.handleChange} type="text" id="name" />
            <br />
            <label htmlFor="label">Label: </label>
            <input onChange={this.handleChange} type="text" id="label" />
            <br />
            <label htmlFor="description">Description: </label>
            <input onChange={this.handleChange} type="text" id="description" />
            <br />
            <label htmlFor="notable_songs">Notable Songs: </label>
            <input onChange={this.handleChange} type="text" id="notable_songs" />
            <br />
            <input className="submit"type="submit" value="Edit Artist" />
      </form>
      <button id ={musician._id}
      onClick={this.deleteArtist}
      >DELETE
      </button>
      </details>
      </div>
      </details>
     </aside> : null}
     </div>
   )})}
 </ul>
 </>
  )
}}
  export default App;
