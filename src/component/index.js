//@flow
import React, { Component } from 'react'
import type { DatePickerProps, DatePickerState } from 'component/types'
import styled from 'styled-components'
import onClickOutside from 'react-onclickoutside'
import Input from 'component/Input'
import Calendar from 'component/Calendar'

const Wrapper = styled.div`position: relative; display:inline-block;`

export class DatePicker extends Component<DatePickerProps, DatePickerState>{

    static defaultProps = {
        isCalendarVisible: false
    }

    state = {
        isCalendarVisible: false,
    }

    _handleInputFocus(){
        this.setState({isCalendarVisible: true})
    }

    handleClickOutside(){
        this.state.isCalendarVisible && this.setState({isCalendarVisible: false})
    }

    render(){
        return(<Wrapper>
            <Input onFocus={this._handleInputFocus.bind(this)}
                   placeholder={this.props.placeholder}
                   disabled={this.props.disabled}/>
            <Calendar visible={!this.props.disabled && this.state.isCalendarVisible} />
        </Wrapper>)
    }
}

export default onClickOutside (DatePicker)