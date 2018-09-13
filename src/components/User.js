import React from 'react';
import { connect } from 'react-redux';

class User extends React.Component {

    render() {
        const data = this.props.data;

        return (
            <div className="">
                <div className="card">
                    <div className="card-content">
                        <div className="media">
                            <div className="media-left">
                                <figure className="image is-48x48">
                                    <img src={data.avatar_url} alt="Placeholder image" />
                                </figure>
                            </div>
                            <div className="media-content">
                                <p className="title is-4">
                                    <a href={data.html_url} target="_blank">{data.login}</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(User);