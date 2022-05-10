import React, { useState } from "react";

/**
 * Image label selection dropdown
 * @returns ReactElement
 */
const ImageLabelDropdown = () => {
  const [selectedLabel, setSelectedLabel] = useState("Image is for");

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
          {items.map((item) => (
            <div
              className="form-check drop-item"
              onClick={() => setSelectedLabel(item)}
              key={item}
            >
              <input
                className="form-check-input"
                type="radio"
                value={item}
                name="flexRadioDefault"
                id="flexRadioDefault1"
                checked={item === selectedLabel}
                onChange={(event) => setSelectedLabel(item)}
              />
              <label
                className="form-check-label"
                onClick={(event) => setSelectedLabel(item)}
              >
                {item}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageLabelDropdown;
