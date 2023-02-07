// @ts-nocheck
import AgentPreview from "components/agents/AgentPreview";
import ContactForm from "components/commons/ContactForm";
import {
  getCurrencyName,
  getFullAddress,
  getPeriodicityName,
} from "components/commons/functions";
import { PATH_PUBLIC_LISTING } from "components/commons/Strings";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const ContactAgent = () => {
  const [agentData, setAgentData] = useState({});
  const [listingData, setListingData] = useState({});
  //   console.log(("listingData: ", listingData));

  //Get supported currencies
  const currencies = useSelector(
    (store) => store.system.currency.currencyList.data
  );

  //Get listing types
  //   const listingTpes = useSelector(
  //     (store) => store.listing.getListingTypes.data
  //   );

  //Get periodicities, such as Daily, Weekly, Monthly
  const periodicities = useSelector(
    (store) => store.common.periodicityList.data
  );
  const location = useLocation();
  useEffect(() => {
    setAgentData(location?.state?.agentData);
    setListingData(location?.state?.listingData);
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-7">
          <div className="card rounded-3 p-2 shadow-sm bg-grin">
            <div className="row">
              <div className="col-lg-4">
                <img
                  src={listingData?.property?.images[0].image}
                  alt=""
                  width="100%"
                  className="rounded-3"
                />
              </div>

              <div className="col-lg-8">
                <div className="mb-2">
                  <i className="large map marker alternate icon text-danger"></i>
                  {getFullAddress(listingData?.property?.address)}
                </div>
                <p>{listingData?.description?.substring(0, 150)}...</p>
                <p className="fw-bold">
                  {listingData?.property_price}{" "}
                  {getCurrencyName(currencies, listingData?.listing_currency)}/
                  {getPeriodicityName(periodicities, listingData?.listing_term)}
                  {"  "}
                  {listingData?.property?.property_category?.name}
                </p>
                <Link
                  to={`${PATH_PUBLIC_LISTING}/${listingData?.id}/detail`}
                  className="link-general link-size-normal"
                >
                  See Detail
                </Link>
              </div>
            </div>
          </div>

          <div className="py-4">
            <p className="fw-bold">
              Fill the your degtai and send to the agent
            </p>
            <ContactForm />
          </div>
        </div>
        <div className="col-lg-5">
          <AgentPreview agentData={agentData} disableContactButton={true} />
        </div>
      </div>
    </div>
  );
};

export default ContactAgent;
