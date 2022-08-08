import ConfirmationList from "components/commons/ConfirmationList";
import React from "react";
import { FormSpy } from "react-final-form";

/**
 * Confirmation of listing data before submit
 * @param {object} param0
 * @returns
 */
const ListingConfirmation = ({ edit }) => {
  return (
    <div>
      {/* Format the data by getting the values using FOrmSpy for display */}
      <FormSpy>
        {({ values }) => {
          console.log("OBJECT ERROR: ", values)
          let { payment, ...listingRest } = values;

          const bank_transfer = payment?.bank_transfer;
          const coupon = payment?.coupon;
          const paymentDetail = payment?.paymentDetail;
          const paymentMethod = payment?.payment_method;

          const paymentData = {
            payment_method: paymentMethod,
            ...paymentDetail,
            ...bank_transfer,
            ...coupon,
          };

          return (
            <div>
              <div className="card p-3 footer-bg shadow-sm my-3">
                {/* Show confirmation for parent property data */}
                <ConfirmationList
                  data={listingRest}
                  title="Listing Data"
                  edit={edit(0)}
                  listClassName="card my-1"
                />
              </div>
              <div className="card p-3 footer-bg shadow-sm my-3">
                {/* Show confirmation for parent property data */}
                <ConfirmationList
                  data={paymentData}
                  title="Payment Detail"
                  edit={edit(1)}
                  listClassName="card my-1"
                />
              </div>
            </div>
          );
        }}
      </FormSpy>
    </div>
  );
};

export default ListingConfirmation;
