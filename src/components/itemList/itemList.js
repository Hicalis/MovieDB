import React, { Component } from 'react'
import './itemList.css'
import { Spin, Alert, Pagination, Input } from 'antd'
import { Online, Offline } from 'react-detect-offline'
import { debounce } from 'lodash'

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
      isEmpty: true,
      pages: null,
      currentPage: null,
      label: '',
    }
    this.update('')
    this.updateFilm = debounce((titleFilm) => {
      this.MovieService.getAllFilm(titleFilm)
        .then((films) => {
          console.log(films)
          this.setState({
            films: films.results,
            loading: false,
            pages: films.total_pages,
            currentPage: 3,
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
      this.MovieService.changePage(page)
        .then((films) => {
          console.log(films)
          this.setState({
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

  changePage(page) {
    this.setState({
      loading: true,
    })
    this.changePage(page)
  }

  render() {
    const { films, loading, error, isEmpty, pages } = this.state

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

    if (!isEmpty && films.length === 0) {
      return (
        <React.Fragment>
          <div className="films">
            <Input placeholder="Type to search..." onChange={this.onLabelChange.bind(this)} />
            <Alert
              className="alert"
              message="Ошибка"
              description="Фильма с таким названием не существует"
              type="error"
              showIcon
              backgroun-color="#fff2f0"
            />
          </div>
        </React.Fragment>
      )
    }

    const elements = films.map((film) => {
      return (
        <React.Fragment key={film.id}>
          <ItemFilm
            key={film.id}
            poster_path={film.poster_path}
            original_title={film.title}
            release_date={film.release_date}
            overview={film.overview}
          />
        </React.Fragment>
      )
    })

    // const el = <Pagination onChange={this.changePage.bind(this)} total={pages} defaultCurrent={1} />

    return (
      <React.Fragment>
        <div className="films">
          <Online>
            <Input placeholder="Type to search..." onChange={this.onLabelChange.bind(this)} />
            {loading ? <Spin className="spin" /> : elements}
            <Pagination onChange={this.changePage.bind(this)} total={pages} defaultCurrent={1} />
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
      </React.Fragment>
    )
  }
}
