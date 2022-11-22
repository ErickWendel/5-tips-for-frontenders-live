export default class Service {
  constructor({
    url
  }) {
    this.url = url
  }

  async getCharacters({ skip, limit}) {
    let data = []
    if (localStorage.getItem('characters')) {
      data = JSON.parse(localStorage.getItem('characters'))
    }
    else {
      data = (await (await fetch(this.url)).json()).results
      localStorage.setItem('characters', JSON.stringify(data))
    }

    return data.slice(skip, limit)
  }
}