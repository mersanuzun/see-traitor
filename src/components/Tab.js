import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const tabs = [
    {
        id: "followers",
        display: "Followers"
    },
    {
        id: "followings",
        display: "Following"
    },
    {
        id: "notFollowed",
        display: "Not Followed"
    },
    {
        id: "traitors",
        display: "Traitors"
    }
];

class Tab extends React.Component {

    constructor(props) {
        super(props);
    }

    generateTabs(activeTab) {
        return (
            tabs.map(tab => {
                return (
                    <li
                        key={tab.id}
                        className={activeTab === tab.id ? "is-active": ""}
                    >

                        <a
                            onClick={() => this.props.changeUserListTab(tab.id)}
                        >
                            <span className="icon is-small"><i className="fas fa-image" aria-hidden="true"></i></span>
                            <span>{tab.display}</span>
                        </a>
                    </li>
                )
            })
        )
    }

    render() {
        return (
            <div>
                <div className="tabs is-centered">
                    <ul>
                        {this.generateTabs(this.props.activeTab)}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Tab;