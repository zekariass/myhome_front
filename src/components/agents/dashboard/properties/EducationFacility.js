// @ts-nocheck
import DropdownField from "components/commons/fields/DropdownField";
import TextareaField from "components/commons/fields/TextareaField";
import TextField from "components/commons/fields/TextField";
import { FIELD_SUBSCRIPTION } from "components/commons/fieldSubscription";
import { PATH_AGENT_DASHBOARD_PROPERTY_DETAIL_ABSOLUTE } from "components/commons/Strings";
import {
  createEdufa,
  getEdufaLevels,
} from "features/agent_dashboard/property/propertySlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import EditFormTemplate from "./EditFormTemplate";

const EducationFacility = () => {
  const [propertyId, setPropertyId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  const ownership = [
    { id: "PRIVATE", name: "Private" },
    { id: "PUBLIC", name: "Public" },
    { id: "NGO", name: "NGO" },
    { id: "OTHER", name: "Other" },
  ];

  const distanceUnit = [
    { id: "METER", name: "Meter" },
    { id: "KM", name: "Kilo Meter" },
    { id: "MILE", name: "Mile" },
  ];

  // @ts-ignore
  const edufaLevels = useSelector((store) => store.property.edufaLevel.data);
  const { error } = useSelector(
    (store) => store.property.edufa.createEdufa.response
  );

  useEffect(() => {
    dispatch(getEdufaLevels());
    setPropertyId(location.state?.propertyId);
  }, []);

  const onEdufaSubmit = (values) => {
    const newValues = { ...values, property: propertyId };
    // console.log("onEdufaSubmit: ", values);
    dispatch(
      createEdufa({
        edufaData: newValues,
        navigate: navigate,
        redirectPath: PATH_AGENT_DASHBOARD_PROPERTY_DETAIL_ABSOLUTE,
      })
    );
  };
  return (
    <EditFormTemplate initialValues={{}} onSubmit={onEdufaSubmit}>
      <div>
        <p className="fs-4 fw-bold flex-center-general">
          Add Education Facility
        </p>
        <p className="error-general">{error}</p>
        <div className="row row-cols-1 row-cols-sm-2 my-3">
          <div className="form-outline mb-2">
            <DropdownField
              name="edufa_level"
              className="form-control form-control-lg input-border-color"
              label="Education Facility Level"
              labelClass="form-label fs-5 mt-2"
              options={[
                { id: "-1", level: "--Select Level--" },
                ...edufaLevels,
              ]}
              disabled={false}
              validate={() => {}}
              fieldSubscription={FIELD_SUBSCRIPTION}
            />
          </div>
          <div className="col form-outline mb-2">
            <TextField
              name="name"
              className="form-control form-control-lg input-border-color"
              type="text"
              placeholder=""
              label="Facility name"
              labelClass="form-label fs-5 mt-2"
              // validate={validateNumberFieldGeneral}
              subscription={FIELD_SUBSCRIPTION}
            />
          </div>
          <div className="col form-outline mb-2">
            <TextField
              name="distance_from_property"
              className="form-control form-control-lg input-border-color"
              type="number"
              placeholder=""
              label="Distance from property"
              labelClass="form-label fs-5 mt-2"
              // validate={validateNumberFieldGeneral}
              subscription={FIELD_SUBSCRIPTION}
            />
          </div>
          <div className="form-outline mb-2">
            <DropdownField
              name="distance_unit"
              className="form-control form-control-lg input-border-color"
              label="Distance Unit"
              labelClass="form-label fs-5 mt-2"
              options={[{ id: "-1", name: "--Select Unit--" }, ...distanceUnit]}
              disabled={false}
              validate={() => {}}
              fieldSubscription={FIELD_SUBSCRIPTION}
            />
          </div>
          <div className="form-outline mb-2">
            <DropdownField
              name="ownership"
              className="form-control form-control-lg input-border-color"
              label="Ownership"
              labelClass="form-label fs-5 mt-2"
              options={[
                { id: "-1", name: "--Select Ownership--" },
                ...ownership,
              ]}
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
              subscription={FIELD_SUBSCRIPTION}
              // validate={descriptionRequired}
            />
          </div>
        </div>
      </div>
    </EditFormTemplate>
  );
};

export default EducationFacility;
