export default class MovieService {
  constructor() {
    ;(this._apiBase = 'https://api.themoviedb.org/3/search/movie?query='), (this.title = '')
  }

  async GetGenres() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYTY4ZjNhMDNkYjA1NzgzZjM3ODBjZGI0ZDc0ZWM3NiIsInN1YiI6IjY1OTAwZTNiNDFhNTYxNjY3NTA0ODA1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SGGXJEWRrPAUfjbll-BchqRscWpmQzayAEkAd2hgnRs',
      },
    }
    const genres = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
    return await genres.json()
  }

  async GetResource(url) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYTY4ZjNhMDNkYjA1NzgzZjM3ODBjZGI0ZDc0ZWM3NiIsInN1YiI6IjY1OTAwZTNiNDFhNTYxNjY3NTA0ODA1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SGGXJEWRrPAUfjbll-BchqRscWpmQzayAEkAd2hgnRs',
      },
    }
    const res = await fetch(`${this._apiBase}${url}`, options)

    if (!res.ok) {
      throw new Error('Error')
    }
    return await res.json()
  }

  async getAllFilm(url) {
    const res = await this.GetResource(url)
    return res
  }

  async changePage(page, url) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYTY4ZjNhMDNkYjA1NzgzZjM3ODBjZGI0ZDc0ZWM3NiIsInN1YiI6IjY1OTAwZTNiNDFhNTYxNjY3NTA0ODA1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SGGXJEWRrPAUfjbll-BchqRscWpmQzayAEkAd2hgnRs',
      },
    }
    const res = await fetch(`${this._apiBase}${url}&page=${page}`, options)
    if (!res.ok) {
      throw new Error('Error')
    }

    return await res.json()
  }

  async createGuestSession() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYTY4ZjNhMDNkYjA1NzgzZjM3ODBjZGI0ZDc0ZWM3NiIsInN1YiI6IjY1OTAwZTNiNDFhNTYxNjY3NTA0ODA1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SGGXJEWRrPAUfjbll-BchqRscWpmQzayAEkAd2hgnRs',
      },
    }
    const res = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', options)
    if (!res.ok) {
      throw new Error('Error')
    }
    return await res.json()
  }

  async addRaiting(star, movie_id, guest_session_id) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: '',
      },
      body: `{"value":${star}}`,
    }
    fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/rating?api_key=2a68f3a03db05783f3780cdb4d74ec76&guest_session_id=${guest_session_id}`,
      options
    )
  }

  async getRatedMovies(guest_session_id) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: '',
      },
    }
    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${guest_session_id}/rated/movies?api_key=2a68f3a03db05783f3780cdb4d74ec76&language=en-US&page=1&sort_by=created_at.asc`,
      options
    )
    if (!res.ok) {
      throw new Error('Error')
    }
    return await res.json()
  }
}
