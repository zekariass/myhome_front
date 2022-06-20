// @ts-nocheck
import CheckField from "components/commons/fields/CheckField";
import DropdownField from "components/commons/fields/DropdownField";
import TextareaField from "components/commons/fields/TextareaField";
import { FIELD_SUBSCRIPTION } from "components/commons/fieldSubscription";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ParentProperty = ({ categoryDisabled }) => {
  let { data } = useSelector(
    (store) => store.propertyCategory.propertyCategoryList.response
  );

  const dispatch = useDispatch();

  data = data.length ? data : [];

  const pCategoryRequired = (value) =>
    !value ? "Property Category is required!" : undefined;
  const descriptionRequired = (value) =>
    !value ? "Description is required!" : undefined;

  return (
    <div>
      <div className="form-outline mb-2">
        <DropdownField
          name="property_category"
          className="form-control form-control-lg input-border-color"
          label="Property Category"
          labelClass="form-label fs-5 mt-2"
          options={[{ id: "-1", name: "--Select Category--" }, ...data]}
          disabled={categoryDisabled}
          dispatchObj={null}
          customOnChange={null}
          validate={() => {}}
          fieldSubscription={FIELD_SUBSCRIPTION}
        />
      </div>
      <div className="form-outline">
        <TextareaField
          name="description"
          className="form-control form-control-lg input-border-color"
          label="Description"
          placeholder=""
          labelClass="form-label fs-5 mt-2"
          fieldSubscription={FIELD_SUBSCRIPTION}
          validate={descriptionRequired}
        />
      </div>
      <div className="form-outline my-3">
        <CheckField
          name="is_residential"
          type="checkbox"
          className="form-check-input me-2"
          label="Is redidential"
          labelLink=""
          initialValue={true}
          disabled={false}
          fieldSubscription={FIELD_SUBSCRIPTION}
        />
      </div>
    </div>
  );
};

export default ParentProperty;
