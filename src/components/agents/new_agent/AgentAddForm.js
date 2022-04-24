// @ts-nocheck
import { textareaInputField } from "components/commons/fields/textareaInputField";
import { textInputField } from "components/commons/fields/textInputField";
import React from "react";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { setAgentData } from "../../../features/agent/agentSlice";

const AgentAddForm = ({ currentStep, setCurrentStep }) => {
  /**
   * Agent add main form component
   */

  /**
   * Dispatch object to dispatch our agent data to store
   */
  const dispatch = useDispatch();

  /**
   * selector orbject from react-redux to retrieve our store data
   */
  const { agentData } = useSelector((store) => store.agent.addAgent);

  const onSubmit = (values) => {
    /**
     * Handles the submit form actton
     * Used as prop in React final form
     */

    dispatch(setAgentData(values));

    /**
     * Handles the submit form action. This function is used as React Final Form prop
     */
    setCurrentStep(currentStep + 1);
  };

  return (
    /**
     * React final Form
     */
    <Form
      onSubmit={onSubmit}
      validate={(values) => validate(values)}
      subscription={{ submitting: true }}
      initialValues={agentData}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="p-5">
          <div className="row row-cols-1 row-cols-lg-2 g-3">
            <div className="col form-outline">
              <Field
                name="name"
                type="text"
                className="form-control form-control-lg input-border-color"
                label="Agent name"
                labelClass="form-label fs-5"
                subscription={{
                  submitting: true,
                  value: true,
                  touched: true,
                  error: true,
                }}
              >
                {({ input, meta, className, label, labelClass }) =>
                  textInputField(input, meta, className, "", label, labelClass)
                }
              </Field>
            </div>

            <div className="col form-outline">
              <Field
                name="slogan"
                type="text"
                className="form-control form-control-lg input-border-color"
                label="Agent Slogan"
                labelClass="form-label fs-5 mt-2"
                subscription={{
                  submitting: true,
                  value: true,
                  touched: true,
                  error: true,
                }}
              >
                {({ input, meta, className, label, labelClass }) =>
                  textInputField(input, meta, className, "", label, labelClass)
                }
              </Field>
            </div>
            <div className="col form-outline">
              <Field
                name="email"
                type="email"
                className="form-control form-control-lg input-border-color"
                label="Email for your Agent"
                labelClass="form-label fs-5 mt-2"
                subscription={{
                  submitting: true,
                  value: true,
                  touched: true,
                  error: true,
                }}
              >
                {({ input, meta, className, label, labelClass }) =>
                  textInputField(input, meta, className, "", label, labelClass)
                }
              </Field>
            </div>
            <div className="col form-outline">
              <Field
                name="contact_number"
                type="text"
                className="form-control form-control-lg input-border-color"
                label="Contact number"
                labelClass="form-label fs-5 mt-2"
                subscription={{
                  submitting: true,
                  value: true,
                  touched: true,
                  error: true,
                }}
              >
                {({ input, meta, className, label, labelClass }) =>
                  textInputField(input, meta, className, "", label, labelClass)
                }
              </Field>
            </div>
          </div>
          <div className="form-outline">
            <Field
              name="description"
              className="form-control form-control-lg input-border-color"
              label="Description"
              labelClass="form-label fs-5 mt-2"
              subscription={{
                submitting: true,
                value: true,
                touched: true,
                error: true,
              }}
            >
              {({ input, meta, className, label, labelClass }) =>
                textareaInputField(
                  input,
                  meta,
                  className,
                  "",
                  label,
                  labelClass
                )
              }
            </Field>
          </div>
          {/* Continue to adress form  */}
          <div className="pt-1 my-4 flex-center-general">
            <button className="btn-general py-2 px-4" type="submit">
              Continue
            </button>
          </div>
        </form>
      )}
    </Form>
  );
};

export default AgentAddForm;

//Inline function calls

const validate = (values) => {
  /**
   * Validates the Agent add form
   */
  const errors = {};
  if (!values.name) {
    errors.name = "Name of Agent is required!";
  }
  if (!values.email) {
    errors.email = "Agent contact email is required!";
  }
  if (!values.contact_number) {
    errors.contact_number = "Agent contact number is required!";
  }
  return errors;
};
