import React, { Component } from 'react'
import './itemList.css'
import { Spin, Alert, Pagination, Input, Button } from 'antd'
import { debounce } from 'lodash'

import ItemFilm from '../itemFilm/itemFilm'
import MovieService from '../../services/movieServices'

export default class ItemList extends Component {
  constructor(props) {
    super(props)
    this.MovieService = new MovieService()
    this.state = {
      films: [{}],
      loading: true,
      error: false,
      isEmpty: true,
      pages: 1,
      currentPage: null,
      label: '',
      isRated: false,
      oldFilms: [{}],
      oldLabel: '',
      oldPages: null,
      idsAndRatingRatedFilms: [{}],
    }

    this.showRatedFilms = () => {
      this.setState({
        loading: true,
      })
      this.MovieService.getRatedMovies(this.props.guest)
        .then((films) => {
          this.setState({
            idsAndRatingRatedFilms: films.results,
            films: films.results,
            loading: false,
            pages: films.total_pages,
          })
        })
        .catch(this.onError)

      this.setState({
        isRated: true,
      })
    }

    this.showSearchFilms = () => {
      this.setState({
        loading: true,
      })
      this.MovieService.getAllFilm('')
        .then((films) => {
          this.setState({
            films: films.results,
            loading: false,
          })
          if (''.length != 0) {
            this.setState({
              isEmpty: false,
            })
          } else {
            this.setState({
              isEmpty: true,
            })
          }
        })
        .catch(this.onError)
      this.setState({
        isRated: false,
      })
    }

    this.backToSearch = () => {
      this.setState({
        films: this.state.oldFilms,
        isRated: false,
        label: this.state.oldLabel,
        pages: this.state.oldPages,
      })
    }

    this.update('')

    this.updateFilm = debounce((titleFilm) => {
      this.MovieService.getAllFilm(titleFilm)
        .then((films) => {
          this.setState({
            oldFilms: films.results,
            films: films.results,
            loading: false,
            pages: films.total_pages,
            oldPages: films.total_pages,
            oldLabel: titleFilm,
          })
          if (titleFilm.length != 0) {
            this.setState({
              isEmpty: false,
            })
          } else {
            this.setState({
              isEmpty: true,
            })
          }
        })
        .catch(this.onError)
    }, 1000)

    this.changePage = debounce((page) => {
      this.MovieService.changePage(page, this.state.value)
        .then((films) => {
          this.setState({
            oldFilms: films.results,
            films: films.results,
            loading: false,
            pages: films.total_pages,
          })
        })
        .catch(this.onError)
    }, 1000)
  }

  onError() {
    this.setState({ error: true, loading: false })
  }

  updateFilm(titleFilm = '') {
    this.MovieService.getAllFilm(titleFilm)
      .then((films) => {
        this.setState({
          films: films.results,
          loading: false,
        })
        if (titleFilm.length != 0) {
          this.setState({
            isEmpty: false,
          })
        } else {
          this.setState({
            isEmpty: true,
          })
        }
      })
      .catch(this.onError)
  }

  // componentDidMount(){
  //   update(titleFilm) {
  //     this.setState({
  //       loading: true,
  //     })
  //     this.updateFilm(titleFilm)
  //   }
  // }

  update(titleFilm) {
    this.setState({
      loading: true,
    })
    this.updateFilm(titleFilm)
  }

  onLabelChange(event) {
    this.setState({
      value: event.target.value,
    })
    this.update(event.target.value)
  }

  changePages(page) {
    this.setState({
      loading: true,
      currentPage: page,
    })
    this.changePage(page)
  }

  render() {
    const { films, loading, error, isEmpty, pages, isRated, label, currentPage } = this.state

    let search = <Button onClick={this.backToSearch}>Search</Button>
    let rated = <Button onClick={this.showRatedFilms}>Rated</Button>
    if (!isRated) {
      search = (
        <Button type="primary" onClick={this.backToSearch}>
          Search
        </Button>
      )
    } else {
      rated = (
        <Button type="primary" onClick={this.showRatedFilms}>
          Rated
        </Button>
      )
    }

    if (error) {
      return (
        <React.Fragment>
          <Input placeholder="Type to search..." onChange={this.onLabelChange.bind(this)} />
          <Alert
            className="alert"
            message="Ошибка"
            description="Что-то пошло не так. Попробуйте снова"
            type="error"
            showIcon
            backgroun-color="#fff2f0"
          />
        </React.Fragment>
      )
    }

    if (isRated && films.length === 0) {
      return (
        <React.Fragment>
          <div className="films">
            <div className="buttons">
              {search}
              {rated}
            </div>
            <div className="good"></div>
            {loading ? (
              <Spin className="spin" />
            ) : (
              <Alert
                className="alert"
                message="Ошибка"
                description="Вы не оценивали фильмы"
                type="error"
                showIcon
                backgroun-color="#fff2f0"
              />
            )}
          </div>
        </React.Fragment>
      )
    }

    if (!isEmpty && films.length === 0) {
      return (
        <React.Fragment>
          <div className="films">
            <div className="buttons">
              {search}
              {rated}
            </div>
            <Input placeholder="Type to search..." onChange={this.onLabelChange.bind(this)} defaultValue={label} />
            {loading ? (
              <Spin className="spin" />
            ) : (
              <Alert
                className="alert"
                message="Ошибка"
                description="Фильма с таким названием не существует"
                type="error"
                showIcon
                backgroun-color="#fff2f0"
              />
            )}
          </div>
        </React.Fragment>
      )
    }

    const elements = films.map((film) => {
      return (
        <React.Fragment key={film.id}>
          <ItemFilm
            idsAndRatingRatedFilms={this.state.idsAndRatingRatedFilms}
            rating={film.rating}
            id={film.id}
            poster_path={film.poster_path}
            original_title={film.title}
            release_date={film.release_date}
            overview={film.overview}
            vote={film.vote_average}
            genre={film.genre_ids}
            guest={this.props.guest}
          />
        </React.Fragment>
      )
    })

    let el = !elements.length ? (
      <React.Fragment key="withElements">{elements}</React.Fragment>
    ) : (
      <React.Fragment key="noElements">
        {elements}
        <div key="uniqueKey" className="good"></div>
        <Pagination
          key="paginationKey"
          onChange={this.changePages.bind(this)}
          total={pages}
          defaultCurrent={currentPage}
        />
      </React.Fragment>
    )

    let input = <Input placeholder="Type to search..." onChange={this.onLabelChange.bind(this)} defaultValue={label} />

    return (
      <div className="films">
        <div className="buttons">
          {search}
          {rated}
        </div>
        {!isRated ? input : <div className="good"></div>}
        {loading ? <Spin className="spin" /> : el}
      </div>
    )
  }
}
