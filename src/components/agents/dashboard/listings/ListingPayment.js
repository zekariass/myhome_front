// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import calculateListingPrice from "../payment/calculateListingPrice";
import PaymentForm from "../payment/PaymentForm";

/**
 * Payment component
 * @param {*} param0
 * @returns
 */
const ListingPayment = ({
  name,
  attachedFiles,
  setAttachedFiles,
  lastListingPrice,
}) => {
  const [listingPriceAfterDiscount, setListingPriceAfterDiscount] = useState(0);
  const [listingPriceCurrency, setListingPriceCurrency] = useState(null);

  //Get listing prices from redux store
  const listingPrices = useSelector(
    (store) => store.propertyCategory.listing.listingPriceByCategoryList.data
  );

  //Get listing discounts from redux store
  const listingdiscounts = useSelector(
    (store) => store.propertyCategory.listing.listingDiscountByCategoryList.data
  );

  //Get listing params from redux store
  const listingParams = useSelector((store) => store.system.listingParams.data);

  //Get agent listimg count from redux store
  const agentListingCount = useSelector(
    (store) => store.listing.agentListingCount.data
  );

  //Get the selected listing type from redux store
  const selectedListingTypeId = useSelector(
    (store) => store.listing.selectedListingType
  );

  //Get agent data from redux store
  const agentData = useSelector((store) => store.agent.getAgent.response.data);

  useEffect(() => {
    //Calculate the listing price after discount
    const listingPriceAndCurrency = calculateListingPrice(
      listingPrices,
      listingdiscounts,
      listingParams,
      agentListingCount,
      selectedListingTypeId,
      agentData
    );

    //Destructure the listing price and currency returned from calculateListingPrice function
    const { listingPrice, currency } = listingPriceAndCurrency;

    //Set the last or final listing price after discount
    lastListingPrice(listingPrice);

    //Set the last or final listing price after discount - state of this component
    setListingPriceAfterDiscount(listingPrice);
    setListingPriceCurrency(currency);
  }, []);

  // useEffect(() => {
  //   //Get the main property category key
  //   const mainPropCatKey = propertyData?.cat_key;
  //   let propertyCategory = {};

  //   //Get the property category data based on the main property caegory key
  //   propertyCategories?.forEach((pCategory) => {
  //     if (pCategory?.cat_key === mainPropCatKey) {
  //       propertyCategory = pCategory;
  //     }
  //   });

  //   setPropertyCategoryDetail(propertyCategory);
  // });

  return (
    <div>
      <p className="my-3 fw-bold">
        The price of this listing is{" "}
        <span className="display-title">
          {listingPriceAfterDiscount} {listingPriceCurrency}
        </span>
        . Use one of the payment methods below to pay for the listing.
      </p>
      <PaymentForm
        name={name}
        attachedFiles={attachedFiles}
        setAttachedFiles={setAttachedFiles}
        listingPriceAfterDiscount={listingPriceAfterDiscount}
        paymentType="LISTING"
      />
    </div>
  );
};

export default ListingPayment;
