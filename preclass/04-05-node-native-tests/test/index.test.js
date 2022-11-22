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
  image: 'http://',
  age: 20,
  birthDay: new Date()
}, {
  name: 'pickle rick',
  image: 'http://',
  age: 20,
  birthDay: new Date()
}]


describe('Unit tests on frontend', () => {
  it('should add a property if name contains smith and remove all other props', () => {
    const controller = new Controller({
      view: {},
      service: {}
    })
    const expected = [{
      name: 'morty smith',
      image: 'http://',
      isBold: true
    }, {
      name: 'pickle rick',
      image: 'http://',
      isBold: false
    }]

    const result = controller.prepareItems(mockedData)
    deepStrictEqual(result, expected)
  })

  it('should verify either all functions were called properly', async () => {
    // quiser testar o document - não existe no Node.js então adicionamos no global
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

    const view = new View()
    view.updateTable = tracker.calls(view.updateTable)

    const service = {
      getCharacters: tracker.calls(() => mockedData)
    }

    const controller = new Controller({
      view,
      service
    })

    await controller.init(mockedData)

    const [{
      arguments: updateTableCall
    }] = tracker.getCalls(view.updateTable)

    const [{
      arguments: serviceCall
    }] = tracker.getCalls(service.getCharacters)

    deepStrictEqual(updateTableCall, [
      [{
          isBold: true,
          name: 'morty smith',
          image: 'http://'
        },
        {
          isBold: false,
          name: 'pickle rick',
          image: 'http://'
        }
      ]
    ])

    deepStrictEqual(serviceCall, [{
      skip: 0,
      limit: 5
    }])

    deepStrictEqual(
      htmlResult,
      `<li><img width=50px src="http://" /> <strong>morty smith</strong></li><br><li><img width=50px src="http://" /> pickle rick</li>`,
    )
  })
})