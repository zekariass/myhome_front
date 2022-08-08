// @ts-nocheck
import CheckField from "components/commons/fields/CheckField";
import DropdownField from "components/commons/fields/DropdownField";
import TextField from "components/commons/fields/TextField";
import { FIELD_SUBSCRIPTION } from "components/commons/fieldSubscription";
import { getCouponDetail } from "features/payment/paymentSlice";
import React, { useEffect, useState } from "react";
import { FormSpy } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import BankTransferPayment from "./BankTransferPayment";
import calculateListingPrice from "./calculateListingPrice";
import CreditCardPayment from "./CreditCardPayment";
import MobilePayment from "./MobilePayment";

/**
 * Payment component
 * @param {*} param0
 * @returns
 */
const Payment = ({
  name,
  attachedFiles,
  setAttachedFiles,
  lastListingPrice,
}) => {
  const [couponCode, setCouponCode] = useState(null);
  const [propertyCategoryDetail, setPropertyCategoryDetail] = useState(null);
  const [listingPriceAfterDiscount, setListingPriceAfterDiscount] = useState(0);
  const [listingPriceCurrency, setListingPriceCurrency] = useState(null);

  //Get coupon data from redux store
  const couponDetail = useSelector(
    (store) => store.payment.coupon.getCouponDetail.data
  );

  //Get payment methods from redux store
  const paymentMethods = useSelector(
    (store) => store.payment.getPaymentMethods.data
  );

  //Get property categories from redux store
  const propertyCategories = useSelector(
    (store) => store.propertyCategory.propertyCategoryList.response.data
  );

  //Get property data from redux store
  const propertyData = useSelector(
    (store) => store.payment.paymentPropertyData
  );

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

  const dispatch = useDispatch();

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

    setCouponCode(couponDetail?.code);
  }, []);

  useEffect(() => {
    //Get the main property category key
    const mainPropCatKey = propertyData?.cat_key;
    let propertyCategory = {};

    //Get the property category data based on the main property caegory key
    propertyCategories?.forEach((pCategory) => {
      if (pCategory?.cat_key === mainPropCatKey) {
        propertyCategory = pCategory;
      }
    });

    setPropertyCategoryDetail(propertyCategory);
  });

  /**
   * Format payment methods
   * Display in the dropdown only Credit card, Mobile and Bank transfer
   * @returns
   */
  const getFormatPaymentMethodNames = () => {
    let newPaymentMethods = [];

    paymentMethods.forEach((paymentMethod) => {
      if (
        !(
          paymentMethod?.name === "SUBSCRIPTION" ||
          paymentMethod?.name === "COUPON" ||
          paymentMethod?.name === "CASH"
        )
      ) {
        let tempPaymentMethod = { ...paymentMethod };
        let paymentMethodName = tempPaymentMethod["name"]
          .replaceAll("_", " ")
          .toLowerCase();
        paymentMethodName =
          paymentMethodName.charAt(0).toUpperCase() +
          paymentMethodName.slice(1);

        tempPaymentMethod = { ...tempPaymentMethod, name: paymentMethodName };

        newPaymentMethods = [...newPaymentMethods, tempPaymentMethod];
      }
    });

    return newPaymentMethods;
  };

  //Get coupon detail from backend
  const onRedeemCouponCode = () => {
    dispatch(getCouponDetail(couponCode));
  };

  const onCouponInputChange = (event) => {
    setCouponCode(event.target.value);
  };

  //If the agent check the "use my coupon" checkbox and the coupon current value is
  //greater than listing price, then automatically go to a confirmation page
  const onCouponCheckBoxChange = (event) => {
    if (event.target.checked) {
      if (couponDetail?.current_value >= listingPriceAfterDiscount) {
        const nextBtn = document.getElementById("next-wizard");
        nextBtn.click();
      }
    }
  };

  return (
    <div>
      <p className="my-3 fw-bold">
        The price of this listing is{" "}
        <span className="display-title">
          {listingPriceAfterDiscount} {listingPriceCurrency}
        </span>
        . Use one of the payment methods below to pay for the listing.
      </p>
      <div className="row my-3">
        <div className="col-md-6 mt-4 mb-3">
          <div className="form-outline mb-5">
            <DropdownField
              name={`${name}.payment_method`}
              className="form-control form-control-lg input-border-color"
              label="Select Payment Method"
              labelClass="form-label fs-5 mt-2"
              options={[
                { id: "-1", name: "--Select Payment Method--" },
                ...getFormatPaymentMethodNames(),
              ]}
              disabled={false}
              dispatchObj={null}
              customOnChange={null}
              validate={() => {}}
              fieldSubscription={FIELD_SUBSCRIPTION}
            />
          </div>

          {/* Display the specific payment method form based on what the agent selects in 
          payment method dropdown */}
          <FormSpy>
            {({ values }) => {
              let methodName = null;
              paymentMethods.forEach((pm) => {
                if (
                  parseInt(pm?.id) === parseInt(values?.payment?.payment_method)
                ) {
                  methodName = pm?.name;
                }
              });
              return (
                <div>
                  <div>
                    {methodName === "BANK_TRANSFER" && (
                      <BankTransferPayment
                        name={`${name}.bank_transfer`}
                        attachedFiles={attachedFiles}
                        setAttachedFiles={setAttachedFiles}
                      />
                    )}
                  </div>
                  <div>
                    {methodName === "MOBILE" && (
                      <MobilePayment name={`${name}.mobile`} />
                    )}
                  </div>
                  <div>
                    {methodName === "CREDIT_CARD" && (
                      <CreditCardPayment name={`${name}.credit_card`} />
                    )}
                  </div>
                </div>
              );
            }}
          </FormSpy>
        </div>
        <div className="col-md-6">
          <div className="form-outline mb-2">
            Do you have Coupon?
            <TextField
              name={`${name}.coupon.coupon_code`}
              id="coupon_code"
              className="form-control form-control-lg input-border-color"
              type="text"
              placeholder=""
              label="Coupon Number"
              labelClass="form-label fs-5 mt-2"
              validate={() => {}}
              fieldSubscription={FIELD_SUBSCRIPTION}
              onInputChange={onCouponInputChange}
              // initialValue={null}
            />
          </div>
          <div>
            <button
              className="btn-general-outline py-2 px-3"
              type="button"
              onClick={onRedeemCouponCode}
            >
              Find Coupon
            </button>
          </div>

          {/* Display the coupon detail */}
          <div className="my-3">
            {!!couponDetail?.code && (
              <div>
                <p>
                  <span className="fw-bold">Code: </span> {couponDetail?.code}
                </p>
                <p>
                  <span className="fw-bold">Current Value: </span>
                  {couponDetail?.current_value}
                </p>
                <p>
                  <span className="fw-bold">Initial Value: </span>
                  {couponDetail?.initial_value}
                </p>
                <p>
                  <span className="fw-bold">Status: </span>
                  {couponDetail?.is_active ? (
                    <span className="text-success fw-bold">Active</span>
                  ) : (
                    <span className="text-danger fw-bold">Expired</span>
                  )}
                </p>
                <div className="my-4">
                  <div className="col form-outline mb-2">
                    <CheckField
                      name={`${name}.coupon.use_coupon_payment`}
                      type="checkbox"
                      className="form-check-input me-2"
                      label="Use my coupon"
                      labelLink=""
                      initialValue={false}
                      disabled={false}
                      fieldSubscription={FIELD_SUBSCRIPTION}
                      onCheckboxChange={onCouponCheckBoxChange}
                    />
                  </div>
                </div>

                {/* Display a heads up if the coupon has no enough balance */}
                {couponDetail?.current_value < listingPriceAfterDiscount && (
                  <div>
                    <p>
                      Your coupon has less value than the price of this listing!
                      Please use another method to pay the rest of price
                    </p>
                  </div>
                )}
              </div>
            )}
            {!couponDetail?.code && (
              <p className="fw-bold text-danger">{couponDetail}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
