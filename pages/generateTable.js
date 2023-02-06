import React from 'react';

const parseTable = (input) => {
  const rows = input.split('\n').slice(1);
  const header = rows.shift().split('|').slice(1, 3).map(h => h.trim());
  const data = rows.map(row => row.split('|').slice(1, 3).map(cell => cell.trim()));

  return (
    <table>
      <thead>
        <tr>
          <th>{header[0]}</th>
          <th>{header[1]}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            <td>{row[0]}</td>
            <td>{row[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default parseTable;