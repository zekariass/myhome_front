// @ts-nocheck
import CheckField from "components/commons/fields/CheckField";
import DropdownField from "components/commons/fields/DropdownField";
import TextField from "components/commons/fields/TextField";
import { FIELD_SUBSCRIPTION } from "components/commons/fieldSubscription";
import { getFormatPaymentMethodNames } from "components/commons/functions";
import { getCouponDetail } from "features/payment/paymentSlice";
import React, { useEffect, useState } from "react";
import { OnChange } from "react-final-form-listeners";
import { useDispatch, useSelector } from "react-redux";
import BankTransferPayment from "./BankTransferPayment";
import CreditCardPayment from "./CreditCardPayment";
import MobilePayment from "./MobilePayment";

const PaymentForm = ({
  name,
  attachedFiles,
  setAttachedFiles,
  listingPriceAfterDiscount,
  paymentType,
  featurePrice,
}) => {
  const [couponCode, setCouponCode] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  //Get payment methods from redux store
  const paymentMethods = useSelector(
    // @ts-ignore
    (store) => store.payment.getPaymentMethods.data
  );

  //Get coupon data from redux store
  const couponDetail = useSelector(
    (store) => store.payment.coupon.getCouponDetail.data
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setCouponCode(couponDetail?.code);
  }, []);

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
      if (
        paymentType === "LISTING" &&
        couponDetail?.current_value >= listingPriceAfterDiscount
      ) {
        const nextBtn = document.getElementById("next-wizard");
        nextBtn.click();
      } else {
        if (paymentType === "FEATURE") {
        }
      }
    }
  };

  return (
    <div className="row my-3 jumbotron-general p-5">
      <div className="col-md-6 mt-4 mb-3">
        <div className="form-outline mb-5">
          <DropdownField
            name={`${name}.payment_method`}
            className="form-control form-control-lg input-border-color"
            label="Select Payment Method"
            labelClass="form-label fs-5 mt-2"
            options={[
              { id: "-1", name: "--Select Payment Method--" },
              ...getFormatPaymentMethodNames(paymentMethods),
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
        <OnChange name={`${name}.payment_method`}>
          {(value, previous) => {
            //   let methodName = null;
            paymentMethods.forEach((pm) => {
              if (parseInt(pm?.id) === parseInt(value)) {
                setSelectedPaymentMethod(pm);
              }
              // console.log("methodName: ====>", paymentMethods);
            });
          }}
        </OnChange>
        {/* <FormSpy>
            {({ values }) => {
              let methodName = null;
              paymentMethods.forEach((pm) => {
                if (
                  parseInt(pm?.id) === parseInt(values?.payment?.payment_method)
                ) {
                  methodName = pm?.name;
                }
                // console.log("methodName: ====>", paymentMethods);
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
            
          </FormSpy> */}
        <div>
          <div>
            {selectedPaymentMethod?.name === "BANK_TRANSFER" && (
              <BankTransferPayment
                name={`${name}.bank_transfer`}
                attachedFiles={attachedFiles}
                setAttachedFiles={setAttachedFiles}
              />
            )}
          </div>
          <div>
            {selectedPaymentMethod?.name === "MOBILE" && (
              <MobilePayment name={`${name}.mobile`} />
            )}
          </div>
          <div>
            {selectedPaymentMethod?.name === "CREDIT_CARD" && (
              <CreditCardPayment name={`${name}.credit_card`} />
            )}
          </div>
        </div>
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
              {couponDetail?.current_value > 0 && (
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
              )}

              {/* Display a heads up if the coupon has no enough balance */}
              {couponDetail?.current_value < listingPriceAfterDiscount && (
                <div>
                  <p>
                    Your coupon has less value than the required amount! Please
                    use another method to pay the rest of price
                  </p>
                </div>
              )}
              {couponDetail?.current_value < featurePrice && (
                <div>
                  <p>
                    Your coupon has less value than the required amount! Please
                    use another method to pay the rest of price
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
  );
};

export default PaymentForm;
