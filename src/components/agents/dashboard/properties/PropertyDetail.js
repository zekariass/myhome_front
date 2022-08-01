// @ts-nocheck
import { getAmenitiesByAmenityCategory } from "components/commons/getAmenitiesByAmenityCategory";
import DataDisplay from "components/commons/DataDisplay";
import MinimisedImageGallery from "components/commons/MinimisedImageGallery";
import MyModal from "components/commons/Modal";
import {
  ALL_PURPOSE_PROPERTY_KEY,
  APARTMENT_KEY,
  COMMERCIAL_PROPERTY_KEY,
  CONDOMINIUM_KEY,
  HALL_KEY,
  LAND_KEY,
  OFFICE_KEY,
  PATH_AGENT_DASHBOARD,
  PATH_AGENT_DASHBOARD_AMENITY_ADD,
  PATH_AGENT_DASHBOARD_APARTMENT_EDIT,
  PATH_AGENT_DASHBOARD_APARTMENT_EDIT_ABSOLUTE,
  PATH_AGENT_DASHBOARD_EDUCATION_FACILITY_ADD,
  PATH_AGENT_DASHBOARD_LAND_EDIT_ABSOLUTE,
  PATH_AGENT_DASHBOARD_POI_ADD,
  PATH_AGENT_DASHBOARD_PROPERTY,
  PATH_AGENT_DASHBOARD_PROPERTY_ADDRESS_EDIT_ABSOLUTE,
  PATH_AGENT_DASHBOARD_PROPERTY_EDIT_ABSOLUTE,
  PATH_AGENT_DASHBOARD_PROPERTY_FILE_UPLOAD_ABSOLUTE,
  PATH_AGENT_DASHBOARD_PROPERTY_RULE_ADD,
  PATH_AGENT_DASHBOARD_SHAREHOUSE_EDIT_ABSOLUTE,
  PATH_AGENT_DASHBOARD_TRANSPORT_FACILITY_ADD,
  PATH_AGENT_DASHBOARD_VILLA_EDIT_ABSOLUTE,
  SHARE_HOUSE_KEY,
  TRADITIONAL_HOUSE_KEY,
  VILLA_KEY,
} from "components/commons/Strings";
import {
  deleteAmnityLink,
  deleteEdufaLink,
  deletePoiLink,
  deleteRule,
  deleteTranfaLink,
  getPropertyDetail,
} from "features/agent_dashboard/property/propertySlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DataDisplayTabular from "components/commons/DataDisplayTabular";
import RelatedPropertyDetail from "./RelatedPropertyDetail";
import VillaDetail from "./VillaDetail";
import ApartmentDetail from "./ApartmentDetail";
import CondominiumDetail from "./CondominiumDetail";
import AllPurposePropertyDetail from "./AllPurposePropertyDetail";
import CommercialPropertyDetail from "./CommercialPropertyDetail";
import HallDetail from "./HallDetail";
import LandDetail from "./LandDetail";
import OfficeDetail from "./OfficeDetail";
import ShareHouseDetail from "./ShareHouseDetail";
import TraditionalHouseDetail from "./TraditionalHouseDetail";

