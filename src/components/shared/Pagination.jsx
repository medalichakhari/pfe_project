import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel="Previous"
      nextLabel="Next"
      pageCount={pageCount}
      onPageChange={onPageChange}
      containerClassName="flex flex-wrap justify-center mt-8"
      pageClassName="mr-2"
      previousClassName="mr-2"
      nextClassName="mr-2"
      activeClassName="bg-blue-600 text-white"
      disabledClassName="opacity-50 cursor-not-allowed"
      breakClassName="mr-2"
      pageLinkClassName="px-3 py-2 rounded-full"
      previousLinkClassName="px-3 py-2 rounded-full hover:bg-blue-100"
      nextLinkClassName="px-3 py-2 rounded-full hover:bg-blue-100"
      breakLinkClassName="px-3 py-2 rounded-full hover:bg-blue-100"
    />
  );
};

export default Pagination;