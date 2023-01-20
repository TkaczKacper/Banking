import { Data as DataType} from "../APIResponse/APIResponseTypes";
import { useState } from "react";
import Modal from "../Modal/Modal";
import './table.css';

let modalDataId = 0;

const Table = ({ data_ }: { data_: DataType[] }) => {
  const [showModal, setShowModal] = useState(false);
  if (data_.length === undefined) {
    console.log(Object.keys(data_));
    return(
      <>
        <table className="data-table">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Year</th>
            <th>Panton value</th>
          </tr>
          <tbody>
            <tr style={{backgroundColor: Object.values(data_)[3].toString()}} onClick={() => setShowModal(true)}>
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
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Year</th>
          <th>Panton value</th>
        </tr>
        <tbody>
          {!data_.length ? (
            <tr>
              <td>Data not found</td>
            </tr>
            ) : (
              data_.map((d) => {
                return(
                  <tr key={d.id} style={{backgroundColor: d.color}} onClick={() => {
                    modalDataId = d.id;
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
      {showModal ? (
        <Modal>
          <div id="modal_container">
            <h1>Element id: {Object.values(data_)[modalDataId-1].id}</h1>
            <h3>Name: {Object.values(data_)[modalDataId-1].name}</h3>
            <h3>Year: {Object.values(data_)[modalDataId-1].year}</h3>
            <h3>Color hex: {Object.values(data_)[modalDataId-1].color}</h3>
            <h3>Pantone value: {Object.values(data_)[modalDataId-1].pantone_value}</h3>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default Table;
