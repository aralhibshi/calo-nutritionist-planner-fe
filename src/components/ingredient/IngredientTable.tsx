import React, { useState } from 'react';
import Table from '@mui/joy/Table';
import IngredientDetailModal from './IngredientDetailModal';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  price: number,
) {
  return { name, calories, fat, carbs, protein, price };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 22.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 10),
  createData('Eclair', 262, 16.0, 24, 6.0, 2.5),
  createData('Cupcake', 305, 3.7, 67, 4.3, 3.6),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 9999),
];

const IngredientTable: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);

  const handleRowClick = (row: any) => {
    setSelectedRow(row);
    setOpen(true);
    console.log(row);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Table hoverRow sx={{ marginTop: '40px' }}>
        <thead>
          <tr>
            <th style={{ width: '40%' }}>Ingredient</th>
            <th>Calories</th>
            <th>Fat&nbsp;(g)</th>
            <th>Carbs&nbsp;(g)</th>
            <th>Protein&nbsp;(g)</th>
            <th>Price&nbsp;(BHD)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} onClick={() => handleRowClick(row)}>
              <td>{row.name}</td>
              <td>{row.calories}</td>
              <td>{row.fat}</td>
              <td>{row.carbs}</td>
              <td>{row.protein}</td>
              <td>{row.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <IngredientDetailModal open={open} handleClose={handleCloseModal} row={selectedRow} />
    </>
  );
}
export default IngredientTable;