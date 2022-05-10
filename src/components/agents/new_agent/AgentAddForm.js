// @ts-nocheck
import TextareaCustomInput from "components/commons/fields/TextareaCustomInput";
import TextCustomInput from "components/commons/fields/TextCustomInput";
import React from "react";
import { Field } from "react-final-form";
import { useDispatch } from "react-redux";

const AgentAddForm = () => {
  /**
   * Agent add main form component
   */

  /**
   * Dispatch object to dispatch our agent data to store
   */
  // const dispatch = useDispatch();

  /**
   * selector orbject from react-redux to retrieve our store data
   */
  const fieldSubscription = {
    submitting: true,
    value: true,
    touched: true,
    error: true,
  };

  return (
    /**
     * React final Form
     */
    <div>
      <div className="row row-cols-1 row-cols-lg-2 g-3">
        <div className="col form-outline">
          <Field
            name="name"
            type="text"
            className="form-control form-control-lg input-border-color"
            label="Agent name"
            labelClass="form-label fs-5 mt-2"
            subscription={fieldSubscription}
          >
            {({ input, meta, className, label, labelClass }) => (
              // textInputField(input, meta, className, "", label, labelClass)
              <TextCustomInput
                input={input}
                meta={meta}
                className={className}
                label={label}
                labelClass={labelClass}
              />
            )}
          </Field>
        </div>

        <div className="col form-outline">
          <Field
            name="slogan"
            type="text"
            className="form-control form-control-lg input-border-color"
            label="Agent Slogan"
            labelClass="form-label fs-5 mt-2"
            subscription={fieldSubscription}
          >
            {({ input, meta, className, label, labelClass }) => (
              // textInputField(input, meta, className, "", label, labelClass)
              <TextCustomInput
                input={input}
                meta={meta}
                className={className}
                label={label}
                labelClass={labelClass}
              />
            )}
          </Field>
        </div>
        <div className="col form-outline">
          <Field
            name="email"
            type="email"
            className="form-control form-control-lg input-border-color"
            label="Email for your Agent"
            labelClass="form-label fs-5 mt-2"
            subscription={fieldSubscription}
          >
            {({ input, meta, className, label, labelClass }) => (
              // textInputField(input, meta, className, "", label, labelClass)
              <TextCustomInput
                input={input}
                meta={meta}
                className={className}
                label={label}
                labelClass={labelClass}
              />
            )}
          </Field>
        </div>
        <div className="col form-outline">
          <Field
            name="contact_number"
            type="text"
            className="form-control form-control-lg input-border-color"
            label="Contact number"
            labelClass="form-label fs-5 mt-2"
            subscription={fieldSubscription}
          >
            {({ input, meta, className, label, labelClass }) => (
              // textInputField(input, meta, className, "", label, labelClass)
              <TextCustomInput
                input={input}
                meta={meta}
                className={className}
                label={label}
                labelClass={labelClass}
              />
            )}
          </Field>
        </div>
      </div>
      <div className="form-outline">
        <Field
          name="description"
          className="form-control form-control-lg input-border-color"
          label="Description"
          labelClass="form-label fs-5 mt-2"
          subscription={fieldSubscription}
        >
          {({ input, meta, className, label, labelClass }) => (
            // textareaInputField(input, meta, className, "", label, labelClass)
            <TextareaCustomInput
              input={input}
              meta={meta}
              className={className}
              label={label}
              labelClass={labelClass}
            />
          )}
        </Field>
      </div>
    </div>
  );
};

export default AgentAddForm;
