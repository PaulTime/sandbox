import React from 'react';
import bemDecorator from 'cn-decorator';
import { reduxForm, Field } from 'redux-form';

@reduxForm({ form: 'login' })
@bemDecorator('login-form')
export default class LoginForm extends React.PureComponent {
  render(bem) {
    return (
      <section className={bem()}>
        <Field name="username" component="input" />
      </section>
    );
  }
}