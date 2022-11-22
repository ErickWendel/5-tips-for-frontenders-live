import Service from './service.js'
// não funciona no firefox...
import config from './config.json' assert {  type: "json" };

const service = new Service({
  url: config.url
})
const chars = (await service.getCharacters()).slice(0, 5);

const boldIfSmith = (name) => /smith/i.test(name) ? `<strong>${name}</strong>` : name

const htmlEl = chars
  .map(item => `<li><img width=50px src="${item.image}" /> ${boldIfSmith(item.name)}</li>`).join("<br>")


// não precisa colocar mais o window.onload
const output = document.querySelector('#output')
output.innerHTML = htmlEl