// @ts-nocheck
import DropdownField from "components/commons/fields/DropdownField";
import TextField from "components/commons/fields/TextField";
import { FIELD_SUBSCRIPTION } from "components/commons/fieldSubscription";
import React from "react";
import { useSelector } from "react-redux";

/**
 * Credit card payment form
 * @param {*} param0
 * @returns
 */
const CreditCardPayment = ({ name }) => {
  //Get supported cards scheme from store
  const supportedCardSchemes = useSelector(
    (store) => store.payment.getSupportedCardSchemes.data
  );
  return (
    <div>
      <div className="form-outline mb-2">
        <DropdownField
          name={`${name}.card_scheme`}
          className="form-control form-control-lg input-border-color"
          label="Select Payment Method"
          labelClass="form-label fs-5 mt-2"
          options={[
            { id: "-1", name: "--Select Payment Method--" },
            ...supportedCardSchemes,
          ]}
          disabled={false}
          dispatchObj={null}
          customOnChange={null}
          validate={() => {}}
          fieldSubscription={FIELD_SUBSCRIPTION}
        />
      </div>
      <div className="form-outline mb-2">
        <TextField
          name={`${name}.card_number`}
          className="form-control form-control-lg input-border-color"
          type="text"
          placeholder=""
          label="Card Number"
          labelClass="form-label fs-5 mt-2"
          validate={() => {}}
          fieldSubscription={FIELD_SUBSCRIPTION}
        />
      </div>
      <div className="form-outline mb-2">
        <TextField
          name={`${name}.expiry_date`}
          className="form-control form-control-lg input-border-color"
          type="date"
          placeholder=""
          label="Expiry Date"
          labelClass="form-label fs-5 mt-2"
          validate={() => {}}
          fieldSubscription={FIELD_SUBSCRIPTION}
        />
      </div>
      <div className="form-outline mb-2">
        <TextField
          name={`${name}.cvv`}
          className="form-control form-control-lg input-border-color"
          type="number"
          placeholder=""
          label="CVV (CVC)"
          labelClass="form-label fs-5 mt-2"
          validate={() => {}}
          fieldSubscription={FIELD_SUBSCRIPTION}
        />
      </div>
      <div className="form-outline mb-2">
        <TextField
          name={`${name}.name_on_card`}
          className="form-control form-control-lg input-border-color"
          type="text"
          placeholder=""
          label="Name on Card"
          labelClass="form-label fs-5 mt-2"
          validate={() => {}}
          fieldSubscription={FIELD_SUBSCRIPTION}
        />
      </div>
    </div>
  );
};

export default CreditCardPayment;
