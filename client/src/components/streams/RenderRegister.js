import React from 'react'
import { connect } from 'react-redux'
import { createUser } from '../../actions'
import RegisterForm from './RegisterForm'
import { Grid, Segment } from 'semantic-ui-react'

class Register extends React.Component {
    onSubmit = formValues => {
        this.props.createUser(formValues);
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
                                <RegisterForm onSubmit={this.onSubmit} />

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
    { createUser }
)(Register);
