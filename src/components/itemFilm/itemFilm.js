import { Component } from 'react'
import { format, parseISO } from 'date-fns'
import './itemFilm.css'

export default class ItemList extends Component {
  render() {
    const { original_title, release_date, overview, poster_path } = this.props

    let date = ''
    let urlImg = ''

    if (typeof poster_path === 'string' && poster_path.length > 0) {
      urlImg += 'https://image.tmdb.org/t/p/original' + poster_path
    }

    if (typeof release_date === 'string' && release_date.length > 0) {
      date = format(parseISO(release_date), 'MMMM d, y')
    }

    return (
      <div className="film" key={1}>
        <img src={urlImg} alt={original_title} width="189" />
        <div className="description">
          <h1 className="original_title">{original_title}</h1>
          <h2 className="release_date">{date} </h2>
          <div className="genre">
            <h2>Action</h2>
            <h2>Drama</h2>
          </div>
          <h2 className="overview">{overview}</h2>
        </div>
      </div>
    )
  }
}
