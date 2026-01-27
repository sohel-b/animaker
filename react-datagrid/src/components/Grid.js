import { useState, useRef, useEffect } from "react";
import HeaderRow from "./HeaderRow";
import LabelColumn from "./LabelColumn";
import Cell from "./Cell";
import useClipboard from "../hooks/useClipboard";
import { normalize } from "../utils/gridUtils";

export default function Grid({
  rows,
  cols,
  data,
  setData,
  setRows,
  setCols
}) {
  const [selection, setSelection] = useState(null);
  const [editingCell, setEditingCell] = useState(null);

  const [active, setActive] = useState({ row: 0, col: 0 });
  const dragging = useRef(false);

  useEffect(() => {
  const handleKeyDown = (e) => {
    if (editingCell) return; // input handles keys

    let { row, col } = active;

    switch (e.key) {
      case "ArrowUp":
        row = Math.max(0, row - 1);
        break;
      case "ArrowDown":
        row = Math.min(rows - 1, row + 1);
        break;
      case "ArrowLeft":
        col = Math.max(0, col - 1);
        break;
      case "ArrowRight":
        col = Math.min(cols - 1, col + 1);
        break;
      case "Enter":
        e.preventDefault();
        row = Math.min(rows - 1, row + 1);
        break;
      case "Tab":
        e.preventDefault();
        if (e.shiftKey) {
          col = Math.max(0, col - 1);
        } else {
          col = Math.min(cols - 1, col + 1);
        }
        break;
      default:
        return;
    }

    setActive({ row, col });
    setSelection({
      startRow: row,
      startCol: col,
      endRow: row,
      endCol: col
    });
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [active, rows, cols, editingCell]);


  useClipboard({
    selection,
    data,
    setData,
    rows,
    cols,
    setRows,
    setCols
  });

  const isSelected = (r, c) => {
    if (!selection) return false;
    const s = normalize(selection);
    return r >= s.startRow && r <= s.endRow &&
           c >= s.startCol && c <= s.endCol;
  };

  return (
    <div className="grid-wrapper">
  <div className="grid">
    <HeaderRow cols={cols} />

    <div className="body">
      <LabelColumn rows={rows} />

      <div
        className="cells"
        style={{
          gridTemplateColumns: `repeat(${cols}, var(--cell-width))`
        }}
        onMouseUp={() => (dragging.current = false)}
        onMouseLeave={() => (dragging.current = false)}
      >
        {data.map((row, r) =>
          row.map((cell, c) => (
           <Cell
                key={`${r}-${c}`}
                value={cell.value}
                selected={isSelected(r, c)}
                active={active.row === r && active.col === c}
                onMouseDown={() => {
                  dragging.current = true;
                  setSelection({
                    startRow: r,
                    startCol: c,
                    endRow: r,
                    endCol: c
                  });
                  setActive({ row: r, col: c });
                }}
                onMouseEnter={() => {
                  if (!dragging.current) return;
                  setSelection(s => ({ ...s, endRow: r, endCol: c }));
                }}
                onChange={(val) =>
                  setData(d => {
                    const copy = d.map(r => r.map(c => ({ ...c })));
                    copy[r][c].value = val;
                    return copy;
                  })
                }
                isEditing={
                    editingCell &&
                    editingCell.row === r &&
                    editingCell.col === c
                }
                startEdit={() => setEditingCell({ row: r, col: c })}
                stopEdit={() => setEditingCell(null)}
              />
          ))
        )}
      </div>
    </div>
  </div>
</div>

  );
}