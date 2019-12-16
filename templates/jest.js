const TEMPLATE_JESTENZYME = `
import React from 'react'
import { mount } from 'enzyme'

describe('%%_CMP_%% | Component', () => {
    const component = mount(
        <%%_CMP_%% />
    )
    it ('matches snapshot', () => {
        expect(%%_CMP_%%).toMatchSnapshot()
    })
})
`

module.exports = {
    TEMPLATE_JESTENZYME
}