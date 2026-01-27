import { useState } from "react";
import Grid from "./components/Grid.js";
import { createGrid } from "./utils/gridUtils";

export default function App() {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(6);
  const [data, setData] = useState(() => createGrid(10, 6));

  const addRow = () => {
    setRows(r => r + 1);
    setData(d => [...d, createGrid(1, cols)[0]]);
  };

  const addCol = () => {
    setCols(c => c + 1);
    setData(d => d.map(row => [...row, { value: "" }]));
  };

  return (
    <>
      <div className="toolbar">
        <button onClick={addRow}>Add Row</button>
        <button onClick={addCol}>Add Column</button>
      </div>

      <Grid
        rows={rows}
        cols={cols}
        data={data}
        setData={setData}
        setRows={setRows}
        setCols={setCols}
      />
    </>
  );
}
