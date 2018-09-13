import React, { Component } from 'react';

import SearchBox from './components/SearchBox';
import UserList from './components/UserList';

import logo from './logo.svg';
import axios from 'axios';
import 'bulma/css/bulma.css';

class App extends Component {

  render() {
    return (
      <div className="container">
        <SearchBox />
        <UserList /> 
      </div>
    );
  }
}

export default App;
