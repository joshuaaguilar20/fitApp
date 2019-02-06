import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';


class GoogleAuth extends React.Component {

    componentDidMount = () => {

    }

    render() {
        return (
            <div className="item">{!this.props.auth ? <a href="/auth/google">
                <div class="ui google plus button">
                    <i class="google plus icon"></i>
                    Google Plus
                </div></a> :
                <a href="/api/logout">Logout</a>}
            </div>

        )
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(GoogleAuth);
// const mapStateToProps = state => {
//   return { isSignedIn: state.auth.isSignedIn };
// };

// export default connect(
//   mapStateToProps,
//   { signIn, signOut }
// )(GoogleAuth);
