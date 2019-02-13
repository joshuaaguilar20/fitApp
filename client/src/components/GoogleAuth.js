import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';


class GoogleAuth extends React.Component {


    render() {
        return (


            !this.props.auth ?
                <div className='right item'>
                    {null}
                </div>

                : <div className='right item'>
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
