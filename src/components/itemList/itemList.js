import { Component } from 'react'
import './itemList.css'
import { Spin, Alert } from 'antd'
import { Online, Offline } from 'react-detect-offline'

import ItemFilm from '../itemFilm/itemFilm'
import MovieService from '../../services/movieServices'

export default class ItemList extends Component {
  constructor() {
    super()
    this.MovieService = new MovieService()
    this.state = {
      films: [{}],
      loading: true,
      error: false,
    }
    this.updateFilm()
  }

  onError() {
    this.setState({ error: true, loading: false })
  }

  updateFilm() {
    this.MovieService.getAllFilm('aveng')
      .then((films) => {
        this.setState({
          films: films,
          loading: false,
        })
      })
      .catch(this.onError)
  }

  render() {
    const { films, loading, error } = this.state

    if (error) {
      return (
        <Alert
          className="alert"
          message="Ошибка"
          description="Что-то пошло не так. Попробуйте снова"
          type="error"
          showIcon
          backgroun-color="#fff2f0"
        />
      )
    }

    if (loading) {
      return (
        <div className="load">
          <Online>
            <Spin className="spin" />
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
        </div>
      )
    }

    const elements = films.map((film) => {
      return (
        <ItemFilm
          key={film.id}
          poster_path={film.poster_path}
          original_title={film.title}
          release_date={film.release_date}
          overview={film.overview}
        />
      )
    })

    return <div className="films">{elements}</div>
  }
}
