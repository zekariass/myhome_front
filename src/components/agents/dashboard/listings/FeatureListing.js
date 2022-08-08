// @ts-nocheck
import DataDisplay from "components/commons/DataDisplay";
import { BANK_TRANSFER_KEY, MOBILE_KEY } from "components/commons/Strings";
import {
  featureListing,
  getActiveFeaturePrice,
} from "features/listing/listingSlice";
import React, { useEffect, useState } from "react";
import { Form } from "react-final-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentForm from "../payment/PaymentForm";

const FeatureListing = () => {
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [listingData, setListingData] = useState({});

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const featurePrice = useSelector(
    (store) => store.listing.feature.activeFeaturePrice.data
  );

  const paymentMethods = useSelector(
    (store) => store.payment.getPaymentMethods.data
  );

  useEffect(() => {
    const listData = location?.state?.data ? location?.state?.data : {};
    setListingData(listData);

    dispatch(getActiveFeaturePrice());
  }, []);

  const formatFeatureData = (featureData, pm_key) => {
    //Format the formdata to be sent to backend
    //Data that has files must be formatted in formdata object
    let formData = new FormData();

    //Format the data based on feature data keys, such as main_listing or payment
    //e.g. main_listing data is formatted as "main_listing[listing_currency]': ['1']""
    Object.keys(featureData).forEach((key) => {
      if (key === "main_listing") {
        formData.append("main_listing", featureData[key]);
      } else if (key === "payment") {
        const paymentData = featureData[key];
        Object.keys(paymentData).forEach((paymentKey) => {
          if (paymentKey === "pm_key" || paymentKey === "payment_method") {
            formData.append(`payment[${paymentKey}]`, paymentData[paymentKey]);
          } else {
            const subPaymentData = paymentData[paymentKey];
            if (!!Object.keys(subPaymentData).length) {
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

  const onFeatureSubmit = (values) => {
    const featureData = values;

    //Payment method key, allows to identify and synchronize the
    //payment method the agent selects for payment
    let pm_key;

    //Select the Payment method key from pament method data in store based on what the
    //agent selected in dropdown
    paymentMethods.forEach((paymentMethod) => {
      if (
        paymentMethod?.id === parseInt(featureData?.payment?.payment_method)
      ) {
        pm_key = paymentMethod?.pm_key;
      }
    });

    featureData.main_listing = listingData?.id;
    featureData.payment.pm_key = pm_key;

    // console.log("featureData: ", featureData);
    dispatch(
      featureListing({
        featureData: formatFeatureData(featureData, pm_key),
        navigate: navigate,
      })
    );
  };

  return (
    <div className="container py-5">
      <div>
        <p className="fw-bold">
          You are featuring listing with ID:{" "}
          <span className="display-title">{listingData?.id}</span>
        </p>
        <p>
          To feature this listing on the front page, you need to pay:{" "}
          <span className="fw-bold display-title">{featurePrice?.price}</span>
        </p>
      </div>

      <Form onSubmit={onFeatureSubmit}>
        {({ handleSubmit }) => (
          <div className="">
            <form onSubmit={handleSubmit}>
              <div className="col form-outline mb-2">
                <PaymentForm
                  name="payment"
                  attachedFiles={attachedFiles}
                  setAttachedFiles={setAttachedFiles}
                  paymentType="FEATURE"
                  featurePrice={featurePrice?.price}
                />
              </div>
              <div className="flex-center-general">
                <button type="submit" className="btn btn-general">
                  Feature
                </button>
              </div>
            </form>
          </div>
        )}
      </Form>
    </div>
  );
};

export default FeatureListing;
