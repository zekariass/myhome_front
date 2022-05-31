// @ts-nocheck
import ImageInputField from "components/commons/fields/ImageInputField";
import { uploadAgentLogo } from "features/agent/agentSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import AgentCreateImportantInfo from "./AgentCreateImportantInfo";

const AgentLogo = () => {
  /**
   * Add agent logo
   */
  const { state } = useLocation();
  const [logoData, setlogoData] = useState({
    agentId: state?.agentId || null,
    logo: null,
  });

  const dispatch = useDispatch();

  return (
    <div className="row">
      <div className="col-md-5">
        <AgentCreateImportantInfo />
      </div>
      <div className="col-md-7 mt-3 ">
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
                  onChange={(event) =>
                    onLogoSelect(event, dispatch, logoData, setlogoData)
                  }
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
          <div className="mt-5">
            {/* <div className=" flex-center-general my-3">
              <button
                type="button"
                className="btn-general py-2"
                onClick={() => onBackButtonClick()}
                style={{ width: "35%" }}
              >
                Back
              </button>
            </div> */}
            <div className="flex-center-general mb-3">
              <button
                type="button"
                className="btn-general py-2"
                onClick={() => onUploadClick(logoData, dispatch)}
                style={{ width: "35%" }}
              >
                Upload
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

const onLogoSelect = (event, dispatch, logoData, setlogoData) => {
  /**
   * A function called when a logo picture is selected
   */
  document.getElementById("agent-logo-input-div").style.display = "none";
  document.getElementById("agent-logo-display-div").style.display = "block";
  document.getElementById("agent-logo-display").src = URL.createObjectURL(
    event.target.files[0]
  );

  // dispatch(setAgentLogo(event.target.files[0].name));
  //   console.log("EVENT: ", event.target.files[0]);
  let newLogoData = { ...logoData };
  newLogoData["logo"] = event.target.files[0];
  setlogoData(newLogoData);
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

const onUploadClick = (logoData, dispatch) => {
  /**
   * Handles the action when confirm button is clicked in the agent logo upload form
   */

  /**
   * When Upload button clicked, dispatch the uploadAgentLogo action creator
   */
  dispatch(uploadAgentLogo(logoData));
};
