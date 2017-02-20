import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleModal } from '../actions/modal';
import Spinner from './spinner';

class RepositoriesList extends Component {

	toggleModel(repoName, contributors) {

		let atctionData = {
			modalType:"contributors",
			data: { repoName, contributors }
		}

		this.props.toggleModal(atctionData);
	}

	renderRepos({repoName, stars, watchers, forks, score, lastUpdate, contributors}) {

		let nonContribClass = contributors.length > 0 ? "" : "u-hidden";

		return (
			<li key={repoName} className="list__item u-clearFix">
				<header className="list__item__name">
					<span  title={repoName}>{repoName}</span>
				</header>

				<section className="list__item__info u-clearFix">
					<span className="info__item info__item--stars">{stars}<i className="fa fa-star"></i></span>

					<span className="info__item info__item--watch">{watchers}<i className="fa fa-eye"></i></span>

					<span className="info__item info__item--score">{score}<i className="fa fa-trophy"></i></span>

					<span className="info__item__info__item--update">{lastUpdate}</span>

				</section>

				<footer className="list__item__button-container">
					<button className={`button button--small button--contrib button--grey ${nonContribClass}`}
							onClick={this.toggleModel.bind(this, repoName, contributors)}>
						{`${contributors.length} Contributors`}
					</button>
				</footer>

			</li>
		);
	}

	createMessage(text, isLoading=false) {
		return 	(
			<div className="main__login">
				<h2>{text}</h2>
				{
					isLoading === true &&
					<Spinner/>
				}
			</div>
		)
	}


	render() {
		const isRepositories = this.props.data &&
			this.props.data.length > 0;

		return (
			<div className="">
				<div className="user-details"></div>

				{
					this.props.isPending &&
					this.createMessage("Loading...", true)
				}

				{
					isRepositories &&
					<ul className="list u-clearFix">
						{
							this.props.data.map(this.renderRepos.bind(this))
						}
					</ul>
				}

				{
					!isRepositories && !this.props.isPending && !this.props.isError &&
					this.createMessage("Please search for user repositories")
				}

				{
					this.props.isError &&
					this.createMessage("There was an error, please try again...")
				}

			</div>
		);
	}
}


function mapStateToProps ({repositories}) {
	return { ...repositories }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ toggleModal }, dispatch)
}

RepositoriesList.propTypes = {
	isPending: PropTypes.bool.isRequired,
	isError: PropTypes.bool.isRequired,
	data: PropTypes.array.isRequired,
	toggleModal: PropTypes.func.isRequired
};


export default connect(mapStateToProps, mapDispatchToProps)(RepositoriesList);

