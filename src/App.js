//@flow
import React, { Component } from 'react';
import DatePicker from 'component'

class App extends Component<*> {
  render() {
    return (
        <div>
        <div style={{margin: '48px'}}>
          <DatePicker placeholder="Datepicker"/>
        </div>
        <div style={{margin: '48px'}}>
          <DatePicker placeholder="Datepicker => Disabled" disabled/>
        </div>
        </div>
    );
  }
}

export default App;
