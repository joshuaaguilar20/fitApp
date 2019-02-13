import React from 'react'
import { Button, Input, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

const LoginForm = () => (
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
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='black' textAlign='center'>
                    Login to get Started
        </Header>

                <Segment stacked>
                    <Input fluid icon='user' name="password" iconPosition='left' placeholder='E-mail address' />
                    <Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        name="password"
                    />

                    <Button color='teal' fluid size='large' type="submit">
                        Login
            </Button>
                </Segment>

                <Message>
                    New to us? <a href='/auth/register'>Sign Up</a>
                </Message>
                <Message>
                    <div class="ui facebook button">
                        <i class="facebook icon"></i>
                        <a href='/auth/facebook' style={{ color: "white" }}>Facebook</a>
                    </div>

                </Message>
                <Message>
                    <div class="ui google button red">
                        <i class="google icon"></i>
                        <a href='/auth/google' style={{ color: "white" }}>Google</a>
                    </div>

                </Message>
            </Grid.Column>
        </Grid>
    </div>
)

export default LoginForm