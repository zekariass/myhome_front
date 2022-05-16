// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "features/global/globalSlice";
import AgentAddForm from "./AgentAddForm";
import AgentCreateImportantInfo from "./AgentCreateImportantInfo";
import AgentDataConfirmation from "./AgentDataConfirmation";
import StepperWidget from "components/commons/StepperWidget";
import Wizard from "components/commons/Wizard";
import AddressForm from "components/commons/AddressForm";
import { createAgent } from "features/agent/agentSlice";
import { PATH_AGENT_LOGO_UPLOAD_ABSOLUTE } from "components/commons/Strings";
import { Link, useNavigate } from "react-router-dom";
import { FormSpy } from "react-final-form";
import { goToPage } from "features/common/wizardSlice";

const AgentFormWizard = () => {
  /**
   * Main component for adding new agent
   */
  /**
   * state to track Agent add form steps.
   */
  const [currentStep, setCurrentStep] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * This effect runs when the component is mounted
   */
  useEffect(() => {
    dispatch(setCurrentPage("agentAdd"));
  }, []);

  /**
   * Handles the submit event of the form
   * Calls the createAgent redux action creator
   * @param {object} values - passed from form
   */
  const onSubmit = (values) => {
    dispatch(
      createAgent({
        values,
        navigate: navigate,
        redirectPath: PATH_AGENT_LOGO_UPLOAD_ABSOLUTE,
      })
    );
  };

  /**
   * Stepper steps
   */
  const steps = [
    {
      title: "Agent info",
    },
    {
      title: "Address",
    },
    { title: "Confirmation" },
  ];

  /**
   * Handle the click event of edit button
   * @param {number} step
   */
  const onEditClick = (step) => {
    setCurrentStep(step);
    dispatch(goToPage(step));
  };

  /**
   * Edit the form at a specific step in confirmation page
   * @param {number} step
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
      <div className="my-3">
        <p className="fs-4 fw-bold flex-center-general">Create Agent Free</p>
      </div>
      <div className="row g-5 mt-3">
        <div className="col-lg-7 shadow-sm card">
          <StepperWidget steps={steps} currentStep={currentStep} />

          <div className="mt-5">
            <Wizard
              onSubmit={onSubmit}
              initialValues={{}}
              setCurrentStep={setCurrentStep}
            >
              <Wizard.Page validate={validateAgent}>
                <AgentAddForm />
              </Wizard.Page>
              <Wizard.Page>
                <AddressForm label="address" title="Agent address" />
              </Wizard.Page>
              <FormSpy>
                {({ values }) => (
                  <Wizard.Page>
                    <AgentDataConfirmation values={values} edit={edit} />
                  </Wizard.Page>
                )}
              </FormSpy>
            </Wizard>
          </div>
        </div>
        <div className="col-lg-5 order-first order-lg-last">
          <AgentCreateImportantInfo />
        </div>
      </div>
    </div>
  );
};

export default AgentFormWizard;

//Inline function

/**
 * Validates Agent form
 * This function is injected by react final form validate prop
 * @param {object} values passed from form
 * @returns errors object
 */
const validateAgent = (values) => {
  /**
   * Validates the Agent add form
   */
  const errors = {};
  if (!values.name) {
    errors.name = "Name of Agent is required!";
  }
  if (!values.email) {
    errors.email = "Agent contact email is required!";
  }
  if (!values.contact_number) {
    errors.contact_number = "Agent contact number is required!";
  }
  return errors;
};
