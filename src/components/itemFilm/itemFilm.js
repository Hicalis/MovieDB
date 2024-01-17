import { Component } from 'react'
import { format, parseISO } from 'date-fns'
import './itemFilm.css'
import { Rate } from 'antd'

import { Consumer } from '../genreContext/genreContext'
import MovieService from '../../services/movieServices'

export default class ItemList extends Component {
  constructor(props) {
    super(props)
    this.MovieService = new MovieService()
    this.state = {
      rating: this.props.rating,
    }
  }

  render() {
    const { original_title, release_date, overview, poster_path, vote, genre, id, guest, idsAndRatingRatedFilms } =
      this.props

    let rating = 0

    idsAndRatingRatedFilms.map((el) => {
      if (el.id == id) {
        rating = el.rating
      }
    })

    let date = ''
    let urlImg = ''

    if (typeof poster_path === 'string' && poster_path.length > 0) {
      urlImg += 'https://image.tmdb.org/t/p/original' + poster_path
    } else {
      urlImg += 'https://image.tmdb.org/t/p/original' + '/wHaGIxP5oUSrOh0gL7FZd7QZUZw.jpg'
    }

    if (typeof release_date === 'string' && release_date.length > 0) {
      date = format(parseISO(release_date), 'MMMM d, y')
    }

    let circleColor =
      vote.toFixed(1) >= 0 && vote.toFixed(1) <= 3
        ? '#E90000'
        : vote.toFixed(1) > 3 && vote.toFixed(1) <= 5
          ? '#E97E00'
          : vote.toFixed(1) > 5 && vote.toFixed(1) <= 7
            ? '#E9D100'
            : '#66E900'

    return (
      <Consumer>
        {(genresId) => {
          const genres = genre.map((el) => {
            for (let key in genresId) {
              if (genresId[key].id == el) {
                return <h2 key={el}>{genresId[key].name}</h2>
              }
            }
          })

          return (
            <div className="film" key={1}>
              <img src={urlImg} alt={original_title} width="189" />
              <div className="description">
                <div className="title">
                  <h1 className="original_title">{original_title}</h1>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                    className="circle"
                  >
                    <circle cx="17" cy="17" r="16" stroke={circleColor} strokeWidth="2" />
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      fill="#000"
                      fontSize="12"
                      fontFamily="Inter UI"
                    >
                      {vote.toFixed(1)}
                    </text>
                  </svg>
                </div>

                <h2 className="release_date">{date}</h2>
                <div className="genre">{genres}</div>
                <h2 className="overview">{overview}</h2>
                <Rate
                  defaultValue={rating}
                  allowHalf
                  count={10}
                  onChange={(event) => {
                    this.MovieService.addRaiting(event, id, guest)
                  }}
                />
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}
