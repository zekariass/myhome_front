// @ts-nocheck
import { getPublicListingsBySearchFromLandingPage } from "features/listing/publicListingSlice";
import React from "react";
import { Pagination } from "react-bootstrap";
import { useDispatch } from "react-redux";

const Paginator = ({ pageCount, nextPage, previousPage, pageSize }) => {
  const dispatch = useDispatch();
  const renderPaginationItems = () => {
    const numberOfPages = Math.ceil(pageCount / pageSize);
    const pagesArray = Array.from({ length: numberOfPages }, (_, i) => i + 1);

    return (
      <>
        {pagesArray.map((page, index) => (
          <Pagination.Item key={index}>{page}</Pagination.Item>
        ))}
      </>
    );
  };

  const onNextPageClick = () => {
    const urlSearchParams = new URLSearchParams(nextPage);
    const params = Object.fromEntries(urlSearchParams.entries());

    Object.keys(params).forEach((param) => {
      if (param.includes("for_rent")) {
        params.for_rent = params[param];
      }
    });

    dispatch(
      getPublicListingsBySearchFromLandingPage({
        for_rent: params.for_rent,
        for_sale: params.for_sale,
        location: params.location,
        page: params.page,
        property_category: params.property_category,
      })
    );
  };

  return (
    <Pagination>
      <Pagination.First />
      <Pagination.Prev />
      {/* <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Ellipsis />

      <Pagination.Item>{10}</Pagination.Item>
      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item active>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>
      <Pagination.Item disabled>{14}</Pagination.Item>

      <Pagination.Ellipsis />
      <Pagination.Item>{20}</Pagination.Item> */}
      {renderPaginationItems()}
      <Pagination.Next onClick={onNextPageClick} />
      <Pagination.Last />
    </Pagination>
  );
};

export default Paginator;
