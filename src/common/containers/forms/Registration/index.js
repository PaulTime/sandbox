import React from 'react';
import PropTypes from 'prop-types';
import bemDecorator from 'cn-decorator';
import { required, email, length, numericality } from 'redux-form-validators';
import { reduxForm, Field, Form, } from 'redux-form';

import './index.scss';

@reduxForm({ form: 'registration' })
@bemDecorator('registration-form')
export default class RegistrationForm extends React.PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
  };

  static defaultProps = {
    handleSubmit: () => {},
    submitting: undefined,
  };

  render(bem) {
    const { handleSubmit, submitting } = this.props;

    return (
      <Form
        onSubmit={handleSubmit}
        className={bem()}
      >
        <div className={bem('field-wrap')}>
          <label className={bem('label')}>
            Username

            <Field
              name="username"
              component="input"
              id="username"
              validate={[required()]}
            />
          </label>
        </div>

        <div className={bem('field-wrap')}>
          <label className={bem('label')}>
            Mobile phone

            <Field
              name="phone"
              id="phone"
              component="input"
              validate={[
                required(),
                numericality({ int: true }),
                length({ is: 10 }),
              ]}
            />
          </label>
        </div>

        <div className={bem('field-wrap')}>
          <label className={bem('label')}>
            E-mail

            <Field
              name="email"
              id="email"
              component="input"
              validate={[
                required(),
                email(),
              ]}
            />
          </label>
        </div>

        <div className={bem('field-wrap')}>
          <label className={bem('label')}>
            Password

            <Field
              name="password"
              id="password"
              component="input"
              validate={[
                required(),
                length({ min: 5, message: 'too short' }),
              ]}
            />
          </label>
        </div>

        <button disabled={submitting} className={bem('submit')}>
          {submitting ? 'Sending...' : 'Sign un'}
        </button>
      </Form>
    );
  }
}