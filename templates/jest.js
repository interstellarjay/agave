const TEMPLATE_JESTENZYME = `
import React from 'react'
import { mount } from 'enzyme'

describe('%%c%% | Component', () => {
    const component = mount(
        <%%c%% />
    )
    it ('matches snapshot', () => {
        expect(%%c%%).toMatchSnapshot()
    })
})
`

module.exports = {
    TEMPLATE_JESTENZYME
}