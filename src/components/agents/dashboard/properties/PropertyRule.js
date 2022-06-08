// @ts-nocheck
import DropdownField from "components/commons/fields/DropdownField";
import TextareaField from "components/commons/fields/TextareaField";
import TextField from "components/commons/fields/TextField";
import { FIELD_SUBSCRIPTION } from "components/commons/fieldSubscription";
import { PATH_AGENT_DASHBOARD_PROPERTY_DETAIL_ABSOLUTE } from "components/commons/Strings";
import {
  createRule,
  editRule,
} from "features/agent_dashboard/property/propertySlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import EditFormTemplate from "./EditFormTemplate";

const PropertyRule = () => {
  const [initialValues, setInitialValues] = useState({});
  const [propertyId, setPropertyId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setIsEdit(location?.state?.isEdit);

    const initValue = location?.state?.initialValues
      ? location?.state?.initialValues
      : {};
    setInitialValues(initValue);

    const propertyId = location?.state?.propertyId
      ? location?.state?.propertyId
      : null;

    setPropertyId(propertyId);
  }, []);

  const STRICTNESS = [
    { id: "LOWER", level: "Lower" },
    { id: "MEDIUM", level: "Medium" },
    { id: "HIGH", level: "High" },
    { id: "VERY_HIGH", level: "Very High" },
  ];

  const onRuleSubmit = (values) => {
    const ruleData = { rule: values, property: location.state?.propertyId };
    // console.log("ruleData: ", ruleData);
    const params = {
      ruleData: { rule: values, property: propertyId },
      navigate: navigate,
      redirectPath: PATH_AGENT_DASHBOARD_PROPERTY_DETAIL_ABSOLUTE,
    };
    if (isEdit) {
      dispatch(editRule(params));
    } else {
      dispatch(createRule(params));
    }
  };

  return (
    <div>
      <EditFormTemplate onSubmit={onRuleSubmit} initialValues={initialValues}>
        <p className="fw-bold fs-5">Add rules for your property</p>
        <div className="row row-cols-1 row-cols-sm-2 my-3">
          <div className="col form-outline mb-2">
            <TextField
              name="title"
              className="form-control form-control-lg input-border-color"
              type="text"
              placeholder=""
              label="Title"
              labelClass="form-label fs-5 mt-2"
              // validate={validateNumberFieldGeneral}
              fieldSubscription={FIELD_SUBSCRIPTION}
            />
          </div>
          <div className="form-outline mb-2">
            <DropdownField
              name="strictness"
              className="form-control form-control-lg input-border-color"
              label="Strictness Level"
              labelClass="form-label fs-5 mt-2"
              options={[{ id: "-1", level: "--Select Level--" }, ...STRICTNESS]}
              disabled={false}
              validate={() => {}}
              fieldSubscription={FIELD_SUBSCRIPTION}
            />
          </div>
          <div className="form-outline mb-2">
            <TextareaField
              name="description"
              className="form-control form-control-lg input-border-color"
              label="Description"
              labelClass="form-label fs-5 mt-2"
              fieldSubscription={FIELD_SUBSCRIPTION}
              // validate={descriptionRequired}
            />
          </div>
        </div>
      </EditFormTemplate>
    </div>
  );
};

export default PropertyRule;
