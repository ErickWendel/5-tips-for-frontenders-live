export default class Service {
  constructor({
    url
  }) {
    this.url = url
  }

  async getCharacters() {
    if (localStorage.getItem('characters')) {
      return JSON.parse(localStorage.getItem('characters'))
    }

    const data = (await (await fetch(this.url)).json()).results
    localStorage.setItem('characters', JSON.stringify(data))

    return data
  }
}