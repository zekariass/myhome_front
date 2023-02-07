// @ts-nocheck
import {
  getCurrencyName,
  getFullAddress,
  getListingTypeName,
  getPeriodicityName,
  getPropertyCategoryData,
} from "components/commons/functions";
import {
  CONDOMINIUM_KEY,
  PATH_PUBLIC_LISTING,
  SHARE_HOUSE_KEY,
  VILLA_KEY,
} from "components/commons/Strings";
import React, { useEffect, useState } from "react";
import { Card, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import SaveAndShareBox from "./public_listing_detail/SaveAndShareBox";

const ListingCard = ({ listing, page }) => {
  const [propertyCategoryData, setPropertyCategoryData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const currencies = useSelector(
    (store) => store.system.currency.currencyList.data
  );

  const listingTpes = useSelector(
    (store) => store.listing.getListingTypes.data
  );

  const periodicities = useSelector(
    (store) => store.common.periodicityList.data
  );

  const propertyCategories = useSelector(
    (store) => store.propertyCategory.propertyCategoryList.response.data
  );

  useEffect(() => {
    setPropertyCategoryData(
      getPropertyCategoryData(propertyCategories, listing?.property_category)
    );
  }, []);

  const onListingCardClick = () => {
    navigate(`${PATH_PUBLIC_LISTING}/${listing?.id}/detail`);
  };

  return (
    <div className="">
      <Card
        className="card-border-radius shadow"
        role="button"
        // onClick={onListingCardClick}
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
          {listing.property_images?.map((image_obj, index) => (
            <Carousel.Item key={index}>
              <Card.Img
                className="card-border-radius"
                variant="top"
                src={image_obj?.image}
                height={300}
                width="100%"
                onClick={onListingCardClick}
              />
              <Carousel.Caption>
                <h6>{image_obj?.label_name}</h6>
                <p className="flex-end-general">
                  {String(index + 1)} /{" "}
                  {String(listing?.property_images?.length)}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
        <Card.Body onClick={onListingCardClick} style={{lineHeight:"1rem"}}>
          <Card.Text className="fw-bold">
            {getFullAddress(listing?.address)}
          </Card.Text>

          <div className="row">
            <div className="col-md-6">
              <Card.Text
                className="display-title fw-bold "
              >
                {propertyCategoryData?.name}
              </Card.Text>
              <Card.Text className="fw-bold">
                <>
                  <span className="fs-4">{listing?.property_price}{" "}</span>
                  {getCurrencyName(currencies, listing?.listing_currency)}/
                  {getPeriodicityName(periodicities, listing?.listing_term)}
                </>
              </Card.Text>
            </div>
            <div className="col-md-6 input-border-color py-1">
              <Card.Text className="">{listing?.agent?.name} </Card.Text>

              <Card.Text className="mb-1">
                <i className="large envelope outline icon grin-color"></i>
                <span className="mx-2">Contact</span>
                <i className="large phone square icon grin-color"></i>
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
              <p className="flex-end-general">
                FOR {getListingTypeName(listing?.listing_type, listingTpes)}
              </p>
            </div>
          </div>
        )}

        <div className="border-top">
          <SaveAndShareBox
            listing={listing}
            page={page}
            searchQuery={location.search}
          />
        </div>
      </Card>
    </div>
  );
};

export default ListingCard;
