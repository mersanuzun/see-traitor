import React from 'react';
import { makeDebounce } from '../utils';
import * as actions from '../actions';
import { connect } from 'react-redux';
import github from "../img/github.jpg";

import './SearchBox.css';

class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.debounceFn = makeDebounce(this, 700);
    }

    render() {
        console.log(github)
        return (
            <div className="searchbox-wrapper">
                <div className="github-wrapper">
                    <img src={github} />
                </div>
                <div className="field">
                    <input
                        className="input is-rounded"
                        type="text"
                        placeholder="Username"
                        onChange={
                            (e) => {
                                const value = e.target.value;
                                value && this.debounceFn(() => this.props.fetchFollowersAndFollowings(value));
                            }
                        }
                    />
                </div>
            </div>
        );
    }
}

export default connect(null, actions)(SearchBox);