// @ts-nocheck
import Paginator from "components/commons/Paginator";
import { SYSTEM_PARAMS_PUBLIC_LISTING_PAGE_SIZE } from "components/commons/Strings";
import { getPublicListingsBySearchFromLandingPage } from "features/listing/publicListingSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterListing from "./FilterListing";
import ListingGrid from "./ListingGrid";
import ListingListLayout from "./ListingListLayout";
import NearByCityListing from "./NearByCityListing";
import SortListing from "./SortListing";
import { useLocation, useSearchParams } from "react-router-dom";
import { getListingSearchParams } from "components/commons/functions";
import { Spinner } from "react-bootstrap";
import LoadingSpinner from "components/commons/LoadingSpinner";

const PublicListingList = () => {
  const publicListings = useSelector(
    (store) => store.publicListing.publicListingList.data?.results
  );
  const publicListingsLoading = useSelector(
    (store) => store.publicListing.publicListingList.request.isLoading
  );
  const itemCount = useSelector(
    (store) => store.publicListing.publicListingList.data?.count
  );

  const nextPage = useSelector(
    (store) => store.publicListing.publicListingList.data?.next
  );

  const previousPage = useSelector(
    (store) => store.publicListing.publicListingList.data?.previous
  );

  const systemParams = useSelector((store) => store.system.systemParams.data);
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(getPublicListingsBySearchFromLandingPage(location.search));
  }, [location.search]);

  const getPublicListingPageParamValue = () => {
    const pageSizeObj = systemParams.find(
      (systemParam) =>
        systemParam?.name === SYSTEM_PARAMS_PUBLIC_LISTING_PAGE_SIZE
    );

    return pageSizeObj ? pageSizeObj?.value : 0;
  };

  const onSearchParamChange = (newSearchParams) => {
    setSearchParams(newSearchParams);
  };

  const formatSearchParamsFromStore = (page) => {
    const newSearchParams = getListingSearchParams(searchParams);
    // newSearchParams.for_rent = searchParams.get("for_rent");
    // newSearchParams.for_sale = searchParams.get("for_sale");
    // newSearchParams.location = searchParams.get("location");
    // newSearchParams.property_category = searchParams.get("property_category");
    // newSearchParams.min_price = searchParams.get("min_price");
    // newSearchParams.max_price = searchParams.get("max_price");
    // newSearchParams.number_of_bed_rooms = searchParams.get(
    //   "number_of_bed_rooms"
    // );
    // newSearchParams.page = page;
    newSearchParams.page = page;

    return newSearchParams;
  };

  const getSearchParamsFromBackendURL = (url) => {
    const urlSearchParams = new URLSearchParams(url);
    const params = Object.fromEntries(urlSearchParams.entries());

    Object.keys(params).forEach((param) => {
      if (param.includes("for_rent")) {
        params.for_rent = params[param];
      }
    });

    const newSearchParams = {
      for_rent: params.for_rent,
      for_sale: params.for_sale,
      location: params.location,
      page: params.page ? params.page : 1,
      property_category: params.property_category,
      min_price: params.min_price,
      max_price: params.max_price,
      sort_by: params.sort_by,
      number_of_bed_rooms: params.number_of_bed_rooms,
    };

    return newSearchParams;
  };

  const onNextPageClick = () => {
    onSearchParamChange(getSearchParamsFromBackendURL(nextPage));
  };

  const onPrevPageClick = () => {
    onSearchParamChange(getSearchParamsFromBackendURL(previousPage));
  };

  const onPageClick = (page) => {
    onSearchParamChange(formatSearchParamsFromStore(page));
  };

  // const onFirstPageClick = () => {
  //   onSearchParamChange(formatSearchParamsFromStore(1));
  // };

  // const onLastPageClick = (lastPage) => {
  //   onSearchParamChange(formatSearchParamsFromStore(lastPage));
  // };

  return (
    <div style={{ backgroundColor: "#eee" }}>
      <div>
        <div
          className="shadow p-4 " //bg-grin
          style={{
            backgroundColor: "#000",
            top: "0",
            position: "sticky",
            zIndex: "999",
          }}
        >
          <FilterListing />
        </div>
        <div className="row p-md-4 p-1 mx-md-4">
          <div
            className="col-md-8 bg- rounded-3 px-4"
            style={{ backgroundColor: "#fff" }}
          >
            <div className="my-3">
              <div className="row row-cols-auto g-3">
                <div className="col">
                  <SortListing />
                </div>
              </div>
            </div>
            {!publicListingsLoading && (
              <div className="mb-3">
                <ListingGrid
                  publicListings={publicListings}
                  gridClassName="row row-cols-1 row-cols-xl-2 g-3"
                  page="publicListingList"
                />
              </div>
            )}
            {publicListingsLoading && (
              // <div className="mb-3 flex-center-general">
              //   <Spinner animation="border" variant="success" role="status" />
              // </div>
              <LoadingSpinner />
            )}
            {!publicListingsLoading && !publicListings?.length && (
              <div className="mb-3">No Listing Found!</div>
            )}
            <div className="flex-center-general my-5">
              <Paginator
                itemCount={itemCount}
                pageSize={getPublicListingPageParamValue()}
                onNextPageClick={onNextPageClick}
                onPrevPageClick={onPrevPageClick}
                onPageClick={onPageClick}
              />
            </div>
            <div className="mb-3">
              <NearByCityListing />
            </div>
          </div>

          <div className="col-md-4">
            <ListingListLayout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicListingList;
