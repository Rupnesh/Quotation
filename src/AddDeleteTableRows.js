import React, { useState, useEffect } from 'react';
import TableRows from './TableRows';
function AddDeleteTableRows(props) {
  const [rowsData, setRowsData] = useState([]);
  useEffect(() => {
    setRowsData([
      ...rowsData,
      {
        serialNumber: 1,
        item: '',
        quantity: '',
        amount: '',
      },
    ]);
  }, []);
  useEffect(() => {
    rowsData.map((row, index) => {
      row.serialNumber = index + 1;
    });
    props.setParentData(rowsData);
  }, [rowsData]);

  const addTableRows = () => {
    var rowsInput = {
      serialNumber: '',
      item: '',
      quantity: '',
      amount: null,
    };

    setRowsData([...rowsData, rowsInput]);
  };
  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = name === 'amount' ? +value : value;
    setRowsData(rowsInput);
  };
  const handleRowData = rowsData;
  return (
    <div className="container">
      <div className="row">
        <div
          className="col-sm-8"
          style={{ width: '100wh', overflow: 'scroll' }}
        >
          <table className="table flex">
            <thead>
              <tr>
                <th>S.N.</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>
                  <button
                    className="btn btn-outline-success"
                    onClick={addTableRows}
                  >
                    +
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <TableRows
                rowsData={rowsData}
                deleteTableRows={deleteTableRows}
                handleChange={handleChange}
              />
            </tbody>
          </table>
        </div>
        <div className="col-sm-4"></div>
      </div>
    </div>
  );
}
export default AddDeleteTableRows;
