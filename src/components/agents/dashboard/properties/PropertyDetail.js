// @ts-nocheck
import DataDisplay from "components/commons/DataDisplay";
import MinimisedImageGallery from "components/commons/MinimisedImageGallery";
import MyModal from "components/commons/Modal";
import {
  PATH_AGENT_DASHBOARD,
  PATH_AGENT_DASHBOARD_EDUCATION_FACILITY_ADD,
  PATH_AGENT_DASHBOARD_EDUCATION_FACILITY_ADD_ABSOLUTE,
  PATH_AGENT_DASHBOARD_PROPERTY,
  PATH_AGENT_DASHBOARD_PROPERTY_ADDRESS_EDIT_ABSOLUTE,
  PATH_AGENT_DASHBOARD_PROPERTY_EDIT_ABSOLUTE,
  PATH_AGENT_DASHBOARD_PROPERTY_FILE_UPLOAD_ABSOLUTE,
} from "components/commons/Strings";
import { getPropertyDetail } from "features/agent_dashboard/property/propertySlice";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const PropertyDetail = () => {
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
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [propertyBasicData, setPropertyBasicData] = useState({});
  const [propertyRestData, setPropertyRestData] = useState({});

  // const [editFormPath, setEditFormPath] = useState(null);

  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const property = useSelector(
    (store) => store.property.singlePropertyAction.data
  ); //useMemo(() => location.state?.property);

  useEffect(() => {
    const propertyId = location.state?.propertyId;
    dispatch(getPropertyDetail(propertyId));
  }, []);

  useEffect(() => {
    const {
      address,
      agent,
      amenity,
      education_facility,
      transport_facility,
      point_of_interest,
      property_category,
      images,
      videos,
      virtual_tours,
      ...propertyRestData
    } = property;

    setAmenities(amenity);
    setAddress(address);
    setEducationFacility(education_facility);
    setTransportFacility(transport_facility);
    setPointOfInterest(point_of_interest);
    setPropertyCategory(property_category);
    setImages(images);
    setVideos(videos);
    setPropertyRestData(propertyRestData);

    setPropertyBasicData({
      ...propertyRestData,
      category: property_category?.name,
    });

    const { country, region, city, ...addressRest } = address;
    setFormattedAddressName({
      ...addressRest,
      country: country?.name,
      region: region?.name,
      city: city?.name,
    });

    const tempAmenitiesByCategory = {};

    amenity.forEach((amen) => {
      tempAmenitiesByCategory[amen.category.name] = [];
    });

    amenity.forEach((amen) => {
      Object.keys(tempAmenitiesByCategory).forEach((categoryKey) => {
        if (categoryKey === amen.category.name) {
          tempAmenitiesByCategory[categoryKey] = [
            ...tempAmenitiesByCategory[categoryKey],
            amen.name,
          ];
        }
      });
    });
    setAmenitiesByCategory(tempAmenitiesByCategory);
  }, [property]);

  // console.log("address: ", address);

  // console.log("PROPERTY: ", addressRest);

  const modalBodyMessage = () => {
    return (
      <video width="100%" height="100%" className="" controls autoPlay>
        <source src={fileToDIsplay?.video} type={fileToDIsplay?.type} />
      </video>
    );
  };

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

  const preparePropAddressInitialValues = () => {
    const { country, region, city, ...addressRest } = address;
    const formattedAddressWithId = {
      ...addressRest,
      country: country?.id,
      region: region?.id,
      city: city?.id,
    };

    return { address: formattedAddressWithId };
  };

  return (
    <main className="my-3">
      <div className="mb-3">
        <MinimisedImageGallery data={images} />
      </div>

      <div className="d-flex justify-content-end my-4 ">
        {videos.length > 0 && (
          <div className="">
            <Link to="#" className="link-general link-size-small py-2 px-3">
              See All Pictures
            </Link>
          </div>
        )}
      </div>

      <div className="row">
        {videos.length > 0 && (
          <div>
            <p className="fw-bold">Videos</p>
          </div>
        )}
        {videos.map((video, index) => (
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
      <MyModal
        show={openModal}
        onHide={() => setOpenModal(false)}
        bodyMessage={modalBodyMessage}
        title="Play your video"
      />
      <div className="d-flex justify-content-end my-4 row row-cols-auto">
        {videos.length > 0 && (
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
              from: "property_detail",
            }}
          >
            Uoload Medias (Picture, Video, Virtual Tours)
          </Link>
        </div>
      </div>

      <MyModal
        show={openModal}
        onHide={() => setOpenModal(false)}
        bodyMessage={modalBodyMessage}
        title="Play your video"
      />

      {/* <div className="w-50">
        <iframe
          src="https://www.marzipano.net/demos/sample-tour"
          height="200"
          width="300"
          title="Iframe Example"
        ></iframe>
      </div> */}

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

      {educationFacility.length > 0 && (
        <div className="my-4">
          <p className="fw-bold display-title ">Education Facility</p>

          <div className="row row-cols-1 row-cols-lg-2 g-3">
            {educationFacility.map((edufa, index) => {
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
                      editable={true}
                      // onEdit={() => {}}
                      path=""
                    />
                  </div>
                </div>
              );
            })}
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

      {transportFacility.length > 0 && (
        <div className="">
          <p className="fw-bold display-title ">Transport Facility</p>

          <div className="row row-cols-1 row-cols-lg-2 g-3">
            {transportFacility.map((tranfa, index) => {
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
                      editable={true}
                      // onEdit={() => {}}
                      path=""
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="d-flex justify-content-end my-4">
            <button className="btn-general py-2 px-3 ">
              Add Transport Facility
            </button>
          </div>
        </div>
      )}

      {pointOfInterest.length > 0 && (
        <div className="">
          <p className="fw-bold display-title ">Point of Interests</p>

          <div className="row row-cols-1 row-cols-lg-2 g-3">
            {pointOfInterest.map((poi, index) => {
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
          </div>
          <div className="d-flex justify-content-end my-4">
            <button className="btn-general py-2 px-3 ">
              Add Point of Interest
            </button>
          </div>
        </div>
      )}

      {amenities.length > 0 && (
        <div className="my-4">
          <p className="fw-bold display-title ">Amenities</p>

          <div className="row row-cols-1 row-cols-lg-2 g-3">
            {Object.keys(amenitiesByCategory).map((category, index) => {
              // console.log("amenitiesByCategory: ", amenitiesByCategory);
              return (
                <div className="col card-table" key={index}>
                  <div className="card card-cell px-4">
                    <DataDisplay
                      data={amenitiesByCategory[category]}
                      title={category}
                      path=""
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="d-flex justify-content-end my-4">
            <button className="btn-general py-2 px-3 ">Add Amenity</button>
          </div>
        </div>
      )}

      <div className="row row-cols-auto g-5 my-2">
        {amenities.length === 0 && (
          <div className="col">
            <Link to="" className="link-general link-size-xsmall">
              Add Amenity
            </Link>
          </div>
        )}
        {educationFacility.length === 0 && (
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
        {transportFacility.length === 0 && (
          <div className="col">
            <Link to="" className="link-general link-size-xsmall">
              Add Transport Facility
            </Link>
          </div>
        )}
        {pointOfInterest.length === 0 && (
          <div className="col">
            <Link to="" className="link-general link-size-xsmall">
              Add Point of Interest
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default PropertyDetail;
