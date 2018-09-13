import React from 'react';
import { connect } from 'react-redux';

import User from './User';
import Tab from './Tab';
import Loading from './Loading.js';

import './UserList.css';

class UserList extends React.Component {

    constructor(props) {
        super(props);
    }

    generateUsers(users) {
        return users.map(user => {
            return (
                <User
                    key={user.node_id}
                    data={user}
                />
            )
        })
    }

    render() {
        return (
            <div className="userlist-wrapper">
                <div className="content">
                    {
                        this.props.isFetching ? <Loading /> : (
                            this.props.error ? (
                                this.props.error.message
                            ) : (
                                    <div>
                                        <Tab />
                                        <div className="users">
                                            {
                                                this.generateUsers(this.props.users)
                                            }
                                        </div>
                                    </div>
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

export default connect(mapStateToProps)(UserList);