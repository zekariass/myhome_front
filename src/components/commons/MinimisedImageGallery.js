import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PATH_PUBLIC_LISTING } from "./Strings";

const MinimisedImageGallery = ({
  data,
  videoData,
  virtual3Ddata,
  viewer,
  listingId,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="container">
      {data?.length > 0 && (
        <div>
          <div className="d-none d-md-block p-2">
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
                <div className="row row-cols-auto mt-3 g-3">
                  <div className="col ">
                    <Link
                      to={
                        viewer === "public"
                          ? `${PATH_PUBLIC_LISTING}/${listingId}/image/view`
                          : "#"
                      }
                      state={{ images: data }}
                      className="link-general link-size-small shadow-lg px-3 py-2"
                      style={{
                        borderRadius: "10%",
                        border: "2px #eee solid",
                      }}
                    >
                      <span>
                        <i className="large images icon text-black me-"></i>
                      </span>
                      Show all photos
                    </Link>
                  </div>
                  <div className="col">
                    {!!videoData?.length && (
                      <Link
                        to={`${PATH_PUBLIC_LISTING}/${listingId?.id}/video/view`}
                        state={{ videos: videoData }}
                        className="link-general link-size-small shadow-lg px-3 py-2"
                      >
                        <span>
                          <i className="large film icon text-black me-"></i>
                        </span>
                        Property Videos
                      </Link>
                    )}
                  </div>
                  <div className="col">
                    {!virtual3Ddata?.length && (
                      <Link
                        to="#"
                        className="link-general link-size-small shadow-lg px-3 py-2"
                      >
                        Property Virtual 3D View
                      </Link>
                    )}
                  </div>
                </div>
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
                        setEndIndex(Math.max(1, endIndex - 1));
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
                    <div key={index} className="">
                      {index === startIndex && (
                        <div className="gallery-slider-div mb-2">
                          <img
                            src={img.image}
                            alt={`pic ${index}`}
                            className={`${activaImageClass} image-display `}
                            //   style={{ width: "200px", height: "100px" }}
                          />
                        </div>
                      )}
                      {/* {index === startIndex + 1 && (
                        <div className="gallery-slider-active-div gallery-slider-div">
                          <img
                            src={img.image}
                            alt="pic 2"
                            //   style={{ width: "200px", height: "100px" }}
                            className={`${activaImageClass} image-display`}
                          />
                        </div>
                      )} */}
                      {index === endIndex && (
                        <div className="gallery-slider-div">
                          <img
                            src={img.image}
                            alt={`pic ${index}`}
                            //   style={{ width: "200px", height: "100px" }}
                            className={`${activaImageClass} image-display`}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
                <div className="flex-center-general mt-2">
                  <p
                    className="fs-6 fw-bold px-2 py-1 shadow "
                    style={{ backgroundColor: "#fff", borderRadius: "5%" }}
                  >
                    {selectedImageIndex + 1}/{data?.length}
                  </p>
                </div>

                <div className="flex-center-general gallery-slider-div">
                  <i
                    className={`angle down icon big gallery-slider-icon ${
                      data.length - 1 === endIndex && "disabled"
                    }`}
                    onClick={() => {
                      setSelectedImageIndex(
                        Math.min(selectedImageIndex + 1, data.length - 1)
                      );
                      if (selectedImageIndex === endIndex) {
                        setStartIndex(
                          Math.min(startIndex + 1, data.length - 2)
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
                  {index < 2 && (
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
