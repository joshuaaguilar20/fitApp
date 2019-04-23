import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import StreamCreate from './userCreateRegister/StreamCreate';
import RenderRegister from '../components/userCreateRegister/RenderRegister';
import Header from './Header';
import history from '../history';
import * as actions from '../actions';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import { PrivateRoute } from './PrivateRoute';
import BlogNew from './blogs/BlogNew';
import BlogShow from './blogs/BlogShow';
import AdminLayout from './layouts/Admin/Admin';
import RTLLayout from "./layouts/RTL/RTL.jsx";
import "./assets/demo/demo.css";
import "./assets/css/nucleo-icons.css";


class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser()
    console.log(this.props.auth);
  }

  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Switch>
              <Route path="/blogs/new" component={BlogNew} />
              <Route exact path="/blogs/:_id" component={BlogShow} />

              <PrivateRoute isAuthenticated={this.props.auth} path="/Dashboard" exact component={Dashboard} />
              <Route path="/register" exact component={RenderRegister} />
              <Route path="/admin" render={props => <AdminLayout {...props} />} />
              <Route path="/rtl" render={props => <RTLLayout {...props} />} />
              <Redirect from="/" to="/admin/dashboard" />
            </Switch>
          </div>
        </Router>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, actions)(App)
