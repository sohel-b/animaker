import { useEffect } from "react";
import { normalize, createGrid } from "../utils/gridUtils";

export default function useClipboard({
  selection,
  data,
  setData,
  rows,
  cols,
  setRows,
  setCols
}) {
  useEffect(() => {
    const handler = async (e) => {
      if (!selection) return;
      const sel = normalize(selection);

      // COPY
      if (e.ctrlKey && e.key === "c") {
        const text = data
          .slice(sel.startRow, sel.endRow + 1)
          .map(r =>
            r.slice(sel.startCol, sel.endCol + 1).map(c => c.value).join("\t")
          )
          .join("\n");

        navigator.clipboard.writeText(text);
      }

      // CUT
      if (e.ctrlKey && e.key === "x") {
        e.preventDefault();
        handler({ ctrlKey: true, key: "c" });
        setData(d => {
          const copy = d.map(r => r.map(c => ({ ...c })));
          for (let r = sel.startRow; r <= sel.endRow; r++) {
            for (let c = sel.startCol; c <= sel.endCol; c++) {
              copy[r][c].value = "";
            }
          }
          return copy;
        });
      }

      // PASTE
      if (e.ctrlKey && e.key === "v") {
        e.preventDefault();
        const text = await navigator.clipboard.readText();
        const pasted = text.split("\n").map(r => r.split("\t"));

        const needRows = sel.startRow + pasted.length;
        const needCols = sel.startCol + pasted[0].length;

        if (needRows > rows) {
          setRows(needRows);
          setData(d => [...d, ...createGrid(needRows - rows, cols)]);
        }

        if (needCols > cols) {
          setCols(needCols);
          setData(d =>
            d.map(r => [...r, ...createGrid(1, needCols - cols)[0]])
          );
        }

        setData(d => {
          const copy = d.map(r => r.map(c => ({ ...c })));
          pasted.forEach((row, rIdx) => {
            row.forEach((val, cIdx) => {
              copy[sel.startRow + rIdx][sel.startCol + cIdx].value = val;
            });
          });
          return copy;
        });
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selection, data, rows, cols, setData, setRows, setCols]);
}
