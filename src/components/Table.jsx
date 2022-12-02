import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Pagination from "./Pagination";
const Table = ({ dataForm, setDataForm, dataTable }) => {
  console.log(dataTable);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(2);
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const postPresent = [...dataForm].slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (number) => {
    setCurrentPage(number);
  };

  const handleDelete = (e) => {
    if (confirm("Do you want to delete ") == true) {
      const btnDelete = e.target.closest(".btn-delete");
      if (btnDelete) {
        const idDelete = btnDelete.dataset.id;

        const newData = [...dataForm].filter((item) => {
          return item.id !== Number(idDelete);
        });
        setDataForm(newData);
      }
    }
  };
  return (
    <>
      <div className="pt-5 mb-4 row">
        <div className="col-lg-12">
          <h1 className="fs-1 text-center">
            Vietnam Health Declaration for foreign entry
          </h1>
        </div>
      </div>
      <div className="mb-4 row">
        <div className="col-lg-4">
          <form>
            <input
              type="text"
              className="form-control"
              placeholder="Search... "
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
        <div className="text-end col">
          <div className="d-flex justify-content-end">
            <NavLink to={"/declaration"} className="btn btn-success btn-md">
              New form
            </NavLink>
          </div>
        </div>
      </div>
      <div className="mb-4 row">
        <div className="col-lg-12">
          <table className="table table-md table-bordered table-hover">
            <thead>
              <tr className="table-success w-100">
                <th className="text-center" style={{ maxWidth: "150px" }}>
                  #
                </th>
                <th className="" style={{ maxWidth: "150px" }}>
                  Form ID
                </th>
                <th className="" style={{ maxWidth: "150px" }}>
                  Full Name
                </th>
                <th className="" style={{ maxWidth: "150px" }}>
                  Object
                </th>
                <th className="" style={{ maxWidth: "150px" }}>
                  Date Of Birth
                </th>
                <th className="" style={{ maxWidth: "150px" }}>
                  Gender
                </th>
                <th className="" style={{ maxWidth: "150px" }}>
                  Contact Province
                </th>
              </tr>
            </thead>
            <tbody className="w-100">
              {postPresent.length > 0 ? (
                <>
                  {postPresent
                    .reverse()
                    ?.filter((item) => {
                      return (
                        item.id
                          .toString()
                          .toLowerCase()
                          .includes(search.toString().toLowerCase()) ||
                        item.fullName
                          .toString()
                          .toLowerCase()
                          .includes(search.toString().toLowerCase()) ||
                        item.nationId
                          .toString()
                          .toLowerCase()
                          .includes(search.toString().toLowerCase()) ||
                        item.gender
                          .toString()
                          .toLowerCase()
                          .includes(search.toString().toLowerCase()) ||
                        item.province
                          .toString()
                          .toLowerCase()
                          .includes(search.toString().toLowerCase())
                      );
                    })
                    .map((item, index) => (
                      <tr className="w-100" key={item.id}>
                        <td className="text-center py-3">{index + 1}</td>
                        <td className="d-flex py-3">
                          <NavLink to={`/edit/${item.id}`} className="mr-2">
                            {/* edit/1688393 */}
                            <FaEdit></FaEdit>
                          </NavLink>
                          <button
                            className="btn btn-delete text-danger m-0 p-0 mr-2"
                            data-id={item.id}
                            onClick={(e) => handleDelete(e)}
                          >
                            <FaTrash></FaTrash>
                          </button>
                          {item.id}
                        </td>
                        <td
                          className="py-3 text-truncate"
                          style={{ maxWidth: "150px", minWidth: "150px" }}
                        >
                          {item.fullName}
                        </td>
                        <td
                          className="py-3 text-truncate"
                          style={{ maxWidth: "100px", minWidth: "100px" }}
                        >
                          {item.object}
                        </td>
                        <td
                          className="py-3 text-truncate"
                          style={{ maxWidth: "100px", minWidth: "100px" }}
                        >
                          {item.date}
                        </td>
                        <td
                          className="py-3 text-truncate"
                          style={{ maxWidth: "100px", minWidth: "100px" }}
                        >
                          {item.gender}
                        </td>
                        <td
                          className="py-3 text-truncate"
                          style={{ maxWidth: "100px", minWidth: "100px" }}
                        >
                          {item.province}
                        </td>
                      </tr>
                    ))}
                </>
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No declaration
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        postPerPage={postPerPage}
        totalPost={[...dataForm].length}
        paginate={paginate}
        currentPage={currentPage}
        setPostPerPage={setPostPerPage}
      ></Pagination>
    </>
  );
};

export default Table;
