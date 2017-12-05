//@flow
import React, { Component } from 'react'
import type { CalendarProps } from 'component/types'
import styled from 'styled-components'

const Calendar = styled.div`
    position: absolute;
    width: 260px;
    height: 250px;
    padding: 5px;
    overflow: hidden;
    background: #ffffff;
    border-radius: 3px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.5);
    z-index: 9999;
    visibility: visible;
    opacity: 1;
    transition: opacity 100ms linear;
`

export default class extends Component<CalendarProps>{

    render(){
        return this.props.visible ?
            <Calendar>
                <h2>Hello Calendar</h2>
            </Calendar> : null
    }
}