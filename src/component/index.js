//@flow
import React, { Component } from 'react'
import type { DatePickerProps } from 'component/types'
import Input from 'component/Input'

export default class extends Component<DatePickerProps>{

    static defaultProps = {
        isCalendarVisible: false
    }

    render(){
        return(<Input placeholder={this.props.placeholder} disabled={this.props.disabled}/>)
    }
}