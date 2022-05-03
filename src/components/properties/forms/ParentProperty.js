// @ts-nocheck
import { checkInputField } from "components/commons/fields/checkInputField";
import { dropdownInputFiled } from "components/commons/fields/dropdownInputFiled";
import { textareaInputField } from "components/commons/fields/textareaInputField";
import React from "react";
import { Field } from "react-final-form";

const ParentProperty = () => {
  const pCategoryRequired = (value) =>
    !value ? "Property Category is required!" : undefined;
  const descriptionRequired = (value) =>
    !value ? "Description is required!" : undefined;

  const fieldSubscription = {
    submitting: true,
    value: true,
    touched: true,
    error: true,
  };

  return (
    <div>
      <div className="form-outline mb-2">
        <Field
          name="property_category"
          className="form-control form-control-lg input-border-color"
          label="Property Category"
          labelClass="form-label fs-5 mt-2"
          options={[{ id: "-1", name: "--Select Category--" }]}
          disabled={false}
          // validate={pCategoryRequired}
          subscription={fieldSubscription}
        >
          {({ input, meta, options, className, label, labelClass, disabled }) =>
            dropdownInputFiled(
              input,
              meta,
              options,
              className,
              label,
              labelClass,
              null,
              null,
              disabled
            )
          }
        </Field>
      </div>
      <div className="form-outline">
        <Field
          name="description"
          className="form-control form-control-lg input-border-color"
          label="Description"
          labelClass="form-label fs-5 mt-2"
          subscription={fieldSubscription}
          validate={descriptionRequired}
        >
          {({ input, meta, className, label, labelClass }) =>
            textareaInputField(input, meta, className, "", label, labelClass)
          }
        </Field>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 my-3">
        <div className="col form-outline mb-2">
          <Field
            name="is_residential"
            type="checkbox"
            className="form-check-input me-2"
            // required={true}
            label="Is redidential"
            labelLink=""
            initialValue={true}
            // errorMsg="You must agree with our terms of service!"
            subscription={fieldSubscription}
          >
            {({ input, meta, className, label, labelLink }) =>
              checkInputField(input, meta, className, label, labelLink)
            }
          </Field>
        </div>
        <div className="col form-outline mb-2">
          <Field
            name="is_new"
            type="checkbox"
            className="form-check-input me-2"
            // required={true}
            label="Is New"
            labelLink=""
            initialValue={false}
            // errorMsg="You must agree with our terms of service!"
            subscription={fieldSubscription}
          >
            {({ input, meta, className, label, labelLink }) =>
              checkInputField(input, meta, className, label, labelLink)
            }
          </Field>
        </div>
      </div>
    </div>
  );
};

export default ParentProperty;
