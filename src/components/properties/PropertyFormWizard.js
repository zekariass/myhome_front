// @ts-nocheck
import AgentPreview from "components/agents/AgentPreview";
import AddressForm from "components/commons/AddressForm";
import StepperWidget from "components/commons/StepperWidget";
import Wizard from "components/commons/Wizard";
import React, { useEffect, useState } from "react";
import Apartment from "./forms/Apartment";
import ParentProperty from "./forms/ParentProperty";
import PropertyDataConfirmation from "./PropertyDataConfirmation";
import { FormSpy } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { createProperty } from "features/property/propertySlice";

const PropertyFormWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const dispatch = useDispatch();

  const steps = [
    {
      title: "Property",
    },
    {
      title: "Property Category",
    },
    { title: "Address" },
    { title: "Confirmation" },
  ];

  const onSubmit = (values) => {
    dispatch(createProperty(values));
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-7">
          <div className="mb-4">
            <StepperWidget steps={steps} currentStep={currentStep} />
          </div>
          <Wizard
            onSubmit={onSubmit}
            initialValues={{ apartment: { units: [{}] } }}
            setCurrentStep={setCurrentStep}
          >
            <Wizard.Page>
              <ParentProperty />
            </Wizard.Page>
            <Wizard.Page>
              <Apartment label="apartment" title="Apartment" />
            </Wizard.Page>
            <Wizard.Page>
              <AddressForm label="address" title="Property Address" />
            </Wizard.Page>
            <Wizard.Page>
              <FormSpy>
                {({ values }) => <PropertyDataConfirmation values={values} />}
              </FormSpy>
            </Wizard.Page>
          </Wizard>
        </div>
        <div className="col-lg-5 mt-sm-3">
          <AgentPreview />
        </div>
      </div>
    </div>
  );
};

export default PropertyFormWizard;