const PropertyDetail = ({ propPropertyId }) => {
  const [openModal, setOpenModal] = useState(false);
  const [fileToDIsplay, setFileToDisplay] = useState(null);
  const [address, setAddress] = useState({});
  const [formattedAddressName, setFormattedAddressName] = useState({});
  const [amenities, setAmenities] = useState([]);
  const [amenitiesByCategory, setAmenitiesByCategory] = useState({});
  const [educationFacility, setEducationFacility] = useState({});
  const [transportFacility, setTransportFacility] = useState({});
  const [pointOfInterest, setPointOfInterest] = useState({});
  const [propertyCategory, setPropertyCategory] = useState({});
  const [rules, setRules] = useState({});
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [propertyBasicData, setPropertyBasicData] = useState({});
  const [propertyRestData, setPropertyRestData] = useState({});
  const [relatedProperty, setRelatedProperty] = useState({});

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  //Get property data from redux store from backend
  const property = useSelector(
    (store) => store.property.singlePropertyAction.data
  );
  useEffect(() => {
    //Get property ID from location state sent by previous component
    const propertyId = propPropertyId
      ? propPropertyId
      : location.state?.propertyId;

    console.log("PROPERTY IDDD: ", propPropertyId);

    //Get detail of specific propert identified by propertyId for display
    dispatch(getPropertyDetail(propertyId));
  }, []);

  useEffect(() => {
    //Destructure the property for display
    const {
      address,
      agent,
      amenity,
      education_facility,
      transport_facility,
      point_of_interest,
      rules,
      property_category,
      images,
      videos,
      virtual_tours,
      related_property,
      ...propertyRestData
    } = property;

    //Set states
    setAmenities(amenity);
    setAddress(address);
    setEducationFacility(education_facility);
    setTransportFacility(transport_facility);
    setPointOfInterest(point_of_interest);
    setRules(rules);
    const new_property_category = property_category ? property_category : {};
    setPropertyCategory(new_property_category);
    setImages(images);
    setVideos(videos);
    setPropertyRestData(propertyRestData);
    setRelatedProperty(related_property);

    setPropertyBasicData({
      ...propertyRestData,
      category: property_category?.name,
    });

    //Destructure address and format country, region, and city by name for display
    if (address) {
      const { country, region, city, ...addressRest } = address;
      setFormattedAddressName({
        ...addressRest,
        country: country?.name,
        region: region?.name,
        city: city?.name,
      });
    }

    setAmenitiesByCategory(getAmenitiesByAmenityCategory(amenity));
  }, [property]);

  //Renders the message to display in modal for video view
  const modalVideoBodyMessage = () => {
    return (
      <video width="100%" height="100%" className="" controls autoPlay>
        <source src={fileToDIsplay?.video} type={fileToDIsplay?.type} />
      </video>
    );
  };

  //Format property data as initial value for edit form
  const preparePropertyInitialValues = () => {
    let {
      added_on,
      images_count,
      videos_count,
      virtual_tours_count,
      ...initialValues
    } = propertyRestData;

    initialValues = {
      ...initialValues,
      property_category: propertyCategory.id,
    };
    return initialValues;
  };

  //Format Address data as initial value for edit form
  const preparePropAddressInitialValues = () => {
    let formattedAddressWithId = {};
    if (address) {
      const { country, region, city, ...addressRest } = address;
      formattedAddressWithId = {
        ...addressRest,
        country: country?.id,
        region: region?.id,
        city: city?.id,
      };
    }

    return { address: formattedAddressWithId };
  };

  //Handle deletion of Education facility.It does not actually delete the education facility,
  //rather it delete the link to the property in the intermediate table.
  const onEdufaDelete = (edufaId) => {
    const deleteData = { property: property?.id, edufa: edufaId };
    dispatch(deleteEdufaLink(deleteData));
  };

  //Handle deletion of transport facility. It does not actually delete the transport facility,
  //rather it delete the link to the property in the intermediate table.
  const onTranfaDelete = (tranfaId) => {
    const deleteData = { property: property?.id, tranfa: tranfaId };
    dispatch(deleteTranfaLink(deleteData));
  };

  //Handle deletion of point of interest. It does not actually delete the point of interest,
  //rather it delete the link to the property in the intermediate table.
  const onPoiDelete = (poiId) => {
    const deleteData = { property: property?.id, poi: poiId };
    dispatch(deletePoiLink(deleteData));
  };

  //Handle deletion of Amenity. It does not actually delete the Amenity,
  //rather it delete the link to the property in the intermediate table.
  const onAmenityDelete = (amenId) => {
    const deleteData = { property: property?.id, amenity: amenId };
    dispatch(deleteAmnityLink(deleteData));
  };

  //Handle deletion of Rule.
  const onRuleDelete = (ruleId) => {
    const deleteData = { property: property?.id, rule: ruleId };
    dispatch(deleteRule(deleteData));
  };

  /**
   * Format Education facility data for tabular display
   * @returns
   */
  const formatEdufa = () => {
    //Holds the formatted poi data
    let formattedEdufa = [];

    //Columns of of table to display
    const columns = [
      "id",
      "edufa_level",
      "name",
      "ownership",
      "description",
      "distance_from_property",
      "distance_unit",
    ];

    //Format the data
    educationFacility.forEach((edufa) => {
      let { edufa_level, near_by_properties, added_on, ...edufaRest } = edufa;

      const newEdufa = {
        edufa_level: edufa_level?.level,
        ...edufaRest,
      };

      formattedEdufa = [...formattedEdufa, newEdufa];
    });
    return { data: formattedEdufa, columns: columns };
  };

  /**
   * Format property rules data for tabular display
   * @returns
   */
  const formatRules = () => {
    //Holds the formatted rules data
    // let formattedEdufa = [];

    //Columns of of table to display
    const columns = ["id", "title", "strictness", "description"];
    return { data: rules, columns: columns };
  };

  /**
   * Format Transport Facility data for tabular display
   * @returns
   */
  const formatPoi = () => {
    //Holds the formatted poi data
    let formattedPois = [];

    //Columns of of table to display
    const columns = [
      "id",
      "poi_category",
      "name",
      "description",
      "distance_from_property",
      "distance_unit",
    ];

    //Format the data
    pointOfInterest.forEach((poi) => {
      let { poi_category, near_by_properties, added_on, ...poiRest } = poi;
      added_on = new Date(added_on).toDateString();

      const newPoi = {
        poi_category: poi_category?.name,
        ...poiRest,
      };

      formattedPois = [...formattedPois, newPoi];
    });
    return { data: formattedPois, columns: columns };
  };

  /**
   * Format Transport Facility data for tabular display
   * @returns
   */
  const formatTranfa = () => {
    //Array to hold records of formatted tranfa data
    let formattedTranfa = [];

    //Columns for display
    const columns = [
      "id",
      "trans_fa_category",
      "name",
      "description",
      "distance_from_property",
      "distance_unit",
    ];

    //Farmat the original data
    transportFacility.forEach((tranfa) => {
      const { trans_fa_category, near_by_properties, ...tranfaRest } = tranfa;

      const newTranfa = {
        ...tranfaRest,
        trans_fa_category: trans_fa_category?.name,
      };

      formattedTranfa = [...formattedTranfa, newTranfa];
    });

    return { data: formattedTranfa, columns: columns };
  };

  return (
    <main className="my-3">
      <div className="mb-3">
        {/* List images of the property */}
        <MinimisedImageGallery data={images} />
      </div>
      <div className="d-flex justify-content-end my-4 ">
        {images?.length > 0 && (
          <div className="">
            <Link to="#" className="link-general link-size-small py-2 px-3">
              See All Pictures
            </Link>
          </div>
        )}
      </div>
      <div className="row">
        {videos?.length > 0 && (
          <div>
            <p className="fw-bold">Videos</p>
          </div>
        )}

        {/* List videos of the property */}
        {videos?.map((video, index) => (
          <div className="col-auto flex-center-general" key={index}>
            <div className="card p-2" style={{ width: "200px" }}>
              <video width="100%" height="100%" className="" controls>
                <source src={video.video} type={video.type} />
              </video>
              <div className="mt-2 flex-center-general">
                <i
                  className="play icon"
                  role="button"
                  onClick={() => {
                    setFileToDisplay(video);
                    setOpenModal(true);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Modal to play the video */}
      <MyModal
        show={openModal}
        onHide={() => setOpenModal(false)}
        bodyMessage={modalVideoBodyMessage}
        title="Play your video"
      />
      <div className="d-flex justify-content-end my-4 row row-cols-auto">
        {videos?.length > 0 && (
          <div className="col">
            <Link to="#" className="link-general link-size-small py-2 px-3">
              See All Videos
            </Link>
          </div>
        )}
      </div>
      <div className="d-flex justify-content-end my-4 row row-cols-auto">
        <div className="col">
          <Link
            to={PATH_AGENT_DASHBOARD_PROPERTY_FILE_UPLOAD_ABSOLUTE}
            className="link-general link-size-small py-2 px-3"
            state={{
              propertyId: property?.id,
              videos_count: property?.videos_count,
              images_count: property?.images_count,
              from: propPropertyId ? "" : "property_detail",
            }}
          >
            Uoload Medias (Picture, Video, Virtual Tours)
          </Link>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-lg-2 g-4">
        <div className="col card-table">
          <div className="card card-cell px-4">
            <DataDisplay
              data={propertyBasicData}
              title="Property basic information"
              editable={true}
              path={PATH_AGENT_DASHBOARD_PROPERTY_EDIT_ABSOLUTE}
              editInitialValues={preparePropertyInitialValues()}
            />
          </div>
        </div>
        <div className="col card-table">
          <div className="card card-cell px-4">
            <DataDisplay
              data={formattedAddressName}
              title="Property Address"
              editable={true}
              path={PATH_AGENT_DASHBOARD_PROPERTY_ADDRESS_EDIT_ABSOLUTE}
              editInitialValues={preparePropAddressInitialValues()}
            />
          </div>
        </div>
      </div>
      {!propPropertyId &&
        relatedProperty &&
        Object.keys(relatedProperty).length > 0 && (
          <div className="py-3">
            {propertyCategory?.cat_key === APARTMENT_KEY && (
              // <RelatedPropertyDetail
              //   message="This is Apartment. You can view and manage your property below"
              //   listTitle="Apartment detail"
              //   editPath={PATH_AGENT_DASHBOARD_APARTMENT_EDIT_ABSOLUTE}
              //   editInitialValues={preparePropertyInitialValues()}
              //   relatedProperty={relatedProperty}
              //   editable={true}
              //   deletable={true}
              // />

              <div>
                <ApartmentDetail
                  propApartmentId={relatedProperty?.id}
                  noParentDetail={true}
                />
              </div>
            )}

            {propertyCategory?.cat_key === COMMERCIAL_PROPERTY_KEY && (
              // <RelatedPropertyDetail
              //   message="This is Commercial Property. You can view and manage your property below"
              //   listTitle="Commercial Property detail"
              //   editPath={PATH_AGENT_DASHBOARD_PROPERTY_EDIT_ABSOLUTE}
              //   editInitialValues={preparePropertyInitialValues()}
              //   relatedProperty={relatedProperty}
              //   editable={true}
              //   deletable={true}
              // />

              <div>
                <CommercialPropertyDetail
                  propComPropId={relatedProperty?.id}
                  noParentDetail={true}
                />
              </div>
            )}

            {propertyCategory?.cat_key === SHARE_HOUSE_KEY && (
              // <RelatedPropertyDetail
              //   message="This is share house. You can view and manage your property below"
              //   listTitle="Share house detail"
              //   editPath={PATH_AGENT_DASHBOARD_SHAREHOUSE_EDIT_ABSOLUTE}
              //   editInitialValues={relatedProperty}
              //   relatedProperty={relatedProperty}
              //   editable={true}
              //   deletable={true}
              // />

              <div>
                <ShareHouseDetail
                  propShareHouseId={relatedProperty?.id}
                  noParentDetail={true}
                />
              </div>
            )}

            {propertyCategory?.cat_key === TRADITIONAL_HOUSE_KEY && (
              // <RelatedPropertyDetail
              //   message="This is traditional house. You can view and manage your property below"
              //   listTitle="Traditional house detail"
              //   editPath={PATH_AGENT_DASHBOARD_PROPERTY_EDIT_ABSOLUTE}
              //   editInitialValues={preparePropertyInitialValues()}
              //   relatedProperty={relatedProperty}
              //   editable={true}
              //   deletable={true}
              // />

              <div>
                <TraditionalHouseDetail
                  propTradHouseId={relatedProperty?.id}
                  noParentDetail={true}
                />
              </div>
            )}

            {propertyCategory?.cat_key === CONDOMINIUM_KEY && (
              // <RelatedPropertyDetail
              //   message="This is Condominium house. You can view and manage your property below"
              //   listTitle="Condominium house detail"
              //   editPath={PATH_AGENT_DASHBOARD_PROPERTY_EDIT_ABSOLUTE}
              //   editInitialValues={preparePropertyInitialValues()}
              //   relatedProperty={relatedProperty}
              //   editable={true}
              //   deletable={true}
              // />

              <div>
                <CondominiumDetail
                  propCondominiumId={relatedProperty?.id}
                  noParentDetail={true}
                />
              </div>
            )}

            {propertyCategory?.cat_key === HALL_KEY && (
              // <RelatedPropertyDetail
              //   message="This is Hall. You can view and manage your property below"
              //   listTitle="Hall detail"
              //   editPath={PATH_AGENT_DASHBOARD_PROPERTY_EDIT_ABSOLUTE}
              //   editInitialValues={preparePropertyInitialValues()}
              //   relatedProperty={relatedProperty}
              //   editable={true}
              //   deletable={true}
              // />

              <div>
                <HallDetail
                  propHallId={relatedProperty?.id}
                  noParentDetail={true}
                />
              </div>
            )}

            {propertyCategory?.cat_key === VILLA_KEY && (
              //  <RelatedPropertyDetail
              //     message="This is Villa. You can view and manage your property below"
              //     listTitle="Villa detail"
              //     editPath={PATH_AGENT_DASHBOARD_PROPERTY_EDIT_ABSOLUTE}
              //     editInitialValues={preparePropertyInitialValues()}
              //     relatedProperty={relatedProperty}
              //     editable={true}
              //     deletable={true}
              //   />
              <div>
                <VillaDetail
                  propVillaId={relatedProperty?.id}
                  noParentDetail={true}
                />
              </div>
            )}

            {propertyCategory?.cat_key === OFFICE_KEY && (
              // <RelatedPropertyDetail
              //   message="This is Office. You can view and manage your property below"
              //   listTitle="Office detail"
              //   editPath={PATH_AGENT_DASHBOARD_PROPERTY_EDIT_ABSOLUTE}
              //   editInitialValues={preparePropertyInitialValues()}
              //   relatedProperty={relatedProperty}
              //   editable={true}
              //   deletable={true}
              // />

              <div>
                <OfficeDetail
                  propOfficeId={relatedProperty?.id}
                  noParentDetail={true}
                />
              </div>
            )}

            {propertyCategory?.cat_key === ALL_PURPOSE_PROPERTY_KEY && (
              // <RelatedPropertyDetail
              //   message="This is All Purpose Property. You can view and manage your property below"
              //   listTitle="All Purpose Property detail"
              //   editPath={PATH_AGENT_DASHBOARD_PROPERTY_EDIT_ABSOLUTE}
              //   editInitialValues={preparePropertyInitialValues()}
              //   relatedProperty={relatedProperty}
              //   editable={true}
              //   deletable={true}
              // />

              <div>
                <AllPurposePropertyDetail
                  propAPPId={relatedProperty?.id}
                  noParentDetail={true}
                />
              </div>
            )}

            {propertyCategory?.cat_key === LAND_KEY && (
              // <RelatedPropertyDetail
              //   message="This is Land. You can view and manage your property below"
              //   listTitle="Land detail"
              //   editPath={PATH_AGENT_DASHBOARD_LAND_EDIT_ABSOLUTE}
              //   editInitialValues={relatedProperty}
              //   relatedProperty={relatedProperty}
              //   editable={true}
              //   deletable={true}
              // />

              <div>
                <LandDetail
                  propLandId={relatedProperty?.id}
                  noParentDetail={true}
                />
              </div>
            )}
          </div>
        )}
      {educationFacility?.length > 0 && (
        <div className="my-4">
          <p className="fw-bold display-title ">Education Facility</p>

          {/* <div className="row row-cols-1 row-cols-lg-2 g-3">
            {educationFacility.map((edufa, index) => {
              //Format the Education facility for display
              const {
                edufa_level,
                distance_from_property,
                distance_unit,
                ...edufaRest
              } = edufa;
              const formattedEdufa = {
                ...edufaRest,
                distance: `${distance_from_property} ${distance_unit}`,
                level: edufa_level.level,
              };
              return (
                <div className="col card-table" key={index}>
                  <div className="card card-cell px-4">
                    <DataDisplay
                      data={formattedEdufa}
                      editable={false}
                      deletable={true}
                      onDelete={() => onEdufaDelete(edufa.id)}
                      // onEdit={() => {}}
                      // path={`${PATH_AGENT_DASHBOARD}/${PATH_AGENT_DASHBOARD_PROPERTY}/${property.id}/${PATH_AGENT_DASHBOARD_EDUCATION_FACILITY_ADD}`}
                      // editInitialValues={edufa}
                    />
                  </div>
                </div>
              );
            })}
          </div> */}
          <div className="card p-4">
            <DataDisplayTabular
              data={formatEdufa()}
              editable={false}
              deletable={true}
              onDelete={onEdufaDelete}
              // onEdit={() => {}}
              // path={`${PATH_AGENT_DASHBOARD}/${PATH_AGENT_DASHBOARD_PROPERTY}/${property.id}/${PATH_AGENT_DASHBOARD_EDUCATION_FACILITY_ADD}`}
              // editInitialValues={edufa}
            />
          </div>
          <div className="d-flex justify-content-end my-4">
            <Link
              to={`${PATH_AGENT_DASHBOARD}/${PATH_AGENT_DASHBOARD_PROPERTY}/${property.id}/${PATH_AGENT_DASHBOARD_EDUCATION_FACILITY_ADD}`}
              state={{ propertyId: property?.id }}
              className="link-general link-size-small py-2 px-3 "
            >
              Add Education Facility
            </Link>
          </div>
        </div>
      )}
      {transportFacility?.length > 0 && (
        <div className="">
          <p className="fw-bold display-title ">Transport Facility</p>

          {/* <div className="row row-cols-1 row-cols-lg-2 g-3">
            {transportFacility.map((tranfa, index) => {
              //Format the transport facility for display
              const {
                trans_fa_category,
                distance_from_property,
                distance_unit,
                ...tranfaRest
              } = tranfa;
              const formattedTranfa = {
                ...tranfaRest,
                distance: `${distance_from_property} ${distance_unit}`,
                category: trans_fa_category.name,
              };
              return (
                <div className="col card-table" key={index}>
                  <div className="card card-cell px-4">
                    <DataDisplay
                      data={formattedTranfa}
                      deletable={true}
                      onDelete={() => onTranfaDelete(tranfa.id)}
                      // editable={true}
                      // onEdit={() => {}}
                      path=""
                    />
                  </div>
                </div>
              );
            })}
          </div> */}

          <div className="card p-4">
            <DataDisplayTabular
              data={formatTranfa()}
              deletable={true}
              onDelete={onTranfaDelete}
              editable={false}
              // onEdit={() => {}}
              path=""
            />
          </div>

          <div className="d-flex justify-content-end my-4">
            <Link
              to={`${PATH_AGENT_DASHBOARD}/${PATH_AGENT_DASHBOARD_PROPERTY}/${property.id}/${PATH_AGENT_DASHBOARD_TRANSPORT_FACILITY_ADD}`}
              state={{ propertyId: property?.id }}
              className="link-general link-size-small py-2 px-3 "
            >
              Add Transport Facility
            </Link>
          </div>
        </div>
      )}
      {pointOfInterest?.length > 0 && (
        <div className="">
          <p className="fw-bold display-title ">Point of Interests</p>

          {/* <div className="row row-cols-1 row-cols-lg-2 g-3">
            {pointOfInterest.map((poi, index) => {
              //Format the point of interests for display
              const {
                poi_category,
                distance_from_property,
                distance_unit,
                ...poiRest
              } = poi;
              const formattedPoi = {
                ...poiRest,
                distance: `${distance_from_property} ${distance_unit}`,
                type: poi_category.name,
              };
              return (
                <div className="col card-table" key={index}>
                  <div className="card card-cell px-4">
                    <DataDisplay
                      data={formattedPoi}
                      editable={true}
                      // onEdit={() => {}}
                      path=""
                    />
                  </div>
                </div>
              );
            })}
          </div> */}

          <div className="card p-4">
            <DataDisplayTabular
              data={formatPoi()}
              editable={false}
              deletable={true}
              // onEdit={() => {}}
              onDelete={onPoiDelete}
              path=""
            />
          </div>

          <div className="d-flex justify-content-end my-4">
            <Link
              to={`${PATH_AGENT_DASHBOARD}/${PATH_AGENT_DASHBOARD_PROPERTY}/${property.id}/${PATH_AGENT_DASHBOARD_POI_ADD}`}
              state={{ propertyId: property?.id }}
              className="link-general link-size-xsmall"
            >
              Add Point of Interest
            </Link>
          </div>
        </div>
      )}
      {rules?.length > 0 && (
        <div className="">
          <p className="fw-bold display-title ">Property Rules</p>

          <div className="card p-4">
            <DataDisplayTabular
              data={formatRules()}
              originalData={rules}
              editable={true}
              deletable={true}
              onEdit={{
                path: `${PATH_AGENT_DASHBOARD}/${PATH_AGENT_DASHBOARD_PROPERTY}/${property.id}/${PATH_AGENT_DASHBOARD_PROPERTY_RULE_ADD}`,
                propertyId: property?.id,
              }}
              onDelete={onRuleDelete}
              path=""
            />
          </div>

          <div className="d-flex justify-content-end my-4">
            <Link
              to={`${PATH_AGENT_DASHBOARD}/${PATH_AGENT_DASHBOARD_PROPERTY}/${property.id}/${PATH_AGENT_DASHBOARD_PROPERTY_RULE_ADD}`}
              state={{ propertyId: property?.id }}
              className="link-general link-size-xsmall"
            >
              Add Rule
            </Link>
          </div>
        </div>
      )}
      {/* List amenities by category */}
      {amenities?.length > 0 && (
        <div className="my-4">
          <p className="fw-bold display-title ">Amenities</p>

          <div className="card">
            <div className="row row-cols-1 row-cols-lg-2 g-3">
              {Object.keys(amenitiesByCategory).map((category, index) => {
                // let data = [];
                // amenitiesByCategory[category]?.forEach((amenity) => {
                //   data = [...data, amenity?.name];
                // });
                // return (
                //   <div className="col card-table" key={index}>
                //     <div className="card card-cell px-4">
                //       <DataDisplay data={data} title={category} path="" />
                //     </div>
                //   </div>
                // );

                let amenData = [];
                amenitiesByCategory[category]?.forEach((amenity) => {
                  const amenObj = { name: amenity?.name, id: amenity?.id };
                  amenData = [...amenData, amenObj];
                });

                const columns = ["name"];

                // console.log("amenData: ", amenData);

                return (
                  <div className=" p-4" key={index}>
                    <p className="fw-bold  mt-3">{category}</p>
                    <DataDisplayTabular
                      data={{ data: amenData, columns: columns }}
                      editable={false}
                      deletable={true}
                      // onEdit={() => {}}
                      onDelete={onAmenityDelete}
                      path=""
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="d-flex justify-content-end my-4">
            <Link
              to={`${PATH_AGENT_DASHBOARD}/${PATH_AGENT_DASHBOARD_PROPERTY}/${property.id}/${PATH_AGENT_DASHBOARD_AMENITY_ADD}`}
              state={{ property: property }}
              className="link-general link-size-xsmall"
            >
              Add Amenity
            </Link>
          </div>
        </div>
      )}
      <div className="row row-cols-auto g-5 my-2">
        {amenities?.length === 0 && (
          <div className="col">
            <Link
              to={`${PATH_AGENT_DASHBOARD}/${PATH_AGENT_DASHBOARD_PROPERTY}/${property.id}/${PATH_AGENT_DASHBOARD_AMENITY_ADD}`}
              state={{ property: property }}
              className="link-general link-size-xsmall"
            >
              Add Amenity
            </Link>
          </div>
        )}
        {educationFacility?.length === 0 && (
          <div className="col">
            <Link
              to={`${PATH_AGENT_DASHBOARD}/${PATH_AGENT_DASHBOARD_PROPERTY}/${property.id}/${PATH_AGENT_DASHBOARD_EDUCATION_FACILITY_ADD}`}
              state={{ propertyId: property?.id }}
              className="link-general link-size-xsmall"
            >
              Add Education Facility
            </Link>
          </div>
        )}
        {transportFacility?.length === 0 && (
          <div className="col">
            <Link
              to={`${PATH_AGENT_DASHBOARD}/${PATH_AGENT_DASHBOARD_PROPERTY}/${property.id}/${PATH_AGENT_DASHBOARD_TRANSPORT_FACILITY_ADD}`}
              state={{ propertyId: property?.id }}
              className="link-general link-size-xsmall"
            >
              Add Transport Facility
            </Link>
          </div>
        )}
        {pointOfInterest?.length === 0 && (
          <div className="col">
            <Link
              to={`${PATH_AGENT_DASHBOARD}/${PATH_AGENT_DASHBOARD_PROPERTY}/${property.id}/${PATH_AGENT_DASHBOARD_POI_ADD}`}
              state={{ propertyId: property?.id }}
              className="link-general link-size-xsmall"
            >
              Add Point of Interest
            </Link>
          </div>
        )}
        {rules?.length === 0 && (
          <div className="col">
            <Link
              to={`${PATH_AGENT_DASHBOARD}/${PATH_AGENT_DASHBOARD_PROPERTY}/${property.id}/${PATH_AGENT_DASHBOARD_PROPERTY_RULE_ADD}`}
              state={{ propertyId: property?.id }}
              className="link-general link-size-xsmall"
            >
              Add Rule
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default PropertyDetail;
