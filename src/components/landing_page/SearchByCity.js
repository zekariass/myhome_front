// @ts-nocheck
import { PATH_PUBLIC_LISTING } from "components/commons/Strings";
import {
  clearCityList,
  getCitiesByRegion,
  getRegionsByCountryName,
} from "features/common/addressSlice";
import {
  clearPublicListing,
  setSearchParams,
} from "features/listing/publicListingSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchByCity = () => {
  const regions = useSelector(
    (store) => store.address.getRegionsByCountryName.data
  );

  const cities = useSelector((store) => store.address.city.cityList);
  const storedSearchParams = useSelector(
    (store) => store.publicListing.searchParams.params
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParam = { country: "Ethiopia" };
    dispatch(getRegionsByCountryName(searchParam));
  }, []);

  const getCitiesOfRegion = (region) => {
    dispatch(clearCityList());
    dispatch(getCitiesByRegion(region?.id));
  };

  const onCityClick = (location) => {
    const searchParams = {
      ...storedSearchParams,
      location: location ? location : -1,
    };
    //  {
    //   for_rent: false,
    //   for_sale: false,
    //   location: location ? location : -1,
    //   property_category: -1,
    //   page: 1,
    // };

    let urlParm = "";

    dispatch(clearPublicListing());
    dispatch(setSearchParams(searchParams));

    Object.keys(searchParams).forEach((paramKey) => {
      urlParm += `${paramKey}=${searchParams[paramKey]}&`;
    });

    urlParm = urlParm.substring(0, urlParm.length - 1);

    navigate(`${PATH_PUBLIC_LISTING}?${urlParm}`);
  };

  const renderCitiesOfRegion = () => {
    return (
      <div className="row row-cols-auto g-4 flex-center-general">
        {cities.map((city) => (
          <div className="col" key={city.id}>
            <div
              className="link-general link-size-normal rounded-2 p-2 other-bg"
              onClick={() => onCityClick(city?.name)}
              role="button"
            >
              {city?.name}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mt-5">
      <div className=" search-by-city my-3 shadow-sm">
        <h4 className="text-light mb-4 ps-3">
          Search property by city and region
        </h4>

        <div className="row row-cols-auto g-3 flex-center-general mb-4">
          {regions.map((region) => (
            <div className="col" key={region.id}>
              <button
                className="btn-general-outline"
                onClick={() => getCitiesOfRegion(region)}
              >
                {region.name}
              </button>
            </div>
          ))}
        </div>
        <div>
          <hr
            className="region-city-separator"
            style={{ backgroundColor: "white" }}
          />
        </div>
        <div className="mt-4">
          <div>{renderCitiesOfRegion()}</div>
        </div>
      </div>
    </div>
  );
};

export default SearchByCity;
