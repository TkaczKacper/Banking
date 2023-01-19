import { Data as DataType} from "../APIResponse/APIResponseTypes";

const Table = ({ data_ }: { data_: DataType[] }) => {
  if (data_.length === undefined) {
    console.log(Object.keys(data_));
    return(
      <table>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Year</th>
          <th>Panton value</th>
        </tr>
        <tbody>
          <tr style={{backgroundColor: Object.values(data_)[3].toString()}}>
            <td>{Object.values(data_)[0].toString()}</td>
            <td>{Object.values(data_)[1].toString()}</td>
            <td>{Object.values(data_)[2].toString()}</td>
            <td>{Object.values(data_)[4].toString()}</td>
          </tr>
        </tbody>
      </table>
    );
  };
  return (
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
                <tr key={d.id} style={{backgroundColor: d.color}}>
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
  );
};

export default Table;
