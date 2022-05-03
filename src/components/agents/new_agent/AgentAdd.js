// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "features/global/globalSlice";
import AddressForm from "components/commons/AddressForm";
import AgentAddForm from "./AgentAddForm";
import AgentCreateImportantInfo from "./AgentCreateImportantInfo";
import Confirmation from "./Confirmation";
import Stepper from "react-stepper-horizontal/lib/Stepper";
import StepperWidget from "components/commons/StepperWidget";

const AgentAdd = () => {
  /**
   * Main component for adding new agent
   */
  const [currentStep, setCurrentStep] = useState(0);
  /**
   * state to track Agent add form steps.
   */
  const dispatch = useDispatch();
  useEffect(() => {
    /**
     * This effect runs when the component is mounted
     */
    dispatch(setCurrentPage("agentAdd"));
  }, []);

  const renderFormSteps = () => {
    /**
     * Agent Add is a two step form. The first form allows to add the agents information
     * The second step allows to add the address of the agent
     *
     * This function is called by the AgentAdd component below
     */
    if (currentStep === 0) {
      return (
        <AgentAddForm
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      );
    } else if (currentStep === 1) {
      return (
        <AddressForm
          label="Agent"
          title="Fill address of your Agent"
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      );
    }
    // else if (currentStep === 2) {
    //   return (
    //     <AgentLogo currentStep={currentStep} setCurrentStep={setCurrentStep} />
    //   );
    // }
    return (
      <Confirmation currentStep={currentStep} setCurrentStep={setCurrentStep} />
    );
  };

  const steps = [
    {
      title: "Agent info",
    },
    {
      title: "Address",
    },
    { title: "Confirmation" },
  ];

  // const stepperProps = {
  //   size: 50,
  //   completeColor: "rgb(65, 168, 24)",
  //   activeColor: "brown",
  //   barStyle: "dashed",
  //   completeOpacity: "0.5",
  //   completeTitleOpacity: "0.5",
  //   lineMarginOffset: 10,
  // };

  return (
    <div className="container">
      <div className="my-3">
        <p className="fs-4 fw-bold flex-center-general">Create Agent Free</p>
      </div>
      <div className="row g-5 mt-3">
        <div className="col-lg-7 input-border-color">
          <StepperWidget steps={steps} activeStep={currentStep} />

          <div className="mt-5">{renderFormSteps()}</div>
        </div>
        <div className="col-lg-5 order-first order-lg-last">
          <AgentCreateImportantInfo />
        </div>
      </div>
    </div>
  );
};

export default AgentAdd;

//Inline function
