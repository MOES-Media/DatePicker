//@flow
import React, { Component } from 'react';
import DatePicker from 'component'

class App extends Component<*> {
  render() {
    return (
        <div style={{margin: '48px'}}>
          <DatePicker placeholder="Datepicker"/>
          <DatePicker placeholder="Datepicker => Disabled" disabled/>
        </div>
    );
  }
}

export default App;
