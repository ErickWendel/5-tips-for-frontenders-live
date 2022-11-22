import {
  describe,
  it
} from 'node:test'
import {
  deepStrictEqual,
  CallTracker
} from 'node:assert'
const tracker = new CallTracker()
process.on('exit', () => tracker.verify())

import Controller from '../src/controller.js'
import View from '../src/view.js'

const mockedData = [{
  name: 'morty smith',
  image: 'https://',
  age: 30,
  birthDay: new Date()
}, {
  name: 'pickle rick',
  image: 'https://',
  age: 30,
  birthDay: new Date()
}]
describe('Unit tests for frontend', () => {
  it('should add a property if name contains smith and remove all other props', () => {
    const expected = [{
      name: 'morty smith',
      image: 'https://',
      isBold: true,
    }, {
      name: 'pickle rick',
      image: 'https://',
      isBold: false,
    }]
    const controller = new Controller({
      service: {},
      view: {}
    })
    const result = controller.prepareItems(mockedData)
    deepStrictEqual(result, expected)
  })
  it('shoudl verify either all functions were called properly',async () => {
    let htmlResult = ''
    const globalObject = {
      document: {
        querySelector: tracker.calls(() => {
          return {
            set innerHTML(value) {
              htmlResult = value
            }
          }
        })
      }
    }
    globalThis = {
      ...globalThis,
      ...globalObject
    }

    const service = {
      getCharacters: tracker.calls(() => mockedData)
    }

    const view = new View()
    view.updateTable = tracker.calls(view.updateTable)


    await Controller.initialize({
      service,
      view
    })
    const [{
      arguments: serviceCall
    }] = tracker.getCalls(service.getCharacters)
    deepStrictEqual(serviceCall, [{
      skip: 0,
      limit: 5
    }])

    const [{
      arguments: viewCall
    }] = tracker.getCalls(view.updateTable)
    deepStrictEqual(viewCall, [
      [{
          isBold: true,
          name: 'morty smith',
          image: 'https://'
        },
        {
          isBold: false,
          name: 'pickle rick',
          image: 'https://'
        }
      ]
    ])

    deepStrictEqual(
      htmlResult, 
      `<li><img width=50px src="https://"/> <strong>morty smith</strong></li><br><li><img width=50px src="https://"/> pickle rick</li>`
      )
  })

})