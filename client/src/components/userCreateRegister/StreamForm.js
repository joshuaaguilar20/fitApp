import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Input, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

class StreamForm extends React.Component {


  renderInput = ({ input }) => {
    return (
      <div>
        <Input {...input} type="password"
          fluid
          icon='lock'
          iconPosition='left'
          style={{ "padding": "10px" }}
          placeholder='Password'
          pattern=".{1,10}" required title="password must be 8 to 20 characters long" />
      </div>
    );
  };

  renderUsername = ({ input }) => {
    return (
      <div>
        <Input {...input} type="email"
          fluid icon='user'
          name="email"
          iconPosition='left'
          placeholder='E-mail address'
          style={{ "padding": "10px" }}>
        </Input>
      </div>
    );
  };


  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <>
        <Header as='h2' color='black' textAlign='center'>
          Welcome to Fit App
            </Header>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field name="email" component={this.renderUsername} label="Enter Email" />
          <Field
            name="password"
            component={this.renderInput}
            label="Enter Password" />
          <Message style={{ "background-color": "white" }}>
            <Button>Submit</Button>
          </Message>
        </form>
      </>
    );
  }
}



export default reduxForm({
  form: 'streamForm'
})(StreamForm);








//           <Input
//             fluid
//             icon='lock'
//             iconPosition='left'
//             placeholder='Password'
//             type='password'
//             name="password"
//           />

//           <Button color='teal' fluid size='large' type="submit">
//             Login
//             </Button>




//   </div>
// )

// export default LoginForm