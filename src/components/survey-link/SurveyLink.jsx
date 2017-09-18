import React, { Component } from 'react';
import './SurveyLink.scss';

class SurveyLink extends React.Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    window.open(this.props.offer.link);
  }

  render() {
    return (
      <div className="survey-link">
        <div className="minmax">min:{this.props.offer.min} max:{this.props.offer.max} {this.props.offer.currency}</div>
        <div>
          <button onClick={this.handleClick}>Take Survey</button>
        </div>
      </div>
    )
  }
}

export default SurveyLink;