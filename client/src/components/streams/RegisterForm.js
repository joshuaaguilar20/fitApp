import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Input, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

class RegisterForm extends React.Component {
    renderInput = ({ input }) => {
        return (
            <div>
                <Input {...input} type="password"
                    fluid
                    icon='lock'
                    iconPosition='left'
                    name="password"
                    style={{ "padding": "10px" }}
                    placeholder='Password'
                    pattern=".{8,20}" required title="password must be 8 to 20 characters long" />
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


    renderGoal = ({ input }) => {
        return (
            <div>
                <Input {...input} type="text"
                    fluid icon='globe'
                    name="goal"
                    iconPosition='left'
                    placeholder='Fitness Goal'
                    style={{ "padding": "10px" }}>
                </Input>
            </div>
        );
    };


    renderpassword2 = ({ input }) => {
        return (
            <div>
                <Input {...input} type="password"
                    fluid icon='lock'
                    name="password2"
                    iconPosition='left'
                    style={{ "padding": "10px" }}
                    placeholder=' Re-Enter Password'
                    pattern=".{8,20}" required title="password must be 8 to 20 characters long" />
            </div>
        );
    };



    renderbirthday = ({ input }) => {
        return (
            <div>
                <Input {...input} type="date"
                    fluid icon='user'
                    name="DOB"
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
                    Sign Up Below
            </Header>
                <form
                    onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name="email" component={this.renderUsername} label="Enter Email" />
                    <Field name="password" component={this.renderInput} label="Enter Password" />
                    <Field name="password2" component={this.renderpassword2} label="Re-enter Password" />
                    <Field name="DOB" component={this.renderbirthday} label="Enter birthday " />
                    <Field name="goal" component={this.renderGoal} label=" Enter Fitness Goal" />
                    <Message style={{ "background-color": "white" }}>
                        <Button>Sign Up </Button>
                    </Message>
                </form>
            </>
        );
    }
}



export default reduxForm({
    form: 'streamForm'
})(RegisterForm);

