import React from 'react'
import { shallow } from 'enzyme'
import Calendar from  '../../component/Calendar'

describe('component <Calendar />', () => {
    const renderComponent = (props) => shallow(<Calendar {...props} />)

    it('should render the component', () => {
        const renderedComponent = renderComponent({visible: true})
        expect(renderedComponent).toBePresent()
    })

    it('should\'t render the component when visible is false', () => {
        const renderedComponent = renderComponent({visible: false})
        expect(renderedComponent.getElement()).toBeNull()
    })
})