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
        const {users, activeTab} = this.props;

        return (
            <div className="userlist-wrapper">
                <div className="content">
                    <Tab activeTab={activeTab} />
                    <div className="users">
                        {
                            this.generateUsers(users)
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default UserList;