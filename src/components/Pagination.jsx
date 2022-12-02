import React, { useState } from "react";

const Pagination = ({
  postPerPage,
  totalPost,
  paginate,
  currentPage,
  setPostPerPage,
}) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="d-flex justify-content-center align-items-center gap-3">
          <nav className="mr-2">
            <ul className="pagination justify-content-end mb-0">
              {pageNumber?.map((item) => (
                <li
                  className={`page-item ${
                    currentPage === item ? "active" : ""
                  }`}
                >
                  <a className="page-link" onClick={() => paginate(item)}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <form className="d-flex align-items-center">
            <select
              className="form-control rounded py-2 px-4"
              style={{ width: "5rem" }}
              onChange={(e) => setPostPerPage(e.target.value)}
            >
              <option value="2" selected="">
                2
              </option>
              <option value="4">4</option>
              <option value="6">6</option>
            </select>
            <label className="mb-0 mx-2">Items/Page</label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
