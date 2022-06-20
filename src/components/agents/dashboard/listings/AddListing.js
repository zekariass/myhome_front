// @ts-nocheck
import StepperWidget from "components/commons/StepperWidget";
import Wizard from "components/commons/Wizard";
import { goToPage } from "features/common/wizardSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Payment from "../payment/Payment";
import ListingConfirmation from "./ListingConfirmation";
import BasicListingForm from "./BasicListingForm";
import { setPaymentPropertyData } from "features/payment/paymentSlice";
import { setCurrentPage } from "features/global/globalSlice";
import {
  BANK_TRANSFER_KEY,
  CASH_KEY,
  CREDIT_CARD_KEY,
  MOBILE_KEY,
} from "components/commons/Strings";
import { createListing } from "features/listing/listingSlice";

const AddListing = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [propertyData, setPropertyData] = useState({});
  const [listingPriceAfterDiscount, setListingPriceAfterDiscount] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const paymentMethods = useSelector(
    (store) => store.payment.getPaymentMethods.data
  );

  const agent = useSelector((store) => store.agent.getAgent.response.data);

  useEffect(() => {
    // setCurrentStep(0);
    const propertyData = location.state?.data;
    setPropertyData(propertyData);
    dispatch(setCurrentPage(0));
    dispatch(setPaymentPropertyData(propertyData));

    // dispatch(getListingDiscountByCategory(propertyData?.cat_key));
    // dispatch(getListingPriceByCategory(propertyData?.cat_key));
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

  const formatListingData = (data) => {
    const {
      payment: { coupon, payment_method, ...paymentRest },
      ...dataRest
    } = data;

    let pm_key;

    paymentMethods.forEach((paymentMethod) => {
      if (paymentMethod?.id === parseInt(payment_method)) {
        pm_key = paymentMethod?.pm_key;
      }
    });

    // console.log("propertyData: ", propertyData);

    const mainListingData = {
      ...dataRest,
      property: propertyData?.property,
      cat_key: propertyData?.cat_key,
      sub_property: propertyData?.id,
      agent: agent?.id,
    };

    // console.log("listingPriceAfterDiscount: ", listingPriceAfterDiscount);
    const listingData = {
      main_listing: mainListingData,
      payment: {
        coupon: coupon,
        payment_method: payment_method,
        pm_key: pm_key,
        listing_price: listingPriceAfterDiscount,
      },
    };

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
    let formData = new FormData();
    // formData.append("listing", listingData);
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
            Object.keys(subPaymentData).forEach((subPaymentKey) => {
              formData.append(
                `payment[${paymentKey}][${subPaymentKey}]`,
                subPaymentData[subPaymentKey]
              );
            });
          }
        });
      }
    });

    if (pm_key === BANK_TRANSFER_KEY || pm_key === MOBILE_KEY) {
      attachedFiles.forEach((file) => {
        formData.append("reciept", file, file?.name);
      });
    }

    return formData;
  };

  const onSubmit = (values) => {
    const formattedData = formatListingData(values);
    dispatch(createListing(formattedData));
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
                <Payment
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
