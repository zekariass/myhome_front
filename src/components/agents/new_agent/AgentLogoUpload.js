// @ts-nocheck
import MyModal from "components/commons/Modal";
import { PATH_AGENT_DASHBOARD } from "components/commons/Strings";
import { deleteAgentLogo, uploadAgentLogo } from "features/agent/agentSlice";
import React, { useCallback, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AgentCreateImportantInfo from "./AgentCreateImportantInfo";

const AgentLogoUpload = () => {
  //   const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileToDisplay, setFileToDisplay] = useState(null);
  const [logoSpinnerAnimationName, setlogoSpinnerAnimationName] = useState("");
  const [logoSpinnerCssClassName, setLogoSpinnerCssClassName] =
    useState("d-none");

  const logos = useSelector((store) => store.agent.logo.data);
  const isUploadLoading = useSelector(
    (store) => store.agent.logo.uploadLogo.request.isLoading
  );
  const isDeleteLoading = useSelector(
    (store) => store.agent.logo.deleteLogo.request.isLoading
  );
  useEffect(() => {
    if (isUploadLoading || isDeleteLoading) {
      setlogoSpinnerAnimationName("border");
      setLogoSpinnerCssClassName("d-flex");
    } else {
      setlogoSpinnerAnimationName("");
      setLogoSpinnerCssClassName("d-none");
    }
  }, [isUploadLoading, isDeleteLoading]);

  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFile) => {
    const logoData = {
      agentId: state?.agentId || null,
      logo: acceptedFile[0],
    };
    dispatch(uploadAgentLogo(logoData));
    // setImages([...images, acceptedFile[0]]);
  }, []);

  const { getInputProps, getRootProps } = useDropzone({
    accept: { "image/*": [".png", ".gif", ".jpeg", ".jpg"], "video/*": [] },
    onDrop,
  });

  /**
   * A function that returns model bodey element to display based on the file type
   * @returns ReactElement
   */
  const showModalBodyMessage = () => {
    return (
      <div>
        <img src={fileToDisplay} alt="Logo Image" width="100%" height="400vh" />
      </div>
    );
  };

  /**
   * A function that handles the deletion of the file from the preview list
   * @param {number} fileIndex
   */
  const removeLogo = (logoId) => {
    dispatch(deleteAgentLogo(logoId));
    // const filteredImages = images.filter((image, index) => index !== fileIndex);
    // setImages(filteredImages);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-7 mt-3 ">
          <p className="fs-2 fw-bold flex-center-general">Logo</p>
          {logos.length === 0 && (
            <div className="flex-center-general mb-4">
              <div
                {...getRootProps({
                  className: "footer-bg flex-center-general position-relative",
                  id: "agent-logo-input-div",
                })}
              >
                <input {...getInputProps()} />
                <div>
                  <p className="fs-1"> +</p>
                </div>
              </div>
              <div
                className={logoSpinnerCssClassName}
                style={{
                  position: "absolute",
                  //   display: { logoSpinnerCssClassName },
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Spinner
                  animation={logoSpinnerAnimationName}
                  variant="dark"
                  role="status"
                />
              </div>
            </div>
          )}
          {logos.map((logo, index) => (
            <div className="flex-center-general" key={index}>
              <div className="logo-container card p-2">
                <div className="position-relative">
                  <img
                    //   src={URL.createObjectURL(image)}
                    src={logo.logo}
                    id="agent-logo-display"
                    className="rounded-3"
                    alt=""
                  />
                </div>
                <div
                  className={logoSpinnerCssClassName}
                  style={{
                    position: "absolute",
                    //   display: { logoSpinnerCssClassName },
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "70%",
                  }}
                >
                  <Spinner
                    animation={logoSpinnerAnimationName}
                    variant="dark"
                    role="status"
                  />
                </div>
                <div className="row row-cols-2 g-3 pb-2 pt-1">
                  <div className="col flex-center-general">
                    <i
                      className="trash icon delete-general"
                      role="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        removeLogo(logo.id);
                      }}
                    ></i>
                  </div>
                  <div className="col flex-center-general">
                    <i
                      className="eye icon view-general"
                      role="button"
                      onClick={(event) => {
                        //   setFileIndexToDisplay(index);
                        //   setFileTypeToDisplay("image");
                        setIsModalOpen(true);
                        setFileToDisplay(logo.logo);
                      }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isModalOpen && (
            <MyModal
              show={isModalOpen}
              onHide={() => setIsModalOpen(false)}
              bodyMessage={showModalBodyMessage}
              title="Your media view"
            />
          )}
          <div className="flex-end-general">
            <button
              className="btn-general py-2 px-3"
              type="button"
              onClick={() => navigate(PATH_AGENT_DASHBOARD, { replace: true })}
            >
              Finish
            </button>
          </div>
        </div>
        <div className="col-md-5">
          <AgentCreateImportantInfo />
        </div>
      </div>
    </div>
  );
};

export default AgentLogoUpload;
