// @ts-nocheck
import React from "react";
import ListingCard from "./ListingCard";

const ListingGrid = ({ publicListings, gridClassName, page }) => {
  return (
    <div>
      <div className={gridClassName}>
        {publicListings?.map((listing) => (
          <div className="col" key={listing.id}>
            <ListingCard listing={listing} page={page} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingGrid;
