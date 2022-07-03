// @ts-nocheck
import MinimisedImageGallery from "components/commons/MinimisedImageGallery";
import { getPublicListingsById } from "features/listing/publicListingSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const PublicListingDetail = () => {
  const { listingId } = useParams();
  const dispatch = useDispatch();
  const publicListingDetail = useSelector(
    (store) => store.publicListing.publicListingDetail.data
  );
  console.log("listingId: ", listingId);
  useEffect(() => {
    dispatch(getPublicListingsById(listingId));
  }, []);
  return (
    <div className="container">
      <MinimisedImageGallery data={publicListingDetail?.property?.images} />
    </div>
  );
};

export default PublicListingDetail;
