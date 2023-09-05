import React from 'react';
function TableRows({ rowsData, deleteTableRows, handleChange }) {
  return rowsData.map((data, index) => {
    const { serialNumber, item, quantity, amount } = data;
    return (
      <tr key={index} className="flex">
        <td>
          <input
            type="text"
            value={serialNumber}
            onChange={(evnt) => handleChange(index, evnt)}
            name="serialNumber"
            className="form-control"
            style={{ width: '48px' }}
            disabled
          />
        </td>
        <td>
          <input
            type="text"
            value={item}
            onChange={(evnt) => handleChange(index, evnt)}
            name="item"
            className="form-control"
            style={{ width: '100px' }}
          />{' '}
        </td>
        <td>
          <input
            type="text"
            value={quantity}
            onChange={(evnt) => handleChange(index, evnt)}
            name="quantity"
            className="form-control"
            style={{ width: '48px' }}
          />{' '}
        </td>
        <td>
          <input
            type="number"
            value={amount}
            onChange={(evnt) => handleChange(index, evnt)}
            name="amount"
            className="form-control"
          />{' '}
        </td>
        <td>
          <button
            className="btn btn-outline-danger"
            onClick={() => deleteTableRows(index)}
            disabled={rowsData.length === 1}
          >
            x
          </button>
        </td>
      </tr>
    );
  });
}
export default TableRows;
