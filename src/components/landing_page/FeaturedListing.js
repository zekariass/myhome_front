// @ts-nocheck
import {
  getCurrencyName,
  getFullAddress,
  getPeriodicityName,
  getPropertyCategoryData,
} from "components/commons/functions";
import {
  PATH_PUBLIC_LISTING,
  PATH_PUBLIC_LISTING_DETAIL,
} from "components/commons/Strings";
import { getFeaturedListings } from "features/listing/publicListingSlice";
import React, { useState } from "react";
import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FeaturedListing = () => {
  const featuredListings = useSelector(
    (store) => store.publicListing.featuredListingList.data
  );

  const propertyCategories = useSelector(
    (store) => store.propertyCategory.propertyCategoryList.response.data
  );

  const currencies = useSelector(
    (store) => store.system.currency.currencyList.data
  );

  const periodicities = useSelector(
    (store) => store.common.periodicityList.data
  );

  const currentLocation = "Mekele";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getFeaturedListings({ page: 1, location: currentLocation }));
  }, []);

  const onLoadMoreClick = () => {
    const nextUrl = featuredListings?.next;
    const urlParams = nextUrl.split("?")[1];
    const urlParamSplit = urlParams.split("&");

    const pageParam = urlParamSplit?.find((param) => param.includes("page"));

    const page = pageParam.split("=")[1];

    // console.log("params: ", page);
    dispatch(
      getFeaturedListings({ page: parseInt(page), location: currentLocation })
    );
  };

  return (
    <div className="mt-5">
      {!!featuredListings.results.length && (
        <>
          <div className="px-lg-5 px-3 px-lg-5">
            <div className="mb-4 ms-4">
              <h4>Featured Lists</h4>
            </div>

            <div
              className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 mx-lg-3"
              id="featured-list-carousel"
            >
              {featuredListings?.results?.map((featuredListing, index) => (
                <div key={index} className="card-table">
                  <Card
                    className="card-cell feature-card other-bg"
                    style={{ borderWidth: "1px" }}
                    role="button"
                    onClick={() =>
                      navigate(
                        `${PATH_PUBLIC_LISTING}/${featuredListing?.main_listing?.id}/detail`
                      )
                    }
                  >
                    <Card.Img
                      src={
                        featuredListing?.main_listing?.property_images[0].image
                      }
                      height={200}
                      width="100%"
                    />
                    <Card.ImgOverlay>
                      <i className="star icon grin-color"></i>
                      <span
                        className="display-title fw-bold fst-italic"
                        style={{ fontSize: "0.9em" }}
                      >
                        Featured
                      </span>
                    </Card.ImgOverlay>
                    <Card.Body>
                      {featuredListing?.main_listing?.number_of_baths &&
                        featuredListing?.main_listing?.number_of_bed_rooms && (
                          <Card.Text className="flex-center-general">
                            {featuredListing?.main_listing?.number_of_bed_rooms}{" "}
                            Bed Room,
                            {
                              featuredListing?.main_listing?.number_of_baths
                            }{" "}
                            Bath Room{" "}
                            {
                              getPropertyCategoryData(
                                propertyCategories,
                                featuredListing?.main_listing?.property_category
                              )?.name
                            }{" "}
                            at
                          </Card.Text>
                        )}

                      {getFullAddress(featuredListing?.main_listing?.address)}
                      <Card.Text className="flex-center-general fw-bold">
                        <>
                          {featuredListing?.main_listing?.property_price}{" "}
                          {getCurrencyName(
                            currencies,
                            featuredListing?.main_listing?.listing_currency
                          )}
                          /
                          {getPeriodicityName(
                            periodicities,
                            featuredListing?.main_listing?.listing_term
                          )}
                        </>
                      </Card.Text>
                      <Card.Text className="flex-center-general">
                        {
                          getPropertyCategoryData(
                            propertyCategories,
                            featuredListing?.main_listing?.property_category
                          )?.name
                        }
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          {/* <div className="row" id="featured-list-control">
        <div className="col d-flex justify-content-start">
          <div className="featured-list-control-item">
            <i className="arrow chevron left big icon"></i>
          </div>
        </div>
        <div className="col d-flex justify-content-end">
          <div className="featured-list-control-item">
            <i className="arrow chevron right big icon"></i>
          </div>
        </div>
      </div> */}
          <div className="d-flex align-content-center justify-content-center my-4">
            <button className="btn btn-general" onClick={onLoadMoreClick}>
              Load more...
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturedListing;
