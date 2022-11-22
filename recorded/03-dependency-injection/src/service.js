export default class Service {
  constructor({ url }) {
    this.url = url
  }
  async getCharacters({ skip, limit }) {
    let data = []
    const currentLocalStorageData = localStorage.getItem('characters')
    if(currentLocalStorageData) {
      data = JSON.parse(currentLocalStorageData)
    }
    else {
      data = (await (await fetch(this.url)).json()).results
      localStorage.setItem('characters', JSON.stringify(data))
    }

    return data.slice(skip, limit)
  }
}