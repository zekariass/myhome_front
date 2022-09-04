// @ts-nocheck
import { PATH_PUBLIC_LISTING } from "components/commons/Strings";
import { getListingPropertyVideoList } from "features/listing/publicListingSlice";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";

const ListingVideoView = () => {
  const [propVideos, setPropVideos] = useState([]);
  const [listingId, setListingId] = useState(undefined);

  const dispatch = useDispatch();
  const location = useLocation();
  const urlParam = useParams();

  const storedVideoList = useSelector(
    (store) => store.publicListing.listingPropertyVideoList.data
  );

  useEffect(() => {
    const stateVideos = location?.state?.videos;
    const listingIdFromState = urlParam?.listingId;
    setListingId(listingIdFromState);
    if (stateVideos) {
      setPropVideos(stateVideos);
    } else {
      dispatch(getListingPropertyVideoList(listingIdFromState));
    }
  }, []);

  return (
    <div className="other-bg m-4 py-4 ">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-9 order-1 order-lg-0">
            {!!propVideos.length &&
              propVideos?.map((video, index) => (
                <div className="card my-3 py-3 flex-center-general" key={index}>
                  <video width="98%" controls>
                    <source src={video?.video} type={video?.type} />
                  </video>
                </div>
              ))}
            {!!storedVideoList.length &&
              storedVideoList?.map((video, index) => (
                <div className="card my-3 py-3 flex-center-general" key={index}>
                  <video width="98%" height="500px" controls>
                    <source src={video?.video} type={video?.type} />
                  </video>
                </div>
              ))}
          </div>
          <div className="col-lg-3 mt-5">
            <Link
              to={`${PATH_PUBLIC_LISTING}/${listingId}/detail`}
              className="link-general link-size-normal link-underline order-0 order-lg-1"
            >
              See Listing Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingVideoView;
