// @ts-nocheck
import {
  getCurrencyName,
  getFullAddress,
  getListingTypeName,
  getPeriodicityName,
} from "components/commons/functions";
import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";

const DetailBoxOne = ({ publicListingDetail }) => {
  //Get supported currencies
  const currencies = useSelector(
    (store) => store.system.currency.currencyList.data
  );

  //Get listing types
  const listingTpes = useSelector(
    (store) => store.listing.getListingTypes.data
  );

  //Get periodicities, such as Daily, Weekly, Monthly
  const periodicities = useSelector(
    (store) => store.common.periodicityList.data
  );
  return (
    <Card>
      <Card.Body>
        <div className="row">
          <div className="col-lg-6">
            <p className="fw-bold">
              {publicListingDetail?.property_price}{" "}
              {getCurrencyName(
                currencies,
                publicListingDetail?.listing_currency
              )}
              /
              {getPeriodicityName(
                periodicities,
                publicListingDetail?.listing_term
              )}
            </p>
          </div>
          <div className="col-lg-6 d-flex justify-content-end">
            {" "}
            <p className="display-title fw-bold flex-end-general">
              FOR{" "}
              {getListingTypeName(
                publicListingDetail?.listing_type,
                listingTpes
              )}
            </p>
          </div>
        </div>
        <div>
          <p className="">
            <span>
              <i className="large map marker alternate icon"></i>
            </span>
            {getFullAddress(publicListingDetail?.property?.address)}
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DetailBoxOne;
