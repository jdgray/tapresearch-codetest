import React, { Component } from 'react';
import './Error.scss';

class Error extends React.Component {
    render() {
        return (
            <div className="error">{this.props.error}</div>
        )
    }
}

export default Error;