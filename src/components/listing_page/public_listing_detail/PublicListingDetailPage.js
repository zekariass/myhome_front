// @ts-nocheck
import MinimisedImageGallery from "components/commons/MinimisedImageGallery";
import {
  ALL_PURPOSE_PROPERTY_KEY,
  APARTMENT_KEY,
  COMMERCIAL_PROPERTY_KEY,
  CONDOMINIUM_KEY,
  HALL_KEY,
  LAND_KEY,
  OFFICE_KEY,
  SHARE_HOUSE_KEY,
  TRADITIONAL_HOUSE_KEY,
  VILLA_KEY,
} from "components/commons/Strings";
import { getPublicListingsById } from "features/listing/publicListingSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ResidentialListingWithoutUnit from "./ResidentialListingWithoutUnit";
import "./PublicListingDetail.css";
import ApartmentListingDetail from "./ApartmentListingDetail";
import HallListingDetail from "./HallListingDetail";
import LandListingDetail from "./LandListingDetail";
import OfficeListingDetail from "./OfficeListingDetail";
import ShareHouseListingDetail from "./ShareHouseListingDetail";
import CommercialPropertyListingDetail from "./CommercialPropertyListingDetail";
import AllPurposePropertyListingDetail from "./AllPurposePropertyListingDetail";
import LoadingSpinner from "components/commons/LoadingSpinner";

const PublicListingDetailPage = () => {
  const { listingId } = useParams();
  const dispatch = useDispatch();
  const publicListingDetail = useSelector(
    (store) => store.publicListing.publicListingDetail.data
  );

  const publicListingDetailIsLoading = useSelector(
    (store) => store.publicListing.publicListingDetail.request.isLoading
  );

  useEffect(() => {
    dispatch(getPublicListingsById(listingId));
  }, []);

  const catKey = publicListingDetail?.property?.property_category?.cat_key;

  return (
    <div className="container my-3">
      {!publicListingDetailIsLoading && (
        <div>
          <div className="">
            <MinimisedImageGallery
              data={publicListingDetail?.property?.images}
              viewer="public"
              listingId={publicListingDetail?.id}
            />
          </div>

          <div>
            {catKey === VILLA_KEY && (
              <ResidentialListingWithoutUnit
                publicListingDetail={publicListingDetail}
              />
            )}

            {catKey === CONDOMINIUM_KEY && (
              <ResidentialListingWithoutUnit
                publicListingDetail={publicListingDetail}
              />
            )}

            {catKey === TRADITIONAL_HOUSE_KEY && (
              <ResidentialListingWithoutUnit
                publicListingDetail={publicListingDetail}
              />
            )}

            {catKey === APARTMENT_KEY && (
              <ApartmentListingDetail
                publicListingDetail={publicListingDetail}
              />
            )}

            {catKey === HALL_KEY && (
              <HallListingDetail publicListingDetail={publicListingDetail} />
            )}

            {catKey === LAND_KEY && (
              <LandListingDetail publicListingDetail={publicListingDetail} />
            )}

            {catKey === OFFICE_KEY && (
              <OfficeListingDetail publicListingDetail={publicListingDetail} />
            )}

            {catKey === SHARE_HOUSE_KEY && (
              <ShareHouseListingDetail
                publicListingDetail={publicListingDetail}
              />
            )}

            {catKey === COMMERCIAL_PROPERTY_KEY && (
              <CommercialPropertyListingDetail
                publicListingDetail={publicListingDetail}
              />
            )}

            {catKey === ALL_PURPOSE_PROPERTY_KEY && (
              <AllPurposePropertyListingDetail
                publicListingDetail={publicListingDetail}
              />
            )}
          </div>
        </div>
      )}
      {publicListingDetailIsLoading && <LoadingSpinner />}
    </div>
  );
};

export default PublicListingDetailPage;
