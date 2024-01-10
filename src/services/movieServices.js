export default class MovieService {
  constructor() {
    ;(this._apiBase = 'https://api.themoviedb.org/3/search/movie?query='), (this.title = '')
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
    this.title = url
    const res = await fetch(`${this._apiBase}${url}`, options)
    if (!res.ok) {
      throw new Error('Error')
    }

    return await res.json()
  }

  async getAllFilm(url) {
    const res = await this.GetResource(url)
    console.log(res)
    return res
  }

  async changePage(page) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYTY4ZjNhMDNkYjA1NzgzZjM3ODBjZGI0ZDc0ZWM3NiIsInN1YiI6IjY1OTAwZTNiNDFhNTYxNjY3NTA0ODA1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SGGXJEWRrPAUfjbll-BchqRscWpmQzayAEkAd2hgnRs',
      },
    }
    const res = await fetch(`${this._apiBase}${this.title}&page=${page}`, options)
    if (!res.ok) {
      throw new Error('Error')
    }

    return await res.json()
  }
}
