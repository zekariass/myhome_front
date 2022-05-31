import React from "react";
import { Form, FormSpy } from "react-final-form";

const EditFormTemplate = ({ children, initialValues, onSubmit }) => {
  // console.log("initialValue: ", initialValues);
  return (
    <div className="card p-3 my-3 edit-form">
      <Form onSubmit={onSubmit} initialValues={initialValues}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {children}
            {/* <FormSpy>
            {({ values }) => {
              console.log("NEW ADD VALUES: ", values);
            }}
          </FormSpy> */}
            <div className="flex-end-general">
              <button className="btn-general py-2 px-3" type="submit">
                Save
              </button>
            </div>
          </form>
        )}
      </Form>
    </div>
  );
};

export default EditFormTemplate;
