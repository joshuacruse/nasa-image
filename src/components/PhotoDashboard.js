import React from 'react'
import axios from 'axios'
import Jumbotron from 'react-bootstrap/Jumbotron'
import PhotoGrid from './PhotoGrid'
import PhotoSearch from './PhotoSearch'
import logo from '../img/nasa-logo.png'


class PhotoDashboard extends React.Component {

  state = {
    photos: [],
    search: ''
  }

  searchUpdate = (searchTerms) => {
    this.setState({
      search: searchTerms.toString()
    })
  }

  componentDidMount() {
    axios.get(`https://images-api.nasa.gov/search?q=${this.state.search}&media_type=image`)
      .then(response => {
        this.setState({
          photos: response.data.collection.items.map(image => {
            return {
              id: image.data[0].nasa_id,
              date: image.data[0].date_created,
              title: image.data[0].title,
              description: image.data[0].description,
              photographer: image.data[0].photographer,
              href: image.links[0].href
            }
          })
        })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.search !== prevState.search) {
      axios.get(`https://images-api.nasa.gov/search?q=${this.state.search}&media_type=image`)
        .then(response => {
          this.setState({
            photos: response.data.collection.items.map(image => {
              return {
                id: image.data[0].nasa_id,
                date: image.data[0].date_created,
                title: image.data[0].title,
                description: image.data[0].description,
                photographer: image.data[0].photographer,
                href: image.links[0].href
              }
            })
          })
        })
      }
  }

  render() {
    return (
      <div>
      <Jumbotron className="text-center mt-3">
        <img src={logo} alt="nasa logo" className="logo" />
        <h1 className="display-4">Image Library</h1>
        <hr />
        <p>
          Search the NASA photo library.
          Click any photo for more information.
        </p>
      </Jumbotron>
        <PhotoSearch searchUpdate = {this.searchUpdate} {...this.props} />
        <PhotoGrid photos={this.state.photos} {...this.props} />
      </div>
    )
  }
}


export default PhotoDashboard