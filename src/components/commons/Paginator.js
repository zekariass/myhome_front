// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { NUMBER_OF_PAGINATION_ITEMS } from "./Strings";

const Paginator = ({
  itemCount,
  pageSize,
  onNextPageClick,
  onPrevPageClick,
  onPageClick,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const curPageFromUrl = searchParams.get("page");
    if (curPageFromUrl) {
      setCurrentPage(parseInt(curPageFromUrl));
    }
  }, [searchParams]);

  useEffect(() => {
    const numberOfItemsFetched = itemCount ? parseInt(itemCount) : 0;
    const numberOfItemsInOnePage = pageSize ? parseInt(pageSize) : 1;
    const numOfPages = Math.ceil(numberOfItemsFetched / numberOfItemsInOnePage);
    setNumberOfPages(numOfPages);
  }, [itemCount, pageSize]);

  const renderPaginationItem = (page, index) => {
    return (
      <Pagination.Item
        onClick={() => {
          setCurrentPage(page);
          onPageClick(page);
        }}
        key={index}
        active={page === currentPage}
        className="fw-bold"
      >
        {page}
      </Pagination.Item>
    );
  };

  const renderPaginationItems = () => {
    console.log("numberOfPages: ", numberOfPages);
    const pagesArray = Array.from({ length: numberOfPages }, (_, i) => i + 1);

    const paginationStartOfset = currentPage - NUMBER_OF_PAGINATION_ITEMS / 2;
    const paginationEndOffset = currentPage + NUMBER_OF_PAGINATION_ITEMS / 2;

    return (
      <>
        {renderPaginationItem(1, -1)}
        {currentPage - NUMBER_OF_PAGINATION_ITEMS >= 1 && (
          <Pagination.Ellipsis />
        )}

        <>
          {numberOfPages > NUMBER_OF_PAGINATION_ITEMS && (
            <>
              {pagesArray.map(
                (page, index) =>
                  currentPage >= 1 + NUMBER_OF_PAGINATION_ITEMS &&
                  currentPage <= numberOfPages - NUMBER_OF_PAGINATION_ITEMS &&
                  page >= paginationStartOfset &&
                  page <= paginationEndOffset &&
                  renderPaginationItem(page, index)
              )}

              {pagesArray.map(
                (page, index) =>
                  currentPage < 1 + NUMBER_OF_PAGINATION_ITEMS &&
                  page <= 1 + NUMBER_OF_PAGINATION_ITEMS &&
                  page !== 1 &&
                  page !== numberOfPages &&
                  renderPaginationItem(page, index)
              )}

              {pagesArray.map(
                (page, index) =>
                  currentPage > numberOfPages - NUMBER_OF_PAGINATION_ITEMS &&
                  page >= numberOfPages - NUMBER_OF_PAGINATION_ITEMS &&
                  page !== 1 &&
                  page !== numberOfPages &&
                  renderPaginationItem(page, index)
              )}
            </>
          )}
        </>

        {pagesArray.map(
          (page, index) =>
            numberOfPages <= NUMBER_OF_PAGINATION_ITEMS &&
            page !== 1 &&
            page !== numberOfPages &&
            renderPaginationItem(page, index)
        )}

        {currentPage + NUMBER_OF_PAGINATION_ITEMS <= numberOfPages && (
          <Pagination.Ellipsis />
        )}
        {numberOfPages > 1 &&
          renderPaginationItem(numberOfPages, numberOfPages)}
      </>
    );
  };

  return (
    <Pagination>
      {/* <Pagination.First
        onClick={() => {
          if (currentPage > 1) {
            setCurrentPage(1);
            onFirstPageClick();
          }
        }}
        disabled={currentPage === 1}
      /> */}
      <Pagination.Prev
        onClick={() => {
          if (currentPage > 1) {
            setCurrentPage(Math.max(1, currentPage - 1));
            onPrevPageClick();
          }
        }}
        disabled={currentPage === 1}
      />
      {renderPaginationItems()}
      <Pagination.Next
        onClick={() => {
          if (currentPage < numberOfPages) {
            setCurrentPage(Math.min(currentPage + 1, numberOfPages));
            onNextPageClick();
          }
        }}
        disabled={currentPage === numberOfPages}
      />
      {/* <Pagination.Last
        onClick={() => {
          if (currentPage < numberOfPages) {
            setCurrentPage(numberOfPages);
            onLastPageClick(numberOfPages);
          }
        }}
        disabled={currentPage === numberOfPages}
      /> */}
    </Pagination>
  );
};

export default Paginator;
