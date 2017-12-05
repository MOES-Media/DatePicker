import React from 'react'
import { shallow } from 'enzyme'
import DatePicker from '../../component'

describe('component <DatePicker />', () => {

    const renderComponent = (props) => shallow(<DatePicker {...props}/>)

    it('should render the component', () => {
        const renderedComponet = renderComponent({})
        expect(renderedComponet).toBePresent()
    })
})