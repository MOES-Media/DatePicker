//@flow
import React, { Component } from 'react'
import 'component/Icons'
import styled from 'styled-components'
import type {InputProps, InputState} from 'component/types'

const Input = styled.input
    .attrs({type: "text"})`
    box-sizing: border-box;
    overflow: visible;
    -webkit-appearance: none;
    -moz-appearance: none;
    box-shadow: none;
    transition: box-shadow .1s ease, border-color .1s ease;
    border-radius: 4px;
    color: ${props => props.focus ? 'rgba(0,0,0,.8)' : 'rgba(0,0,0,.87)'};
    border: 1px solid ${props => props.focus ? '#85b7d9' : 'rgba(34,36,38,.15)'};
    background: #ffffff;
    padding: 10px 16px;
    line-height: 20px;
    text-align: left;
    -webkit-tap-highlight-color: rgba(255,255,255,0);
    outline: 0;
    flex: 1 0 auto;
    -webkit-box-flex: 1;
    -ms-flex: 1 0 auto;
    max-width: 100%;
    margin: 0;
`

export default class extends Component<InputProps, InputState>{

    static defaultProps = {
        value: ''
    }

    state = {
        focus: false
    }

    _handleFocus(){
        !this.props.disabled && this.setState({focus: true})
    }

    _handleBlur(){
        !this.props.disabled && this.setState({focus: false})
    }

    _handleOnChange({target}: {target: HTMLInputElement}){
        !this.props.disabled && this.setState({value: target.value})
    }

    render(){
        return(<Input
            onFocus={this._handleFocus.bind(this)}
            onBlur={this._handleBlur.bind(this)}
            onChange={this._handleOnChange.bind(this)}
            {...this.props}
            {...this.state}/>)
    }
}
