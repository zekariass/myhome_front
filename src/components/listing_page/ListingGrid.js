// @ts-nocheck
import React from "react";
import { useSelector } from "react-redux";
import ListingCard from "./ListingCard";

const ListingGrid = ({ publicListings }) => {
  return (
    <div>
      <div className="row row-cols-1 row-cols-lg-2 g-3">
        {publicListings?.map((listing) => (
          <div className="col" key={listing.id}>
            <ListingCard listing={listing} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingGrid;
