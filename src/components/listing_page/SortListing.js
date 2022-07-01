import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const SortListing = () => {
  const [sortBy, setSortBy] = useState("Sort By");
  const [sortByParam, setSortByParam] = useState(null);

  const sortByValues = [
    { id: "PRICE_LTH", name: "Price (Low to High)" },
    { id: "PRICE_HTL", name: "Price (High to Low)" },
    { id: "RECENT", name: "Recently Listed" },
  ];

  const onSortBySelected = (event) => {
    const selectedValue = sortByValues.find((value) => value.id === event);
    setSortBy(selectedValue.name);

    setSortByParam(event);
  };

  // console.log(sortByParam);

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
          onSelect={onSortBySelected}
        >
          {sortByValues.map((sortByValue) => (
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
