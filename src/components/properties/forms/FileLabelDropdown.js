// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPropertyFileLabels,
  updatePropertyImageLabel,
} from "features/agent_dashboard/property/propertyFileSlice";
import { Field, Form } from "react-final-form";

/**
 * Image label selection dropdown
 * @returns ReactElement
 */
const ImageLabelDropdown = ({ image, propertyId }) => {
  const [selectedLabel, setSelectedLabel] = useState("Image is for");

  const { data } = useSelector((store) => store.propertyFile.labels.response);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPropertyFileLabels());
  }, []);

  // console.log("ImageLabelDropdown: ", image);

  //get image src value from image sent by parent component
  const imageObjKey = Object.keys(image)[0];
  const imageId = image[imageObjKey]?.id;

  const onLabelSelect = (item) => {
    const formData = new FormData();
    formData.append("label", item.id);
    setSelectedLabel(item.label);
    dispatch(updatePropertyImageLabel({ image: imageId, formData: formData }));
  };

  const items = [
    "Bedroom",
    "Saloon",
    "Balcony",
    "Kitchen",
    "Terrace",
    "Living Room",
    "Bath room",
    "Corridor",
    "Hall",
  ];

  const onSubmit = (values) => {};
  return (
    <div className="dropdown drop-parent">
      <button
        className="btn-drop dropdown-toggle"
        type="button"
        id="defaultDropdown"
        data-bs-toggle="dropdown"
        data-bs-auto-close="true"
        aria-expanded="false"
      >
        {selectedLabel}
      </button>

      <div
        className="drop-list dropdown-menu px-3 shadow"
        aria-labelledby="dropdownMenuLink"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="row row-cols-2 p-3">
          {data.map((item) => (
            <div
              className="form-check drop-item"
              onClick={() => onLabelSelect(item)}
              key={item.id}
            >
              <Form onSubmit={onSubmit}>
                {({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <Field name="label">
                      {({ input, meta }) => (
                        <input
                          {...input}
                          className="form-check-input"
                          type="radio"
                          value={item.id}
                          // name="flexRadioDefault"
                          id="flexRadioDefault1"
                          checked={item.label === selectedLabel}
                          onChange={(event) => onLabelSelect(item)}
                        />
                      )}
                    </Field>
                    <label
                      className="form-check-label"
                      onClick={(event) => onLabelSelect(item)}
                    >
                      {item.label}
                    </label>
                  </form>
                )}
              </Form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageLabelDropdown;
