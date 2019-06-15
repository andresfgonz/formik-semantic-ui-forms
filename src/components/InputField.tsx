import React from 'react';
import { ErrorMessage, FastFieldProps } from 'formik';
import { Form } from 'semantic-ui-react';

interface ComponentProps extends FastFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
}

export const InputField: React.SFC<ComponentProps> = ({ field, label, type, placeholder }) => {
  return (
    <Form.Input
      {...field}
      label={label}
      className="with-message"
      type={type || 'text'}
      placeholder={placeholder || label}
    >
      <input />
      <span className="error-message"><ErrorMessage name={field.name} /></span>
    </Form.Input>
  )
};