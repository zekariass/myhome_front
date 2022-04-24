// @ts-nocheck
import ImageInputField from "components/commons/fields/ImageInputField";
import { setAgentLogo } from "features/agent/agentSlice";
import React from "react";
import { useDispatch } from "react-redux";

const AgentLogo = ({ currentStep, setCurrentStep }) => {
  /**
   * Add agent logo
   */

  const dispatch = useDispatch();

  return (
    <div>
      <div className="mt-3 ">
        <p className="fs-2 fw-bold flex-center-general">Logo</p>
        <form>
          <div className="flex-center-general my-4 rounded-3">
            <div
              onClick={() => allowUploadLogoClick()}
              className=" other-bg"
              id="agent-logo-input-div"
            >
              <div className="form-outline">
                <ImageInputField
                  name="logo"
                  id="agent-logo-input"
                  label="Click here"
                  labelClass="flex-center-general"
                  labelId="agent-logo-label"
                  hidden={true}
                  onChange={(event) => onLogoSelect(event, dispatch)}
                  onClick={(event) => onLogoInputClick(event)}
                />
              </div>
            </div>
            <div className="rounded-3 mb-5" id="agent-logo-display-div">
              <img
                src=""
                id="agent-logo-display"
                className="rounded-3"
                alt=""
              />
              <span
                className="flex-center-general cuttor"
                onClick={() => removeImage()}
              >
                <i className="cut big icon"></i>
              </span>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-lg-2 mt-5 ">
            <div className="col flex-center-general">
              <button
                type="button"
                className="btn-general py-2 w-75"
                onClick={() => onBackButtonClick(currentStep, setCurrentStep)}
              >
                Back
              </button>
            </div>
            <div className="col flex-center-general my-3 my-lg-0">
              <button
                type="button"
                className="btn-general py-2 w-75"
                onClick={() => onConfirmClick(currentStep, setCurrentStep)}
              >
                Confirm
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgentLogo;

//Inline function calls

const allowUploadLogoClick = () => {
  /**
   * A function which allows the upload logo button from hidden to clickable
   */
  document.getElementById("agent-logo-input").click();
};

const onLogoSelect = (event, dispatch) => {
  /**
   * A function called when a logo picture is selected
   */
  document.getElementById("agent-logo-input-div").style.display = "none";
  document.getElementById("agent-logo-display-div").style.display = "block";
  document.getElementById("agent-logo-display").src = URL.createObjectURL(
    event.target.files[0]
  );

  dispatch(setAgentLogo(event.target.files[0].name));
  //   console.log("EVENT: ", event.target.files[0]);
};

const onLogoInputClick = (event) => {
  /**
   * A function called when a upload logo button is clicked
   * Allows to clear the current value of the file filed before selecting another
   */
  event.target.value = null;
};

const removeImage = () => {
  /**
   * A function called when clicking the remove logo button
   */
  document.getElementById("agent-logo-input-div").style.display = "block";
  document.getElementById("agent-logo-display-div").style.display = "none";
  document.getElementById("agent-logo-display").src = "";
};

const onBackButtonClick = (currentStep, setCurrentStep) => {
  /**
   * Handles the back button click action
   */
  setCurrentStep(currentStep - 1);
};

const onConfirmClick = (currentStep, setCurrentStep) => {
  /**
   * Handles the action when confirm button is clicked in the agent logo upload form
   */

  /**
   * When Confirm button clicked, increment the currentStep of the agent add form step
   */
  // console.log(
  //   "TARGET: "
  //   // document.getElementById("agent-logo-input").target.files[0]
  // );
  setCurrentStep(currentStep + 1);
};
