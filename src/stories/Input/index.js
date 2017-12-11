import React from 'react'
import { storiesOf } from '@storybook/react'
import Input from '../../component/Input'

storiesOf('Input', module)
    .add('default state', () => <Input />)
    .add('disabled state', () => <Input disabled />)