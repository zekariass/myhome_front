// @ts-nocheck
import DropdownField from "components/commons/fields/DropdownField";
import TextareaField from "components/commons/fields/TextareaField";
import TextField from "components/commons/fields/TextField";
import { FIELD_SUBSCRIPTION } from "components/commons/fieldSubscription";
import MyModal from "components/commons/Modal";
import SingleTextSearch from "components/commons/SingleTextSearch";
import {
  distanceUnit,
  PATH_AGENT_DASHBOARD_PROPERTY_DETAIL_ABSOLUTE,
} from "components/commons/Strings";
import {
  createEdufa,
  createEdufaFromSearch,
  getEdufaLevels,
  searchEdufa,
} from "features/agent_dashboard/property/propertySlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import EditFormTemplate from "./EditFormTemplate";

const EducationFacility = () => {
  const [propertyId, setPropertyId] = useState(null);
  const [searchParam, setSearchParam] = useState(null);
  const [selectedEdufa, setSelectedEdufa] = useState(null);
  const [isModalOpen, setIsModelOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [initialValues, setInitialValues] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  //Education facility ownership dropdown values
  const ownership = [
    { id: "PRIVATE", name: "Private" },
    { id: "PUBLIC", name: "Public" },
    { id: "NGO", name: "NGO" },
    { id: "OTHER", name: "Other" },
  ];

  // @ts-ignore
  //Get Education facility levels from redux store
  const edufaLevels = useSelector((store) => store.property.edufaLevel.data);
  const { error } = useSelector(
    (store) => store.property.edufa.createEdufa.response
  );

  //Get searched education facility list from redux store
  const edufaList = useSelector(
    (store) => store.property.edufa.searchEdufa.data
  );

  useEffect(() => {
    //Get education facility levels at the component is mounted
    dispatch(getEdufaLevels());

    //Get and set property Id from location state, sent by previous component
    setPropertyId(location.state?.propertyId);

    //Set whether the for is for edit of add new
    setIsEdit(location.state?.isEdit);
  }, []);

  /**
   * Form values to submit to backend for creation
   * @param {object} values
   */
  const onEdufaSubmit = (values) => {
    const newValues = { ...values, property: propertyId };
    dispatch(
      createEdufa({
        edufaData: newValues,
        navigate: navigate,
        redirectPath: PATH_AGENT_DASHBOARD_PROPERTY_DETAIL_ABSOLUTE,
      })
    );
  };

  /**
   * Search and display Education facilities from backend on every key press
   * @param {Event} event
   */
  const onInputChange = (event) => {
    setSearchParam(event.target.value);
    if (
      event.target.value.trim() === null ||
      event.target.value.trim() === ""
    ) {
      setSelectedEdufa(null);
    }
    const searchParam = new URLSearchParams([["search", event.target.value]]);
    dispatch(searchEdufa(searchParam));
  };

  /**
   * Add (link) an existing education facility to property
   * @param {number} edufaId
   */
  const addExistingEdufaToProperty = (edufaId) => {
    const edufaData = {
      edufaData: { property: propertyId, edufa: edufaId },
      navigate: navigate,
      redirectPath: PATH_AGENT_DASHBOARD_PROPERTY_DETAIL_ABSOLUTE,
    };
    dispatch(createEdufaFromSearch(edufaData));
  };

  /**
   * Renders the search result
   * @returns ReactComponent
   */
  const renderSearchResultDetail = () => (
    <div className=" order-0 order-lg-1 pt-4">
      <div className="card my-1 px-2 pt-1" style={{ backgroundColor: "#eee" }}>
        <p>
          <span className="fw-bold">Name:</span> {selectedEdufa?.name}
        </p>
        <p>
          <span className="fw-bold">Level:</span>{" "}
          {selectedEdufa?.edufa_level?.level}
        </p>
        <p>
          <span className="fw-bold">Ownership:</span> {selectedEdufa?.ownership}
        </p>
        <p>
          <span className="fw-bold">Description:</span>{" "}
          {selectedEdufa?.description}
        </p>
        {!selectedEdufa?.near_by_properties?.includes(propertyId) && (
          <div className="py-2 flex-end-general">
            <button
              className="btn-general py-2 px-3"
              onClick={() => addExistingEdufaToProperty(selectedEdufa?.id)}
            >
              Add to your property
            </button>
          </div>
        )}
        {selectedEdufa?.near_by_properties?.includes(propertyId) && (
          <div>
            <p className="text-success fw-bold fst-italic flex-end-general">
              Already added!
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <EditFormTemplate initialValues={initialValues} onSubmit={onEdufaSubmit}>
      <div>
        <p className="fs-4 fw-bold flex-center-general">
          Add Education Facility
        </p>
        <p className="error-general">{error}</p>
        {!isEdit && (
          <div>
            <div className="mb-5">
              <SingleTextSearch
                onInputChange={onInputChange}
                label="Search education facilities from database"
                placeholder="Search education facilities from database"
              />

              {searchParam && (
                <div className="row">
                  <div className="col-lg-8 edufa-search-list my-2 py-2 card order-1 order-lg-0">
                    {edufaList.map((edufa, index) => (
                      <div
                        key={index}
                        className="card my-1 px-2 pt-1 edufa-search-item"
                        onClick={() => {
                          setSelectedEdufa(edufa);
                          setIsModelOpen(true);
                        }}
                        role="button"
                      >
                        <p className="fw-bold">{edufa.name}</p>
                        <p className="text-muted">{edufa.edufa_level?.level}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <p className="my-5 fw-bold fs-5">
                Or enter a new school near to your property
              </p>
            </div>
            <MyModal
              bodyMessage={renderSearchResultDetail}
              show={isModalOpen}
              onHide={() => setIsModelOpen(false)}
              title="Education Facility Detail"
            />
          </div>
        )}
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
              fieldSubscription={FIELD_SUBSCRIPTION}
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
              fieldSubscription={FIELD_SUBSCRIPTION}
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
              fieldSubscription={FIELD_SUBSCRIPTION}
              // validate={descriptionRequired}
            />
          </div>
        </div>
      </div>
    </EditFormTemplate>
  );
};

export default EducationFacility;
