import React from 'react';
import { Segment, Button, Icon } from 'semantic-ui-react';
import { Formik, FieldArray, FastField } from 'formik';
import { Form } from 'semantic-ui-react';
import { oc } from 'ts-optchain';
import { InputField } from './InputField';
import * as Yup from 'yup';

export type InvitationsFormValues = {
  friends: string[];
}

type ComponentProps = {
  onSubmit: Function;
}

export const InvitationsForm: React.FC<ComponentProps> = ({ onSubmit }) => {
  const initialValues: InvitationsFormValues = {
    friends: ['katherin@hotmail.es'],
  };

  return (
    <Segment className="form-container">
      <h1>Birthday Invitations</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, formikActions) => {
          onSubmit(values, () => formikActions.setSubmitting(false));
        }}
        validationSchema={Yup.object().shape<InvitationsFormValues>({
          friends: Yup.array().of(Yup.string()
            .required('This field is required')
            .email('Must be a valid email'))
        })}
        render={({ handleSubmit, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <FieldArray
              name="friends"
              render={({ push, remove }) => (
                <div>
                  {oc(values).friends([]).map((friend, index) => (
                    <div className="invitation-field" key={index}>
                      <FastField
                        component={InputField}
                        name={`friends.${index}`}
                        placeholder="Friend email"
                      />
                      <div className="remove-icon" onClick={() => remove(index)}>
                        <Icon name="trash alternate" />
                      </div>
                    </div>
                  ))}
                  <Button basic fluid color="teal" type="button" onClick={() => push('')}>
                    Add new
                  </Button>
                  <Button color="teal" fluid type="submit" loading={isSubmitting}>Send Invitations</Button>
                </div>
              )}
            />
          </Form>
        )}
      />
    </Segment>
  )
};

