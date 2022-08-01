// @ts-nocheck
import { getSavedPublicListings } from "features/listing/publicListingSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListingGrid from "../ListingGrid";

const SavedListingPage = () => {
  const [savedListings, setSavedListings] = useState([]);
  const savedPublicListings = useSelector(
    (store) => store.publicListing.savedPublicListingsList.data
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSavedPublicListings());
  }, []);

  useEffect(() => {
    let formattedListingArray = [];
    savedPublicListings.forEach((savedListing) => {
      const formatted_listing = { ...savedListing?.main_listing };
      formatted_listing["saved_on"] = savedListing?.saved_on;
      formattedListingArray = [...formattedListingArray, formatted_listing];
    });

    setSavedListings(formattedListingArray);
  }, [savedPublicListings]);

  return (
    <div className="container my-4">
      <p>You saved the following listings</p>
      <ListingGrid
        publicListings={savedListings}
        gridClassName="row row-cols-1 row-cols-lg-3 g-4"
        page="savedPublicListings"
      />
    </div>
  );
};

export default SavedListingPage;
