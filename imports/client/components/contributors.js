import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { map } from 'lodash';

export default class Contributors extends Component {

  createContribList ({login, avatar_url, contributions}){
      return (
          <li key={login} className="list__images__contrib">
              <div className="image">
                <img src={avatar_url} alt={login} />
              </div>
              <div className="login">
                {login}
              </div>
              <div className="contributions">
                {contributions}
              </div>
           </li>
      )
  }

  toggleModal(e) {
      e.preventDefault();

    	const actionData = {
    		modalType:"contributors",
    		data: null
    	}

    	this.props.toggleModal(actionData);
  }

  render() {
      return (
  		  <div className="modal__dialog">
  		    <div className="modal__header">
  		      <h3>{`${this.props.data.repoName} - ${this.props.data.contributors.length}`}</h3>
  		      <a className="btn-close" onClick={this.toggleModal.bind(this)}>×</a>
  		    </div>
  		    <div className="modal__body">
  		        <ul className="list__images">
                { map(this.props.data.contributors, this.createContribList) }
              </ul>
  		    </div>
  		    <div className="modal__footer">
  		    </div>
  		  </div>
      );
  }
}

Contributors.propTypes = {
    data: PropTypes.object.isRequired,
    toggleModal: PropTypes.func.isRequired
};

