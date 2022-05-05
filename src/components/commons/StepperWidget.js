import React from "react";
import Stepper from "react-stepper-horizontal/lib/Stepper";

const StepperWidget = ({ steps, currentStep }) => {
  const stepperProps = {
    size: 50,
    completeColor: "rgb(65, 168, 24)",
    activeColor: "brown",
    barStyle: "dashed",
    completeOpacity: "0.5",
    completeTitleOpacity: "0.5",
    lineMarginOffset: 10,
    activeTitleColor: "brown",
    activeBorderColor: "lightblue",
    activeBorderStyle: "solid",
    defaultBorderWidth: 4,
    circleFontSize: 20,
  };
  return (
    <div>
      <Stepper steps={steps} activeStep={currentStep} {...stepperProps} />
    </div>
  );
};

export default StepperWidget;
