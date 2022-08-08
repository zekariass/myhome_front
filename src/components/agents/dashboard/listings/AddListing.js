// @ts-nocheck
import StepperWidget from "components/commons/StepperWidget";
import Wizard from "components/commons/Wizard";
import { goToPage } from "features/common/wizardSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ListingConfirmation from "./ListingConfirmation";
import BasicListingForm from "./BasicListingForm";
import { setPaymentPropertyData } from "features/payment/paymentSlice";
import { setCurrentPage } from "features/global/globalSlice";
import {
  ALL_PURPOSE_PROPERTY_KEY,
  APARTMENT_KEY,
  BANK_TRANSFER_KEY,
  CASH_KEY,
  COMMERCIAL_PROPERTY_KEY,
  CREDIT_CARD_KEY,
  MOBILE_KEY,
} from "components/commons/Strings";
import {
  createListing,
  getAgentListingCount,
} from "features/listing/listingSlice";
import {
  getListingDiscountByCategory,
  getListingPriceByCategory,
} from "features/agent_dashboard/property/propertyCategorySlice";
import ListingPayment from "./ListingPayment";

const AddListing = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [propertyData, setPropertyData] = useState({});
  const [listingPriceAfterDiscount, setListingPriceAfterDiscount] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  //Select payment methods from redux store
  const paymentMethods = useSelector(
    (store) => store.payment.getPaymentMethods.data
  );

  //Select current agent from redux store
  const agent = useSelector((store) => store.agent.getAgent.response.data);

  useEffect(() => {
    //Get property data from router location state
    //The property in this case is either sub-properties such as Villa, or
    //Sub-property units such as Apartment-unit
    const propertyData = location.state?.data;

    setPropertyData(propertyData);

    //Set the current page of wizard to 0
    dispatch(setCurrentPage(0));

    //Set the property to the current property for which payment is to be done
    dispatch(setPaymentPropertyData(propertyData));

    //Get listing discount by category, such as Villa, Apartment, etc
    dispatch(getListingDiscountByCategory(propertyData?.cat_key));

    //Get listing price by category, such as Villa, Apartment, etc
    dispatch(getListingPriceByCategory(propertyData?.cat_key));

    //Get the number of listings the agent has made so far
    dispatch(getAgentListingCount());
  }, []);

  /**
   *Add Listing stepper
   */
  const steps = [
    {
      title: "Listing information",
    },
    {
      title: "Payment",
    },
    { title: "Confirmation" },
  ];

  /**
   * Format the listing form data in a format that the backend can process
   * @param {listingFormData} data
   * @param {boolean} hasCoupon
   * @returns
   */
  const formatListingData = (data, hasCoupon) => {
    //Format the payment data based on whether the agent has active coupon and
    //Whether the agent wants the payment to be deducted from the coupon
    if (hasCoupon) {
      var {
        payment: { coupon, payment_method, ...paymentRest },
        ...dataRest
      } = data;
    } else {
      var {
        payment: { payment_method, ...paymentRest },
        ...dataRest
      } = data;
    }

    //Payment method key, allows to identify and synchronize the
    //payment method the agent selects for payment
    let pm_key;

    //Select the Payment method key from pament method data in store based on what the
    //agent selected in dropdown
    paymentMethods.forEach((paymentMethod) => {
      if (paymentMethod?.id === parseInt(payment_method)) {
        pm_key = paymentMethod?.pm_key;
      }
    });

    // console.log("propertyData: ", propertyData);

    //Property unit (i.e. Apartment units) and subproperty (i.e. Apartment, Villa)
    //The listing is saved as unit listing if the property has units such as apartment,
    //Otherwise save it as subproperty listing if it has no units
    let unit, sub_property;

    //Category key which allows to synchronise the property category in frontend and backend
    const cat_key = propertyData?.cat_key;

    //If property is Commercial property, apartment or all purpose property, then set unit
    //as the ID of the current property data and set sub_property as the corrosponding
    //sub-property id
    if (
      cat_key === COMMERCIAL_PROPERTY_KEY ||
      cat_key === APARTMENT_KEY ||
      cat_key === ALL_PURPOSE_PROPERTY_KEY
    ) {
      unit = propertyData?.id;
      if (cat_key === COMMERCIAL_PROPERTY_KEY) {
        sub_property = propertyData?.commercial_property;
      } else if (cat_key === APARTMENT_KEY) {
        sub_property = propertyData?.apartment;
      } else if (cat_key === ALL_PURPOSE_PROPERTY_KEY) {
        sub_property = propertyData?.all_purpose_property;
      }
    }
    //Otherwise set the ID of the current property data as sub_property value
    else {
      sub_property = propertyData?.id;
    }

    //Format the main listing data in one object
    const mainListingData = {
      ...dataRest,
      property: propertyData?.property,
      cat_key: cat_key,
      sub_property: sub_property,
      unit: unit,
      agent: agent?.id,
    };

    //Format listing data in one object which contains both mainlisting and payment data
    const listingData = {
      main_listing: mainListingData,
      payment: {
        coupon: coupon,
        payment_method: payment_method,
        pm_key: pm_key,
        listing_price: listingPriceAfterDiscount,
      },
    };

    //Set the payment method data based on the peyment method key the agent selected
    switch (pm_key) {
      case CASH_KEY:
        listingData.payment.cash_payment = paymentRest.cash_payment;
        break;
      case BANK_TRANSFER_KEY:
        listingData.payment.bank_transfer = paymentRest.bank_transfer;
        break;
      case CREDIT_CARD_KEY:
        listingData.payment.credit_card = paymentRest.credit_card;
        break;
      case MOBILE_KEY:
        listingData.payment.mobile_payment = paymentRest.mobile_payment;
        break;
    }

    // console.log("UUUUUFFFFF: ", listingData);

    //Format the formdata to be sent to backend
    //Data that has files must be formatted in formdata object
    let formData = new FormData();

    //Format the data based on listing data keys, such as main_listing or payment
    //e.g. main_listing data is formatted as "main_listing[listing_currency]': ['1']""
    Object.keys(listingData).forEach((key) => {
      if (key === "main_listing") {
        const mainListing = listingData[key];
        Object.keys(mainListing).forEach((listingKey) => {
          formData.append(
            `main_listing[${listingKey}]`,
            mainListing[listingKey]
          );
        });
      } else if (key === "payment") {
        const paymentData = listingData[key];
        Object.keys(paymentData).forEach((paymentKey) => {
          if (
            paymentKey === "pm_key" ||
            paymentKey === "payment_method" ||
            paymentKey === "listing_price"
          ) {
            formData.append(`payment[${paymentKey}]`, paymentData[paymentKey]);
          } else {
            const subPaymentData = paymentData[paymentKey];
            if (subPaymentData) {
              Object.keys(subPaymentData).forEach((subPaymentKey) => {
                formData.append(
                  `payment[${paymentKey}][${subPaymentKey}]`,
                  subPaymentData[subPaymentKey]
                );
              });
            }
          }
        });
      }
    });

    //Appent payment reciepts to the form data
    if (pm_key === BANK_TRANSFER_KEY || pm_key === MOBILE_KEY) {
      attachedFiles.forEach((file) => {
        formData.append("reciept", file, file?.name);
      });
    }

    return formData;
  };

  const onSubmit = (values) => {
    //Check if the user has entered any coupon and wants to use it for payment
    const hasCoupon = values.payment?.coupon?.use_coupon_payment;

    //Format the form data before submit to backend
    const formattedData = formatListingData(values, hasCoupon);
    dispatch(createListing({ listingData: formattedData, navigate: navigate }));
  };

  /**
   * Handles the click action of edit link in listing data confirmation list
   * @param {number} step
   */
  const onEditClick = (step) => {
    setCurrentStep(step);
    dispatch(goToPage(step));
  };

  /**
   * Shows the Edit link on listing data confirmation list
   * @param {number} step
   * @returns
   */
  const edit = (step) => {
    return (
      <Link to="#" onClick={() => onEditClick(step)} className="link-general">
        Edit
      </Link>
    );
  };

  return (
    <div className="container">
      <div className="row g-3 mt-3">
        <div className="col-lg-12 card shadow-sm  px-3">
          <div className="mb-4">
            <StepperWidget steps={steps} currentStep={currentStep} />
          </div>
          <div className="py-4">
            <Wizard
              onSubmit={onSubmit}
              // initialValues={{}}
              setCurrentStep={setCurrentStep}
            >
              <Wizard.Page>
                <BasicListingForm />
              </Wizard.Page>
              <Wizard.Page>
                <ListingPayment
                  name="payment"
                  attachedFiles={attachedFiles}
                  setAttachedFiles={setAttachedFiles}
                  lastListingPrice={setListingPriceAfterDiscount}
                />
              </Wizard.Page>
              <Wizard.Page>
                <ListingConfirmation edit={edit} />
              </Wizard.Page>
            </Wizard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddListing;
