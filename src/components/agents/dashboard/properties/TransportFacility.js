// @ts-nocheck
import MyModal from "components/commons/Modal";
import React, { useEffect, useState } from "react";
import EditFormTemplate from "./EditFormTemplate";
import SingleTextSearch from "components/commons/SingleTextSearch";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  distanceUnit,
  PATH_AGENT_DASHBOARD_PROPERTY_DETAIL_ABSOLUTE,
} from "components/commons/Strings";
import {
  createTranfa,
  createTranfaFromSearch,
  getTranfaCategories,
  searchTranfa,
} from "features/agent_dashboard/property/propertySlice";
import { FIELD_SUBSCRIPTION } from "components/commons/fieldSubscription";
import TextField from "components/commons/fields/TextField";
import DropdownField from "components/commons/fields/DropdownField";
import TextareaField from "components/commons/fields/TextareaField";

const TransportFacility = () => {
  const [propertyId, setPropertyId] = useState(null);
  const [selectedTranfa, setSelectedTranfa] = useState(null);
  const [searchParam, setSearchParam] = useState(null);
  const [isModalOpen, setIsModelOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    //Get Transport facility categories when the component is mounted
    dispatch(getTranfaCategories());

    //Get and set property Id from location state, sent by previous component
    setPropertyId(location.state?.propertyId);
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * Form values to submit to backend for creation
   * @param {object} values
   */
  const onTranfaSubmit = (values) => {
    const newValues = { ...values, property: propertyId };
    dispatch(
      createTranfa({
        tranfaData: newValues,
        navigate: navigate,
        redirectPath: PATH_AGENT_DASHBOARD_PROPERTY_DETAIL_ABSOLUTE,
      })
    );
  };
  /**
   * Search and display Education facilities from backend on every key press
   * @param {Event} event
   */
  const onSearchInputChange = (event) => {
    console.log(event.target.value);
    setSearchParam(event.target.value);
    if (
      event.target.value.trim() === null ||
      event.target.value.trim() === ""
    ) {
      setSelectedTranfa(null);
    }
    const searchParam = new URLSearchParams([["search", event.target.value]]);
    dispatch(searchTranfa(searchParam));
  };
  //Get searched transport facility list from redux store
  const tranfaList = useSelector(
    // @ts-ignore
    (store) => store.property.tranfa.searchTranfa.data
  );

  //Get transport facility levels from redux store
  const tranfaCategories = useSelector(
    (store) => store.property.tranfaCategory.data
  );
  /**
   * Add (link) an existing transport facility to property
   * @param {number} tranfaId
   */
  const addExistingTranfaToProperty = (tranfaId) => {
    const tranfaData = {
      tranfaData: { property: propertyId, tranfa: tranfaId },
      navigate: navigate,
      redirectPath: PATH_AGENT_DASHBOARD_PROPERTY_DETAIL_ABSOLUTE,
    };
    dispatch(createTranfaFromSearch(tranfaData));
  };
  /**
   * Renders the search result
   * @returns ReactComponent
   */
  const renderSearchResultDetail = () => (
    <div className=" order-0 order-lg-1 pt-4">
      <div className="card my-1 px-2 pt-1" style={{ backgroundColor: "#eee" }}>
        <p>
          <span className="fw-bold">Name:</span> {selectedTranfa?.name}
        </p>
        <p>
          <span className="fw-bold">Category:</span>{" "}
          {selectedTranfa?.trans_fa_category?.name}
        </p>

        <p>
          <span className="fw-bold">Description:</span>{" "}
          {selectedTranfa?.description}
        </p>
        {!selectedTranfa?.near_by_properties?.includes(propertyId) && (
          <div className="py-2 flex-end-general">
            <button
              className="btn-general py-2 px-3"
              onClick={() => addExistingTranfaToProperty(selectedTranfa?.id)}
            >
              Add to your property
            </button>
          </div>
        )}
        {selectedTranfa?.near_by_properties?.includes(propertyId) && (
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
    <EditFormTemplate onSubmit={onTranfaSubmit}>
      <div>
        <p className="fs-4 fw-bold flex-center-general">
          Add Transport Facility
        </p>
        <p className="error-general">{}</p>
        <div>
          <div className="mb-5">
            <SingleTextSearch
              onInputChange={onSearchInputChange}
              label="Search transport facilities from database"
              placeholder="Search transport facilities from database"
            />

            {searchParam && (
              <div className="row">
                <div className="col-lg-8 edufa-search-list my-2 py-2 card order-1 order-lg-0">
                  {tranfaList.map((tranfa, index) => (
                    <div
                      key={index}
                      className="card my-1 px-2 pt-1 edufa-search-item"
                      onClick={() => {
                        setSelectedTranfa(tranfa);
                        setIsModelOpen(true);
                      }}
                      role="button"
                    >
                      <p className="fw-bold">{tranfa.name}</p>
                      <p className="text-muted">
                        {tranfa.trans_fa_category?.name}
                      </p>
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
          <div className="row row-cols-1 row-cols-sm-2 my-3">
            <div className="form-outline mb-2">
              <DropdownField
                name="trans_fa_category"
                className="form-control form-control-lg input-border-color"
                label="Transport Facility Category"
                labelClass="form-label fs-5 mt-2"
                options={[
                  { id: "-1", name: "--Select Category--" },
                  ...tranfaCategories,
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
                options={[
                  { id: "-1", name: "--Select Unit--" },
                  ...distanceUnit,
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
      </div>
    </EditFormTemplate>
  );
};

export default TransportFacility;
