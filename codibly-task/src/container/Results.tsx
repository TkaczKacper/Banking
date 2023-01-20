import { useState } from "react";
import { currentPage } from "../components/form/Form";
import Modal from "../components/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "../components/APIResponse/fetchSearch";
import Pagination from "../components/Pagination/Pagination";

import './results.css';


let modalDataId = 0;
let totalPages = 1;

const Results = () => {
  const url = window.location.href;
  const stringParams = url.split('?')[1];
  const pair = stringParams.split('=');
  let pageNumber = '';
  let idNumber = '';
  if (pair[0] === 'page') {
    pageNumber = pair[1];
  } else if (pair[0] === 'id') {
    idNumber = pair[1];
  }
  console.log(pageNumber, idNumber);
  const [requestParam] = useState({
    id: idNumber,
    page: pageNumber,
  });
  const result = useQuery(["search", requestParam], fetchSearch);
  console.log(requestParam);
  const data_ = result?.data?.data ?? [];
  let resPages = result?.data?.total_pages ?? [];
  if (typeof (resPages) === 'number') {
    totalPages = resPages;
  }
  console.log(totalPages, currentPage);
  console.log(data_)

  const [showModal, setShowModal] = useState(false);
  if (data_.length === undefined) {
    console.log(Object.keys(data_));
    return (
      <>
        <table className="data-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Year</th>
              <th>Panton value</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ backgroundColor: Object.values(data_)[3].toString() }} onClick={() => setShowModal(true)}>
              <td>{Object.values(data_)[0].toString()}</td>
              <td>{Object.values(data_)[1].toString()}</td>
              <td>{Object.values(data_)[2].toString()}</td>
              <td>{Object.values(data_)[4].toString()}</td>
            </tr>
          </tbody>
        </table>
        {showModal ? (
          <Modal>
            <div id="modal_container">
              <h1>Element id: {Object.values(data_)[0].toString()}</h1>
              <h3>Name: {Object.values(data_)[1].toString()}</h3>
              <h3>Year: {Object.values(data_)[2].toString()}</h3>
              <h3>Color hex: {Object.values(data_)[3].toString()}</h3>
              <h3>Pantone value: {Object.values(data_)[4].toString()}</h3>
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          </Modal>
        ) : null}
      </>
    );
  };
  return (
    <>
      <table className="data-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Year</th>
            <th>Panton value</th>
          </tr>
        </thead>
        <tbody>
          {!data_.length ? (
            <tr>
              <td>Data not found</td>
            </tr>
          ) : (
            data_.map((d) => {
              return (
                <tr key={d.id} style={{ backgroundColor: d.color }} onClick={() => {
                  modalDataId = d.id - ((currentPage - 1) * 5);
                  console.log(modalDataId);
                  setShowModal(true);
                }}>
                  <td>{d.id}</td>
                  <td>{d.name}</td>
                  <td>{d.year}</td>
                  <td>{d.pantone_value}</td>
                </tr>
              )
            })
          )
          }
        </tbody>
      </table>
      <Pagination total_pages={totalPages} />
      {showModal ? (
        <Modal>
          <div id="modal_container">
            <h1>Element id: {Object.values(data_)[modalDataId - 1].id}</h1>
            <h3>Name: {Object.values(data_)[modalDataId - 1].name}</h3>
            <h3>Year: {Object.values(data_)[modalDataId - 1].year}</h3>
            <h3>Color hex: {Object.values(data_)[modalDataId - 1].color}</h3>
            <h3>Pantone value: {Object.values(data_)[modalDataId - 1].pantone_value}</h3>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export { Results };
