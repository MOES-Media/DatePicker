import React from 'react'
import { mount } from 'enzyme'
import {DatePicker} from '../../component'

describe('component <DatePicker />', () => {

    const renderComponent = (props) => mount(<DatePicker {...props}/>)

    it('should render the component', () => {
        const renderedComponet = renderComponent({})
        expect(renderedComponet).toBePresent()
    })

    it('should set the calender to visible on focus', () => {
        const renderedComponent = renderComponent({})
        renderedComponent.find('input').at(0).simulate('focus')
        expect(renderedComponent.state().isCalendarVisible).toBe(true)
    })

    it('should set the calendar\s visibility to false onClickOutside', () =>{
        const datePicker = new DatePicker()
        datePicker.handleClickOutside()
        expect(datePicker.state.isCalendarVisible).toBe(false)
    })
})