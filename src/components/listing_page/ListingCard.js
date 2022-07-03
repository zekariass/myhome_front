// @ts-nocheck
import {
  getCurrencyName,
  getFullAddress,
  getPeriodicityName,
  getPropertyCategoryData,
} from "components/commons/functions";
import {
  CONDOMINIUM_KEY,
  PATH_PUBLIC_LISTING,
  SHARE_HOUSE_KEY,
  VILLA_KEY,
} from "components/commons/Strings";
import { getAgentById } from "features/agent/agentSlice";
import React, { useEffect, useState } from "react";
import { Card, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ListingCard = ({ listing }) => {
  const [propertyCategoryData, setPropertyCategoryData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currencies = useSelector(
    (store) => store.system.currency.currencyList.data
  );

  const periodicities = useSelector(
    (store) => store.common.periodicityList.data
  );

  const propertyCategories = useSelector(
    (store) => store.propertyCategory.propertyCategoryList.response.data
  );

  // const agent = useSelector(
  //   (store) => store.propertyCategory.propertyCategoryList.response.data
  // );

  useEffect(() => {
    setPropertyCategoryData(
      getPropertyCategoryData(propertyCategories, listing?.property_category)
    );
  }, []);

  const onListingCardClick = () => {
    navigate(`${listing?.id}/detail`);
  };

  return (
    <div className="">
      <Card
        className="card-border-radius shadow"
        role="button"
        onClick={onListingCardClick}
      >
        <Carousel
          interval={null}
          nextIcon={
            <span>
              <i className="big chevron circle right icon"></i>
            </span>
          }
          prevIcon={
            <span>
              <i className="big chevron circle left icon"></i>
            </span>
          }
        >
          {listing.property_images.map((image_obj, index) => (
            <Carousel.Item key={index}>
              <Card.Img
                className="card-border-radius"
                variant="top"
                src={image_obj?.image}
                height={300}
                width="100%"
              />
              <Carousel.Caption>
                <h6>{image_obj?.label_name}</h6>
                <p className="flex-end-general">
                  {String(index + 1)} / {String(listing.property_images.length)}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
        <Card.Body>
          <Card.Text className="flex-center-general ">
            {getFullAddress(listing?.address)}
          </Card.Text>
          {/* {listing?.description && (
            <Card.Text className="flex-center-general listing-card-description">
              {listing?.description?.substring(0, 150)}...
            </Card.Text>
          )} */}
          <div className="row">
            <div className="col-md-6">
              <Card.Text className="">{propertyCategoryData?.name}</Card.Text>
              <Card.Text className="fw-bold">
                <>
                  {listing?.property_price}{" "}
                  {getCurrencyName(currencies, listing?.listing_currency)}/
                  {getPeriodicityName(periodicities, listing?.listing_term)}
                </>
              </Card.Text>
            </div>
            <div className="col-md-6 input-border-color">
              <Card.Text className="">{listing?.agent?.name} </Card.Text>
              <Card.Text className="">
                <i className="call icon"></i>
                {listing?.agent?.contact_number}{" "}
              </Card.Text>
            </div>
          </div>
        </Card.Body>

        {(propertyCategoryData?.cat_key === VILLA_KEY ||
          propertyCategoryData?.cat_key === CONDOMINIUM_KEY ||
          propertyCategoryData?.cat_key === SHARE_HOUSE_KEY) && (
          <div className="border-top py-1 flex-center-general">
            <div className="row row-cols-auto">
              {listing?.number_of_baths > 0 && (
                <div className="col">
                  <i className="shower icon"></i>
                  {listing?.number_of_baths}
                </div>
              )}
              {listing?.number_of_bed_rooms > 0 && (
                <div className="col">
                  <i className="bed icon"></i>
                  {listing?.number_of_bed_rooms}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="border-top">
          <div className="row mb-2 px-3 g-3">
            <div className="col-6 flex-center-general">
              <Link
                to="#"
                className="link-general link-size-normal py-2  w-100"
              >
                <i className="large heart outline icon"></i> Save
              </Link>
            </div>
            <div className="col-6 flex-center-general">
              <Link to="#" className="link-general link-size-normal py-2 w-100">
                <i className="large envelope outline icon"></i> Contact Agent
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ListingCard;
