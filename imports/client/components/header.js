import React, { Component, PropTypes } from 'react';
import SearchBar from './search_bar';


export default class Header extends Component {
	createButton() {
		const clickHandler = this.props.isUser ? Meteor.logout : this.props.loginWithGitHub;
		const text         = this.props.isUser ? "Logout" : "Login";

		return (
			<a className="button button--mid button--grey" onClick={clickHandler}>
				<span>{text}</span>
			</a>
		);
	}

	render() {
		return (
			<header className="app__header">
				<nav className="u-textCenter u-sizeFill u-clearFix">
					<ul className="app__header__menu-buttons__log">
						<li>
							{ this.createButton() }
						</li>
					</ul>
					<SearchBar isUser={this.props.isUser}/>
				</nav>
			</header>
		);
	}
}

Header.propTypes = {
	isUser: PropTypes.bool.isRequired
};
