import React from 'react';
import { connect } from 'react-redux';



class GoogleAuth extends React.Component {


    render() {
        return (


            !this.props.auth ?
                <div className='right item'>
                    <a href="/">Login</a>
                </div>

                : <div className='right item'>
                    <a href="/api/logout">Logout</a>}
                </div>


        )
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(GoogleAuth);

