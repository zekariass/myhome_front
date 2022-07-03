// @ts-nocheck
import Paginator from "components/commons/Paginator";
import { SYSTEM_PARAMS_PUBLIC_LISTING_PAGE_SIZE } from "components/commons/Strings";
import FooterOne from "components/footers/FooterOne";
import HeaderOne from "components/headers/HeaderOne";
import {
  getPublicListingsBySearchFromLandingPage,
  setSearchParams,
} from "features/listing/publicListingSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterListing from "./FilterListing";
import ListingGrid from "./ListingGrid";
import ListingMap from "./ListingMap";
import NearByCityListing from "./NearByCityListing";
import SortListing from "./SortListing";
import { useLocation, useSearchParams } from "react-router-dom";

const PublicListingList = () => {
  const publicListings = useSelector(
    (store) => store.publicListing.publicListingList.data?.results
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

  // const searchParams = useSelector(
  //   (store) => store.publicListing.searchParams.params
  // );

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
    // dispatch(setSearchParams({ ...newSearchParams }));
    // dispatch(
    //   getPublicListingsBySearchFromLandingPage({
    //     ...newSearchParams,
    //   })
    // );
    setSearchParams(newSearchParams);
  };

  const formatSearchParamsFromStore = (page) => {
    const newSearchParams = {};
    newSearchParams.for_rent = searchParams.get("for_rent");
    newSearchParams.for_sale = searchParams.get("for_sale");
    newSearchParams.location = searchParams.get("location");
    newSearchParams.property_category = searchParams.get("property_category");
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
    <div>
      <div className="mx-3">
        <div
          className="shadow p-3 rounded-3 bg-grin"
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

          <div className="col-md-5">
            <ListingMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicListingList;
