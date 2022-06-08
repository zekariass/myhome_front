import React from "react";
import { Form } from "react-final-form";

/**
 * Re-usable component for add and edit forms
 * @param {object} param0
 * @returns
 */
const EditFormTemplate = ({ children, initialValues, onSubmit }) => {
  return (
    <div className="card p-3 my-3 edit-form">
      <Form onSubmit={onSubmit} initialValues={initialValues}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {children}
            <div className="flex-end-general mt-3">
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
