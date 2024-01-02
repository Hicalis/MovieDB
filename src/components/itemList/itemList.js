import { Component } from 'react'

import './itemList.css'
import ItemFilm from '../itemFilm/itemFilm'
import MovieService from '../../services/movieServices'

export default class ItemList extends Component {
  constructor() {
    super()
    this.MovieService = new MovieService()

    this.state = {
      films: [{}],
    }
    this.updateFilm()
  }

  updateFilm() {
    this.MovieService.getAllFilm('return').then((films) => {
      this.setState({
        films: films,
      })
      console.log(films)
    })
  }

  render() {
    const { films } = this.state

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
