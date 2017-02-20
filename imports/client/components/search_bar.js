import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchRepositories } from '../actions/fetch_repositories';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';

class SearchBar extends Component {

	constructor(props) {
		super(props);

		this.state = { text: '', isChanged: false};
		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit  = this.onFormSubmit.bind(this);
	}


	onInputChange(e){
		this.setState({ text: e.target.value, isChanged: true})
	}

	onFormSubmit(e) {
		e.preventDefault();

		this.props.fetchRepositories(this.state.text);
	}

	componentWillReceiveProps(nextProps) {
		if (!this.state.isChanged) {
			this.setState({ text: get(this.props.user, "username") || ''});
		}
	}

	render() {
		return (
			<form onSubmit={this.onFormSubmit} className="search-bar__form">
				<input type="text"
					placeholder="Search for User Repos"
					className="form-control"
					value={this.state.text}
					onChange={this.onInputChange}/>
				<span className="input-group-btn">
					<button type="submit" className={`button button--mid button--search`}>Search</button>
				</span>
			</form>
		)
	}
}


function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchRepositories }, dispatch)
}

function mapStateToProps(state) {
  return {
  	user: get(state.auth.user, 'services.github')
  };
}

SearchBar.propTypes = {
	fetchRepositories: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
