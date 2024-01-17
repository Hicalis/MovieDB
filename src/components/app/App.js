import './App.css'
import React, { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'
import { Alert } from 'antd'

import { Provider } from '../genreContext/genreContext'
import ItemList from '../itemList/itemList'
import MovieService from '../../services/movieServices'

export default class App extends Component {
  constructor() {
    super()
    this.MovieService = new MovieService()
    this.state = {
      guest_session_id: '',
      genres: [],
    }
  }

  componentDidMount() {
    this.MovieService.createGuestSession().then((el) => {
      this.setState({
        guest_session_id: el.guest_session_id,
      })
    })
    this.MovieService.GetGenres().then((el) => {
      this.setState({ genres: el.genres })
    })
  }

  render() {
    return (
      <React.Fragment>
        <Online>
          <Provider value={this.state.genres}>
            <div className="app">
              <ItemList guest={this.state.guest_session_id} />
            </div>
          </Provider>
        </Online>
        <Offline>
          <Alert
            className="alert"
            message="Ошибка"
            description="Нет доступа к интернету"
            type="error"
            showIcon
            backgroun-color="#fff2f0"
          />
        </Offline>
      </React.Fragment>
    )
  }
}
