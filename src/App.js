import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import SearchBox from './components/SearchBox';
import UserList from './components/UserList';
import Loading from './components/Loading';

import 'bulma/css/bulma.css';

class App extends Component {

  render() {
    const { users, activeTab, error, isFetching } = this.props;
  
    return (
      <div className="container">
        <SearchBox />
        <div className="content" style={{textAlign: "center"}}>
          {
            isFetching ? (<Loading />) : (
              error ? (
                error.message
              ) : (
                  <UserList
                    users={users}
                    activeTab={activeTab}
                  />
                )
            )
          }
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const activeTab = state.appView.userListTab.activeTab;
  const isFetching = state.githubUser.isFetching;

  return {
    users: state.githubUser.data[activeTab],
    error: state.githubUser.error,
    activeTab,
    isFetching
  }
}


export default connect(mapStateToProps)(App);
