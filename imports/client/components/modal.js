import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component, PropTypes } from 'react';
import Contributors from './contributors';
import { toggleModal } from '../actions/modal';

class Modal extends Component {

	render() {
		if (!this.props.isModal) return null;

		document.onkeydown = (evt) => {
		    evt = evt || window.event;
		    if (evt.keyCode == 27 && this.props.isModal) {
		        this.props.toggleModal({modalType:"contributors",data: null});
		    }
		};

		let comp = (this.props.modalType === "contributors") ?
			<Contributors data={this.props.modalData} toggleModal={this.props.toggleModal} /> : "";

		return (
			<div className="modal">
				{ comp }
			</div>
		);
	}
}

function mapStateToProps ({modal}) {
	return {
		...modal
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ toggleModal }, dispatch)
}

Modal.propTypes = {
	toggleModal: PropTypes.func.isRequired,
	modalType: PropTypes.string.isRequired
};


export default connect(mapStateToProps, mapDispatchToProps)(Modal);

