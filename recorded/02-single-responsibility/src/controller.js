import config from './config.json' assert { type: "json"}
import Service from './service.js'
import View from './view.js'

export default class Controller {
  constructor() {
    this.service = new Service({
      url: config.url
    })
    this.view = new View()    
  }
  static async initialize() {
    const controller = new Controller()
    await controller.init()
  }

  async init() {
    const chars = await this.service.getCharacters({ skip: 0, limit: 5 })
    const data = this.prepareItems(chars)
    this.view.updateTable(data)
  }

  prepareItems(chars) {
    return chars.map(({name, image}) => {
      return {
        isBold: /smith/i.test(name),
        name,
        image,
      }
    })
  }
}