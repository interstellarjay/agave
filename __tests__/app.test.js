require('jest')

const { TEMPLATE_REACT } = require('../templates/react')
const { TEMPLATE_STORYBOOK } = require('../templates/story')
const { TEMPLATE_JESTENZYME } = require('../templates/jest')

describe('Functions', () => {
    it('has a lovely day', () => {
        const result = 'lovely'
        const day = result
        expect(day).toBe(result)
    })
})