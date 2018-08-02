import React from 'react';
import PropTypes from 'prop-types';
import bemDecorator from 'cn-decorator';
import { required } from 'redux-form-validators';
import { reduxForm, Field, Form, } from 'redux-form';

@reduxForm({ form: 'login' })
@bemDecorator('login-form')
export default class LoginForm extends React.PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func,
  };

  static defaultProps = {
    handleSubmit: () => {},
  };

  render(bem) {
    const { handleSubmit } = this.props;

    return (
      <Form
        onSubmit={handleSubmit}
        className={bem()}
      >
        <Field
          name="username"
          component="input"
          validate={[required()]}
        />
      </Form>
    );
  }
}