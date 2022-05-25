// @ts-nocheck
import myHomeBackendAPI from "components/commons/apis/myHomeBackendAPI";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import FileLabelDropdown from "./FileLabelDropdown";

/**
 * Component that renders property images from urls returned by backend
 * @param {*} param0
 * @returns
 */
const ImageController = ({
  index,
  image,
  removeFile,
  setFileIndexToDisplay,
  setFileTypeToDisplay,
  setIsModalOpen,
  propertyId,
  fileStoreKey,
  setFileSrcToDisplay,
}) => {
  const [deleteImageSpinnerAnimationName, setDeleteImageSpinnerAnimationName] =
    useState("");

  const [isImageUploaded, setIsImageUploaded] = useState(false);

  //Retrieve boolean flag from backend store that shows whether image is uploaded or not
  //Image keys are keys for each image which is generated from Date().getTime()
  const uploadFlagFromStore = useSelector(
    (store) => store.propertyFile.image[fileStoreKey]
  );

  //get boolean value that displays whether image is uploaded or not
  // const isImageUploaded = imageKeys[fileStoreKey];
  useEffect(() => {
    setIsImageUploaded(uploadFlagFromStore);
  }, [uploadFlagFromStore]);

  // const isImageUploaded = image[];

  //Spinner class name based on image uploaded status
  //Show spinner if image is on upload, otherwise show image
  const spinnerAnimationName = !isImageUploaded ? "border" : "";

  const spinnerClassName = isImageUploaded ? "w-100 h-100" : "";

  //hide image output if image is on uploading
  const imageClassName = isImageUploaded ? "p-2" : "p-2 visually-hidden";

  //get image src value from image sent by parent component
  const imageObjKey = Object.keys(image)[0];
  const imageSrc = image[imageObjKey]?.image;
  // const imageId = image[imageObjKey]?.id;

  //Delete video from list and database
  const deleteImage = async (index) => {
    if (!isImageUploaded) {
      removeFile(index);
    } else {
      //get the video id to delete it from database
      const imageId = image[imageObjKey]?.id;

      //Set the animation of the spinned when delete is on progress
      setDeleteImageSpinnerAnimationName("border");
      try {
        const result = await myHomeBackendAPI.delete(
          `/property/image/${imageId}/delete/`
        );

        //If delete is success, set the animation of the spinner to empty char
        if (result.status === 204) {
          setDeleteImageSpinnerAnimationName("");
          removeFile(index);
        }
      } catch (error) {}
    }
  };

  return (
    <div className="col px-5 px-sm-0" key={index}>
      <div className="picture-list-container shadow">
        <div className="p-1">
          {/* <div className="" > */}
          <div
            className="position-relative card flex-center-general"
            style={{ height: "150px" }}
          >
            <Spinner
              animation={spinnerAnimationName}
              role="status"
              className={spinnerClassName}
            >
              <img
                // src={URL.createObjectURL(image)}
                src={imageSrc}
                alt=""
                width="100%"
                height="150px"
                className={imageClassName}
              />
            </Spinner>
            <div
              style={{
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <Spinner
                animation={deleteImageSpinnerAnimationName}
                variant="light"
                role="status"
              />
            </div>
          </div>

          {/* </div> */}
        </div>
        <div className="row row-cols-2 g-3 pb-2 pt-1">
          <div className="col flex-center-general">
            <i
              className="trash icon delete-general"
              role="button"
              onClick={(event) => {
                event.stopPropagation();
                deleteImage(index);
              }}
            ></i>
          </div>
          <div className="col flex-center-general">
            <i
              className="eye icon view-general"
              role="button"
              onClick={(event) => {
                setFileIndexToDisplay(index);
                setFileTypeToDisplay("image");
                setIsModalOpen(true);
                setFileSrcToDisplay(imageSrc);
              }}
            ></i>
          </div>
          {/* <div className="col flex-center-general">
            <i
              className="upload icon upload-general"
              role="button"
              onClick={(event) => {
                event.stopPropagation();
                // removeFile(index);
              }}
            ></i>
          </div> */}
        </div>
        {isImageUploaded && (
          <div className="border-top">
            <div className="dropdown drop-parent">
              <FileLabelDropdown image={image} propertyId={propertyId} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageController; //React.memo(ImageController);
