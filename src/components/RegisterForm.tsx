import React from 'react';
import { oc } from 'ts-optchain';
import { Field, Formik, FastField } from 'formik';
import { Button, Form, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';

import { InputField } from './InputField';

export type RegisterFormValues = {
  firstName?: string;
  lastName?: string;
  gender?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export type OnSubmitForm = (values: RegisterFormValues, onFinish: Function) => void;

type ComponentProps = {
  onSubmit: OnSubmitForm;
  formValues?: RegisterFormValues;
};

const genderOptions = [
  { key: 'male', value: 'male', text: 'Male' },
  { key: 'female', value: 'female', text: 'Female' }
];

export const RegisterForm: React.FC<ComponentProps> = ({ formValues, onSubmit }) => {

  const initialValues: RegisterFormValues = {
    firstName: oc(formValues).firstName(''),
    lastName: oc(formValues).lastName(''),
    email: oc(formValues).email(''),
    gender: oc(formValues).gender(genderOptions[0].value),
    password: oc(formValues).password(''),
    confirmPassword: oc(formValues).confirmPassword(''),
  };

  const validationSchema = Yup.object().shape<RegisterFormValues>({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().required('Email is required').email('Must be a valid email'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Must be equal than password'),
  });

  return (
    <Segment className="form-container">
      <h1>Register Form</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, formikActions) => {
          onSubmit(values, () => formikActions.setSubmitting(false));
        }}
        validationSchema={validationSchema}
        render={({ handleSubmit, values, handleChange, isSubmitting }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Form.Group widths="equal">
                <FastField name="firstName" component={InputField} label="First name" />
                <FastField name="lastName" component={InputField} label="Last name" />
              </Form.Group>
              <Form.Dropdown
                label="Gender"
                options={genderOptions}
                value={values.gender}
                onChange={(e, target) => handleChange({ target })}
                name="gender"
                selection
              />
              <FastField name="email" component={InputField} label="Email" />
              <Form.Group widths="equal">
                <FastField name="password" component={InputField} label="Password" type="password" />
                <FastField name="confirmPassword" component={InputField} label="Confirm password" type="password" />
              </Form.Group>
              <Button type="submit" loading={isSubmitting} fluid primary>Send</Button>
            </Form>
          )
        }}
      />
    </Segment>
  );
};



