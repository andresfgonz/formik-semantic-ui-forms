import React, { Component } from 'react';
import { OnSubmitForm, RegisterForm } from './components/RegisterForm';
import { InvitationsForm } from './components/InvitationsForm';

import 'semantic-ui-css/semantic.min.css';
import './App.scss';

class App extends Component {
  handleFormSubmit: OnSubmitForm = (values, onFinish) => {
    setTimeout(() => {
      console.log(values);
      onFinish();
    }, 2000);
  };

  render() {
    return (
      <div className="app">
        <RegisterForm onSubmit={this.handleFormSubmit} />
        <InvitationsForm onSubmit={this.handleFormSubmit} />
      </div>
    );
  }
}

export default App;
