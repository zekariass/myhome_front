import AgentPreview from "components/agents/AgentPreview";
import AddressFormNew from "components/commons/AddressFormNew";
import StepperWidget from "components/commons/StepperWidget";
import Wizard from "components/commons/Wizard";
import React, { useState } from "react";
import { Field } from "react-final-form";
import ParentProperty from "./forms/ParentProperty";

const PropertyFormWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    {
      title: "Property",
    },
    {
      title: "Property Category",
    },
    { title: "Address" },
    { title: "Pictures" },
  ];

  const onSubmit = (values) => {};
  const Error = (name) => {
    <Field
      name={name}
      subscription={{ error: true, touched: true }}
      render={({ meta: { touched, error } }) =>
        touched && error ? <div className="error-general">{error}</div> : null
      }
    ></Field>;
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
            initialValues={{}}
            setCurrentStep={setCurrentStep}
          >
            <Wizard.Page>
              <ParentProperty />
            </Wizard.Page>
            <Wizard.Page>
              <AddressFormNew label="address" title="Address" />
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
