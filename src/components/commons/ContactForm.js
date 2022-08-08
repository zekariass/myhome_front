// @ts-nocheck
import React from "react";
import { Form } from "react-final-form";
import TextareaField from "./fields/TextareaField";
import TextField from "./fields/TextField";
import { FIELD_SUBSCRIPTION } from "./fieldSubscription";

const ContactForm = () => {
  const onSubmit = () => {};
  return (
    <div className="my-3 card shadow-sm py-2 px-3">
      
      <Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="row row-cols-1 row-cols-lg-2">
              <div className="col form-outline mb-2">
                <TextField
                  name="first_name"
                  type="text"
                  placeholder="First Name"
                  label="First Name"
                  className="form-control form-control-lg input-border-color"
                  labelClass="form-label fs-5 mt-2"
                  fieldSubscription={FIELD_SUBSCRIPTION}
                  validate={() => {}}
                />
              </div>
              <div className="col form-outline mb-2">
                <TextField
                  name="last_name"
                  type="text"
                  placeholder="Last Name"
                  label="First Name"
                  className="form-control form-control-lg input-border-color"
                  labelClass="form-label fs-5 mt-2"
                  fieldSubscription={FIELD_SUBSCRIPTION}
                  validate={() => {}}
                />
              </div>
              <div className="col form-outline mb-2">
                <TextField
                  name="phone_address"
                  type="text"
                  placeholder="Phone Address"
                  label="Phone Address"
                  className="form-control form-control-lg input-border-color"
                  labelClass="form-label fs-5 mt-2"
                  fieldSubscription={FIELD_SUBSCRIPTION}
                  validate={() => {}}
                />
              </div>
              <div className="col form-outline mb-2">
                <TextField
                  name="email"
                  type="text"
                  placeholder="Email"
                  label="Email"
                  className="form-control form-control-lg input-border-color"
                  labelClass="form-label fs-5 mt-2"
                  fieldSubscription={FIELD_SUBSCRIPTION}
                  validate={() => {}}
                />
              </div>
              <div className="col form-outline mb-2">
                <TextareaField
                  name="description"
                  className="form-control form-control-lg input-border-color"
                  label="Description"
                  labelClass="form-label fs-5 mt-2"
                  placeholder=""
                  fieldSubscription={FIELD_SUBSCRIPTION}
                  validate={() => {}}
                />
              </div>
              <div className="col d-flex align-items-center pt-lg-4">
                <button type="submit" className="btn btn-general py-2 px-3">
                  Send
                </button>
              </div>
            </div>
          </form>
        )}
      </Form>
    </div>
  );
};

export default ContactForm;
