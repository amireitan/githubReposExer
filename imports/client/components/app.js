import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import Header from './header';
import ReposList from './repositories_list';
import LoginMessage from './login_main';
import Modal from './modal';

class App extends Component {
  constructor() {
    super();
  }

  loginWithGitHub() {
    Meteor.loginWithGithub({
        requestPermissions: ['user']
    }, err => {
        console.log("login was failed: ", err);
    });   
  }

  render() {
    return (
        <div>
          <Header isUser={this.props.isLoggin} loginWithGitHub={this.loginWithGitHub}/>
            <main className="main">
              {
                this.props.isStart ?
                <ReposList /> :
                <LoginMessage user={this.props.user} login={ this.props.isServiceConfigured ? this.loginWithGitHub : null} />
              }
            </main>
          <Modal />
        </div>
    );
  }
}

App.propTypes = {
    isServiceConfigured: PropTypes.bool.isRequired,
    isStart: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    isLoggin: state.auth.isLogIn,
    isServiceConfigured: state.auth.isServiceConfigured,
    isStart: state.repositories.isStart
  };
}

export default connect(mapStateToProps)(App);
