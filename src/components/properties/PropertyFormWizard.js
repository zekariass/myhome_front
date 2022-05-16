// @ts-nocheck
import AgentPreview from "components/agents/AgentPreview";
import AddressForm from "components/commons/AddressForm";
import StepperWidget from "components/commons/StepperWidget";
import Wizard from "components/commons/Wizard";
import React, { useState } from "react";
import ParentProperty from "./forms/ParentProperty";
import PropertyDataConfirmation from "./PropertyDataConfirmation";
import { FormSpy } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { createProperty } from "features/property/propertySlice";
import PropertyCategoryWizard from "./forms/PropertyCategoryWizard";

import formatPropertyData from "./formatPropertyData";
import { goToPage } from "features/common/wizardSlice";
import { Link } from "react-router-dom";

/**
 *Property form wizard component that show property add and edit steps
 * @returns
 */
const PropertyFormWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);

  /**
   * Get property categories from backend
   */
  const { data } = useSelector((store) => store.propertyCategory.response);

  const dispatch = useDispatch();

  /**
   * Property create stepper
   */
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

  /**
   * Handle Submit of property data
   * @param {*} values
   */
  const onSubmit = (values) => {
    const newValues = formatPropertyData(values, data);
    console.log("newValues AFTER: ", newValues);
    dispatch(createProperty(newValues));
  };

  /**
   * Handles the click action of edit link in property data confirmation list
   * @param {number} step
   */
  const onEditClick = (step) => {
    setCurrentStep(step);
    dispatch(goToPage(step));
  };

  /**
   * Shows the Edit link on property data confirmation list
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
        <div className="col-lg-7 card shadow-sm  px-3">
          <div className="mb-4">
            <StepperWidget steps={steps} currentStep={currentStep} />
          </div>
          <div className="py-4">
            <Wizard
              onSubmit={onSubmit}
              initialValues={{
                category: {
                  apartment: { units: [{}] },
                  commercial_property: { units: [{}] },
                  all_purpose_property: { units: [{}] },
                },
              }}
              setCurrentStep={setCurrentStep}
            >
              <Wizard.Page>
                {/* Shows parent property form */}
                <ParentProperty />
              </Wizard.Page>
              {/* Show property category form, such as Apartment */}
              <Wizard.Page>
                <FormSpy>
                  {({ values }) => <PropertyCategoryWizard values={values} />}
                </FormSpy>
              </Wizard.Page>
              {/* Shows Property Address form */}
              <Wizard.Page>
                <AddressForm label="address" title="Property Address" />
              </Wizard.Page>
              {/* Shows property data confirmation page */}
              <Wizard.Page>
                <FormSpy>
                  {({ values }) => (
                    <PropertyDataConfirmation
                      values={values}
                      edit={edit}
                      steps={steps}
                    />
                  )}
                </FormSpy>
              </Wizard.Page>
            </Wizard>
          </div>
        </div>
        <div className="col-lg-5 mt-sm-3">
          {/* Agent information preview  */}
          <AgentPreview />
        </div>
      </div>
    </div>
  );
};

export default PropertyFormWizard;
