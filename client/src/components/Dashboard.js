import React from 'react'
import { connect } from 'react-redux';
import * as actions from "../actions";




class Dashboard extends React.Component {
    componentDidMount() {
        this.props.fetchUser();
    }


    render() {
        return (

            <h2> Welcome To Fit App  </h2>

        )
    }
}


export default connect(
    null,
    actions
)(Dashboard);