import React from 'react'
import { shallow } from 'enzyme'
import Input from '../../component/Input'

describe('component <Input />', () => {

    const renderComponent = (props) => shallow(<Input {...props} />)

    it('should render the component', () => {
        const renderedComponent = renderComponent({value: 'test'})
        expect(renderedComponent).toBePresent()
    })

    it('should set the focus state accordingly', () => {
        const mockFunctions = {onBlur: () => ({})}
        spyOn(mockFunctions, 'onBlur')
        const renderedComponent = renderComponent({value: 'test', onBlur: mockFunctions.onBlur})
        renderedComponent.simulate('focus')
        expect(renderedComponent.state().focus).toBe(true)
        renderedComponent.simulate('blur')
        expect(renderedComponent.state().focus).toBe(false)
        expect(mockFunctions.onBlur).toHaveBeenCalled()
    })

    it('should handle onChange events', () => {
        const renderedComponent = renderComponent({})
        renderedComponent.simulate('change', {target : {value: 'a'}})
        expect(renderedComponent.state().value).toBe('a')
    })

    it('shouldn\'t update the state when disabled', () => {
        const renderedComponent = renderComponent({disabled: true})
        renderedComponent.simulate('focus')
        expect(renderedComponent.state().focus).toBe(false)
        renderedComponent.simulate('change', {target: {value: 'test'}})
        expect(renderedComponent.state().value).toBe(undefined)
    })
})