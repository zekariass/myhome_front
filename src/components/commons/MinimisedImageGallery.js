import React, { useState } from "react";

const MinimisedImageGallery = ({ data }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(2);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div>
      {data?.length > 0 && (
        <div>
          <div className="d-none d-md-block">
            <div className="row">
              <div className="col-8">
                <img
                  src={data[selectedImageIndex].image}
                  alt="Selected pic"
                  style={{
                    width: "100%",
                    height: "550px",
                  }}
                  className="image-display"
                />
              </div>
              <div className="col-4">
                <div className="flex-center-general gallery-slider-div">
                  <i
                    className={`angle up icon big gallery-slider-icon ${
                      startIndex === 0 && "disabled"
                    }`}
                    onClick={() => {
                      setSelectedImageIndex(
                        Math.max(selectedImageIndex - 1, 0)
                      );
                      if (selectedImageIndex === startIndex) {
                        setStartIndex(Math.max(startIndex - 1, 0));
                        setEndIndex(Math.max(2, endIndex - 1));
                      }
                    }}
                  ></i>
                </div>
                {data.map((img, index) => {
                  const activaImageClass =
                    index === selectedImageIndex
                      ? "gallery-slider gallery-slider-active-img"
                      : "gallery-slider";
                  return (
                    <div key={index}>
                      {index === startIndex && (
                        <div className="gallery-slider-div">
                          <img
                            src={img.image}
                            alt="pic 1"
                            className={`${activaImageClass} image-display`}
                            //   style={{ width: "200px", height: "100px" }}
                          />
                        </div>
                      )}
                      {index === startIndex + 1 && (
                        <div className="gallery-slider-active-div gallery-slider-div">
                          <img
                            src={img.image}
                            alt="pic 2"
                            //   style={{ width: "200px", height: "100px" }}
                            className={`${activaImageClass} image-display`}
                          />
                        </div>
                      )}
                      {index === endIndex && (
                        <div className="gallery-slider-div">
                          <img
                            src={img.image}
                            alt="pic 3"
                            //   style={{ width: "200px", height: "100px" }}
                            className={`${activaImageClass} image-display`}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
                <div className="flex-center-general gallery-slider-div">
                  <i
                    className={`angle down icon big gallery-slider-icon ${
                      data.length - 1 <= endIndex && "disabled"
                    }`}
                    onClick={() => {
                      setSelectedImageIndex(
                        Math.min(selectedImageIndex + 1, data.length - 1)
                      );
                      if (selectedImageIndex === endIndex) {
                        setStartIndex(
                          Math.min(startIndex + 1, data.length - 1 - 2)
                        );
                        setEndIndex(Math.min(endIndex + 1, data.length - 1));
                      }
                    }}
                  ></i>
                </div>
              </div>
            </div>
          </div>
          <div className="d-block d-md-none">
            {data.map((img, index) => {
              return (
                <div key={index}>
                  {index < 3 && (
                    <div className="mb-3  flex-center-general">
                      <img
                        src={img.image}
                        alt="Selected pic"
                        style={{ width: "95%", height: "300px" }}
                        className="image-display"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MinimisedImageGallery;
