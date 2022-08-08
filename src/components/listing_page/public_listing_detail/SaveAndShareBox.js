// @ts-nocheck
import { PATH_SIGNIN } from "components/commons/Strings";
import {
  savePublicListing,
  unsavePublicListing,
} from "features/listing/publicListingSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const SaveAndShareBox = ({ listing, page, searchQuery }) => {
  const { isSignedIn } = useSelector((store) => store.user.signin);
  // console.log("listing: ", listing);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const onSaveListingClick = () => {
    if (isSignedIn) {
      dispatch(
        savePublicListing({
          listingId: listing?.id,
          page: page,
          searchQuery: searchQuery,
        })
      );
    } else {
      // console.log(location);
      navigate(PATH_SIGNIN, {
        state: {
          from: { pathname: `${location?.pathname}/${location?.search}` },
        },
      });
    }
  };

  const onUnsaveListingClick = () => {
    if (isSignedIn) {
      dispatch(
        unsavePublicListing({
          listingId: listing?.id,
          page: page,
          searchQuery: searchQuery,
        })
      );
    } else {
      navigate(PATH_SIGNIN, {
        state: { from: { pathname: location?.pathname } },
      });
    }
  };

  return (
    <div className="">
      <div className="row row-cols-2 my-3 px-3">
        <div className="col">
          {listing?.is_saved && (
            <div>
              <i
                className="large heart icon grin-color"
                role="button"
                onClick={onUnsaveListingClick}
              ></i>
              <span className="fw-bold">Unsave</span>
            </div>
          )}
          {!listing?.is_saved && (
            <div>
              <i
                className="large heart outline icon grin-color"
                role="button"
                onClick={onSaveListingClick}
              ></i>
              <span className="fw-bold">Save</span>
            </div>
          )}
        </div>
        <div className="col flex-end-general">
          <p className="fw-bold mx-2">
            Share
            <span className="ms-2">
              <i
                className="large share alternate icon grin-color"
                role="button"
              ></i>
            </span>
          </p>
        </div>
      </div>
      {!!listing?.saved_on && (
        <div className="flex-center-general">
          <p className="text-muted fst-italic" style={{ fontSize: "0.8em" }}>
            saved on {new Date(listing?.saved_on).toDateString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default SaveAndShareBox;
