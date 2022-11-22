export default class Controller {
  constructor({ view, service }) {
    this.view = view
    this.service = service
  }

  static async initialize(deps) {
    const controller = new Controller(deps)
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