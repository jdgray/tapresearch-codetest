import React from 'react';
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
      return this.handleError('User identifier required');
    }
    
    //
    // uses local server api to avoid cors issues on local
    //
    axios.get(`http://localhost:4000/api/survey/${this.state.userIdentifier}`)
      .then((res) => {

        if (res.error) {
          this.handleError('Error getting survey');
        } else {
          var data = res.data.data;
          // hanlde offer logic
          if (!data.has_offer) {
            this.handleError('No survey available');
          } else {
            const offer = {
              link: data.offer_url,
              min: data.message_hash.min,
              max: data.message_hash.max,
              currency: data.message_hash.currency
            };
            this.setState({error: '', offer: offer});
          }

        }

      })
      .catch((error) => {
        this.handleError('System error');
      });

  }

  handleError(error) {
    this.setState({
      error: error,
      offer: {
        link: '',
        min: 0,
        max: 0,
        currency: ''
      }
    });
  }

  handleChange(event) {
    if (event.target.value.length > 32) {
      this.handleError('User identifier must be <= 32 characters')
    } else {
      this.setState({userIdentifier: event.target.value});
    }
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