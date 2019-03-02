import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';
import { Grid, Message, Segment } from 'semantic-ui-react'

class StreamCreate extends React.Component {
  onSubmit = formValues => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <div className='login-form'>
        {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
        <div>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Segment stacked>
                <StreamForm onSubmit={this.onSubmit} />

                <Message>
                  New to us? <a href='/register'>Sign Up</a>
                </Message>
                <Message>
                  <div class="ui facebook button">
                    <i class="facebook icon"></i>
                    <a href='/auth/facebook' style={{ color: "white" }}> Sign in Facebook</a>
                  </div>
                  <div class="ui google button red">
                    <i class="google icon"></i>
                    <a href='/auth/google' style={{ color: "white" }}>Google</a>
                  </div>

                </Message>
              </Segment>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { createStream }
)(StreamCreate);
