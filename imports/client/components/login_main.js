import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import { get } from 'lodash';

const LoginMessage = ({login, user}) => {

    return (
        <section className="main__login">
            <h1>Hello {user && get(user.services.github, "accessToken") ? user.services.github.username : ""}!</h1>
                { !user ?
                    (<div>
                        <h2>You are not connected, Please Login.</h2>
                        <h3>Or just search for a repository...</h3>
                        <div>
                            <a className="button button--big button--green" onClick={login}>
                                <span>Login</span>
                            </a>
                        </div>
                    </div>) : (<h2>You can start using the app</h2>)
                }
        </section>
    );
};

export default LoginMessage;
