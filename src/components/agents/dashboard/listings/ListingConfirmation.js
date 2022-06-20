import ConfirmationList from "components/commons/ConfirmationList";
import React from "react";
import { FormSpy } from "react-final-form";

const ListingConfirmation = ({ edit }) => {
  return (
    <div>
      <FormSpy>
        {({ values }) => {
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
