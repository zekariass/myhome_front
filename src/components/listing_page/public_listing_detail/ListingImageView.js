// @ts-nocheck
import { PATH_PUBLIC_LISTING } from "components/commons/Strings";
import { getListingPropertyImageList } from "features/listing/publicListingSlice";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";

const ListingImageView = () => {
  const [propImages, setPropImages] = useState([]);
  const [listingId, setListingId] = useState(undefined);

  const dispatch = useDispatch();
  const location = useLocation();
  const urlParam = useParams();

  const storeImageList = useSelector(
    (store) => store.publicListing.listingPropertyImageList.data
  );

  useEffect(() => {
    const stateImages = location?.state?.images;
    const listingIdFromState = urlParam?.listingId;
    setListingId(listingIdFromState);

    if (stateImages) {
      setPropImages(stateImages);
    } else {
      dispatch(getListingPropertyImageList(listingIdFromState));
    }
  }, []);

  return (
    <div className="other-bg m-md-4 m-1 py-4">
      <div className="container">
        <div className="flex-end-general mb-3">
          <Link
            to={`${PATH_PUBLIC_LISTING}/${listingId}/detail`}
            className="link-general link-size-normal link-underline order-0 order-lg-1"
          >
            See Listing Detail
          </Link>
        </div>
        <div className="row row-cols-1 row-cols-lg-2 g-5 flex-center-general">
          {!!propImages.length &&
            propImages?.map((image, index) => (
              <div className="col" key={index}>
                <Card className="shadow" style={{ borderRadius: "15px" }}>
                  <Card.Img
                    src={image?.image}
                    alt="Prop image"
                    height="400px"
                    style={{ borderRadius: "15px" }}
                  />
                  <Card.ImgOverlay
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "2%",
                      fontWeight: "bold",
                      color: "#fff",
                    }}
                  >
                    {image?.label_name}
                  </Card.ImgOverlay>
                </Card>
              </div>
            ))}
          {!!storeImageList.length &&
            storeImageList?.map((image, index) => (
              <div className="col" key={index}>
                <Card>
                  <Card.Img
                    src={image?.image}
                    alt="Prop image"
                    height="400px"
                  />
                  <Card.ImgOverlay className="display-title fw-bold">
                    {image?.label_name}
                  </Card.ImgOverlay>
                </Card>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ListingImageView;
