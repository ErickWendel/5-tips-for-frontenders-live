import Service from './service.js'
import View from './view.js'
// não funciona no firefox...
import config from './config.json' assert { type: "json" };

import Controller from "./controller.js"

Controller.initialize({
  service: new Service({url: config.url }),
  view: new View()
})
