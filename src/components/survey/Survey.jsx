import React, { Component } from 'react';
import axios from 'axios';
import Error from '../error/Error';
import SurveyLink from '../survey-link/SurveyLink';
import './Survey.scss';

class Survey extends React.Component {

  constructor() {
    super();
    this.state = {
      offer: {
        link: '',
        min: 0,
        max: 0,
        currency: ''
      },
      userIdentifier: '',
      error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {

    if (!this.state.userIdentifier) {
        return this.setState({error: 'User identifier required'});
    }

    axios.get(`http://localhost:4000/api/survey/${this.state.userIdentifier}`)
      .then((res) => {


        if (res.error) {
          this.setState({error: 'Error getting survey'});
        } else {
          var data = res.data.data;
          // hanlde offer logic
          if (!data.has_offer) {
            this.setState({error: 'No survey available'});
          } else {
            const offer = {
              link: data.offer_url,
              min: data.message_hash.min,
              max: data.message_hash.max,
              currency: data.message_hash.currency
            };
            this.setState({offer: offer});
          }

        }

      })
      .catch((error) => {
        this.setState({error: 'Unhandled error'});
      });

  }

  handleChange(event) {
    this.setState({userIdentifier: event.target.value});
  }

  render() {
    return (
      <div className="container">
        { this.state.error && <Error error={this.state.error} /> }
        <div className="survey">
          <input type="text" value={this.state.userIdentifier} onChange={this.handleChange} />
          <button onClick={this.handleClick}>submit</button>
        </div>
        { this.state.offer.link && <SurveyLink offer={this.state.offer} /> }
      </div>
    );
  }
}

export default Survey;