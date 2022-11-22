import Service from './service.js'
import View from './view.js'
// não funciona no firefox...
import config from './config.json' assert { type: "json" };

export default class Controller {
  constructor() {

    this.view = new View()
    this.service = new Service({
      url: config.url
    })

  }

  static async initialize() {
    const controller = new Controller()
    await controller.init()
    return;
  }

  async init() {
    const chars = (await this.service.getCharacters()).slice(0, 5);
    const data = this.prepareItems(chars)
    this.view.updateTable(data)
  }

  prepareItems(chars) {
    return chars.map(({
      name, image
    }) => {

      return {
        isBold: /smith/i.test(name),
        name,
        image
      }
    })
  }
}