import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import StreamCreate from './userCreateRegister/StreamCreate';
import RenderRegister from '../components/userCreateRegister/RenderRegister';
import Header from './Header';
import history from '../history';
import * as actions from '../actions';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import { PrivateRoute } from './PrivateRoute';



class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return (
      <div className="ui container">
        <Router history={history}>
          <div>
            <Header />
            <Switch>
              <Route path="/null" exact component={null} />
              <Route path="/" exact component={StreamCreate} />
              <PrivateRoute isAuthenticated={this.props.auth} path="/Dashboard" exact component={Dashboard} />
              <Route path="/register" exact component={RenderRegister} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  };
}
function mapStateToProps(state) {
  return { auth: state.auth };
}
;
export default connect(mapStateToProps, actions)(App)
