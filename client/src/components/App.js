import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import RenderRegister from '../components/streams/RenderRegister';
import Header from './Header';
import history from '../history';
import * as actions from '../actions';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';


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
              <Route path="/streams/edit/:id" exact component={StreamEdit} />
              <Route path="/streams/delete/:id" exact component={StreamDelete} />
              <Route path="/Dashboard" exact component={Dashboard} />
              <Route path="/register" exact component={RenderRegister} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  };
}
export default connect(null, actions)(App)
