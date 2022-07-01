// @ts-nocheck
import Paginator from "components/commons/Paginator";
import { SYSTEM_PARAMS_PUBLIC_LISTING_PAGE_SIZE } from "components/commons/Strings";
import FooterOne from "components/footers/FooterOne";
import HeaderOne from "components/headers/HeaderOne";
import React from "react";
import { useSelector } from "react-redux";
import FilterListing from "./FilterListing";
import ListingGrid from "./ListingGrid";
import ListingMap from "./ListingMap";
import NearByCityListing from "./NearByCityListing";
import SortListing from "./SortListing";

const PublicListingPage = () => {
  const publicListings = useSelector(
    (store) => store.publicListing.publicListingList.data?.results
  );
  const pageCount = useSelector(
    (store) => store.publicListing.publicListingList.data?.count
  );

  const nextPage = useSelector(
    (store) => store.publicListing.publicListingList.data?.next
  );

  const previousPage = useSelector(
    (store) => store.publicListing.publicListingList.data?.previous
  );

  const systemParams = useSelector((store) => store.system.systemParams.data);

  const getPublicListingPageSize = () => {
    const pageSizeObj = systemParams.find(
      (systemParam) =>
        systemParam?.name === SYSTEM_PARAMS_PUBLIC_LISTING_PAGE_SIZE
    );

    return pageSizeObj ? pageSizeObj?.value : 0;
  };

  return (
    <div>
      <div className="mx-3">
        <HeaderOne />
      </div>
      <div className="mx-3">
        <div
          className="shadow-sm p-3 rounded-3 bg-grin"
          style={{ border: "#eee solid 1px" }}
        >
          <FilterListing />
        </div>
        <div className="row p-4">
          <div className="col-md-7 bg-info">
            <div className="my-3">
              <div className="row row-cols-auto g-3">
                <div className="col">
                  <SortListing />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <ListingGrid publicListings={publicListings} />
            </div>
            <div className="flex-center-general my-5">
              <Paginator
                pageCount={pageCount}
                nextPage={nextPage}
                previousPage={previousPage}
                pageSize={getPublicListingPageSize()}
              />
            </div>
            <div className="mb-3">
              <NearByCityListing />
            </div>
          </div>

          <div className="col-md-5">
            <ListingMap />
          </div>
        </div>
      </div>
      <div className="footer-bg bg-light">
        <FooterOne />
      </div>
    </div>
  );
};

export default PublicListingPage;
