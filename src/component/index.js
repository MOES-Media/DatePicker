//@flow
import React, { Component } from 'react'
import type { DatePickerProps, DatePickerState } from 'component/types'
import styled from 'styled-components'
import Input from 'component/Input'
import Calendar from 'component/Calendar'

const Wrapper = styled.div`position: relative;`

export default class extends Component<DatePickerProps, DatePickerState>{

    static defaultProps = {
        isCalendarVisible: false
    }

    state = {
        isCalendarVisible: true,
    }

    render(){
        return(<Wrapper>
            <Input placeholder={this.props.placeholder} disabled={this.props.disabled}/>
            <Calendar visible={!this.props.disabled && this.state.isCalendarVisible} />
        </Wrapper>)
    }
}