// @ts-nocheck
import { getListingSearchParams } from "components/commons/functions";
import { setSearchParams } from "features/listing/publicListingSlice";
import React, { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const SortListing = () => {
  const [sortBy, setSortBy] = useState(-1);

  const storedSearchParams = useSelector(
    (store) => store.publicListing.searchParams.params
  );

  const sortingValues = [
    { id: "-1", name: "Sort By" },
    { id: "property_price", name: "Price (Low to High)" },
    { id: "-property_price", name: "Price (High to Low)" },
    { id: "-listed_on", name: "Recently Listed" },
  ];

  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const getSortByName = (ValueId) => {
    const selectedSortObj = sortingValues.find((value) => value.id === ValueId);
    return selectedSortObj;
  };

  useEffect(() => {
    const searchParams = getListingSearchParams(urlSearchParams);
    setSortBy(getSortByName(searchParams?.sort_by).name);
  }, []);

  const onSortingValueSelect = (event) => {
    const selectedValue = getSortByName(event);
    setSortBy(selectedValue?.name);

    const searchParams = getListingSearchParams(urlSearchParams);

    searchParams.sort_by = selectedValue?.id;

    dispatch(
      setSearchParams({
        ...storedSearchParams,
        ...searchParams,
      })
    );

    setUrlSearchParams({ ...searchParams });
  };

  return (
    <div className="row row-cols-auto g-3">
      <div className="col flex-center-general">
        <p className="fs-5 fw-bold">Sort</p>
      </div>
      <div className="col flex-center-general">
        <DropdownButton
          id="filter-property-category"
          title={sortBy}
          bsPrefix="footer-bg btn-general-outline py-2 px-3"
          onSelect={onSortingValueSelect}
        >
          {sortingValues.map((sortByValue) => (
            <Dropdown.Item eventKey={sortByValue?.id} key={sortByValue?.id}>
              {sortByValue.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
    </div>
  );
};

export default SortListing;
