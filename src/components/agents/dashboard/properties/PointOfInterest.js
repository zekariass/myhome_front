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
  createPoi,
  createPoiFromSearch,
  getPoiCategories,
  searchPoi,
} from "features/agent_dashboard/property/propertySlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import EditFormTemplate from "./EditFormTemplate";

const PointOfInterest = () => {
  const [propertyId, setPropertyId] = useState(null);
  const [selectedPoi, setSelectedPoi] = useState(null);
  const [searchParam, setSearchParam] = useState(null);
  const [isModalOpen, setIsModelOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    //Get Point of Interest categories when the component is mounted
    dispatch(getPoiCategories());

    //Get and set property Id from location state, sent by previous component
    setPropertyId(location.state?.propertyId);
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * Form values to submit to backend for creation
   * @param {object} values
   */
  const onPoiSubmit = (values) => {
    const newValues = { ...values, property: propertyId };
    dispatch(
      createPoi({
        poiData: newValues,
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
    // console.log(event.target.value);
    setSearchParam(event.target.value);
    if (
      event.target.value.trim() === null ||
      event.target.value.trim() === ""
    ) {
      setSelectedPoi(null);
    }
    const searchParam = new URLSearchParams([["search", event.target.value]]);
    dispatch(searchPoi(searchParam));
  };
  //Get searched Point of Interest list from redux store
  const poiList = useSelector(
    // @ts-ignore
    (store) => store.property.poi.searchPoi.data
  );

  //Get Point of Interest levels from redux store
  const poiCategories = useSelector((store) => store.property.poiCategory.data);
  /**
   * Add (link) an existing Point of Interest to property
   * @param {number} tranfaId
   */
  const addExistingPoiToProperty = (poiId) => {
    const poiData = {
      poiData: { property: propertyId, poi: poiId },
      navigate: navigate,
      redirectPath: PATH_AGENT_DASHBOARD_PROPERTY_DETAIL_ABSOLUTE,
    };
    dispatch(createPoiFromSearch(poiData));
  };
  /**
   * Renders the search result
   * @returns ReactComponent
   */
  const renderSearchResultDetail = () => (
    <div className=" order-0 order-lg-1 pt-4">
      <div className="card my-1 px-2 pt-1" style={{ backgroundColor: "#eee" }}>
        <p>
          <span className="fw-bold">Name:</span> {selectedPoi?.name}
        </p>
        <p>
          <span className="fw-bold">Category:</span>{" "}
          {selectedPoi?.poi_category?.name}
        </p>

        <p>
          <span className="fw-bold">Description:</span>{" "}
          {selectedPoi?.description}
        </p>
        {!selectedPoi?.near_by_properties?.includes(propertyId) && (
          <div className="py-2 flex-end-general">
            <button
              className="btn-general py-2 px-3"
              onClick={() => addExistingPoiToProperty(selectedPoi?.id)}
            >
              Add to your property
            </button>
          </div>
        )}
        {selectedPoi?.near_by_properties?.includes(propertyId) && (
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
    <EditFormTemplate onSubmit={onPoiSubmit}>
      <div>
        <p className="fs-4 fw-bold flex-center-general">
          Add Point of Interest
        </p>
        <p className="error-general">{}</p>
        <div>
          <div className="mb-5">
            <SingleTextSearch
              onInputChange={onSearchInputChange}
              label="Search point of interest from database"
              placeholder="Search point of interest from database"
            />

            {searchParam && (
              <div className="row">
                <div className="col-lg-8 edufa-search-list my-2 py-2 card order-1 order-lg-0">
                  {poiList.map((poi, index) => (
                    <div
                      key={index}
                      className="card my-1 px-2 pt-1 edufa-search-item"
                      onClick={() => {
                        setSelectedPoi(poi);
                        setIsModelOpen(true);
                      }}
                      role="button"
                    >
                      <p className="fw-bold">{poi.name}</p>
                      <p className="text-muted">{poi.poi_category?.name}</p>
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
            title="Point of Interest Detail"
          />
          <div className="row row-cols-1 row-cols-sm-2 my-3">
            <div className="form-outline mb-2">
              <DropdownField
                name="poi_category"
                className="form-control form-control-lg input-border-color"
                label="Point of Interest Category"
                labelClass="form-label fs-5 mt-2"
                options={[
                  { id: "-1", name: "--Select Category--" },
                  ...poiCategories,
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
                fieldSubscription={FIELD_SUBSCRIPTION}
                // validate={descriptionRequired}
              />
            </div>
          </div>
        </div>
      </div>
    </EditFormTemplate>
  );
};

export default PointOfInterest;
