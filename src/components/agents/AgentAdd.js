import { textInputField } from "components/commons/fields/textInputField";
import React from "react";
import { Field, Form } from "react-final-form";
// import { Button, Form } from "react-bootstrap";

const AgentAdd = () => {
  return (
    <div className="container">
      {/* <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form> */}
      <Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-outline">
              <Field
                name="name"
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter your agency name..."
                subscription={{
                  submitting: true,
                  value: true,
                  touched: true,
                  error: true,
                }}
              >
                {({ input, meta, className, placeholder }) =>
                  textInputField(input, meta, className, placeholder)
                }
              </Field>
            </div>
          </form>
        )}
      </Form>
    </div>
  );
};

export default AgentAdd;

//Inline function

const onSubmit = () => {};
