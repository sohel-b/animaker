export const createGrid = (rows, cols) =>
  Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ value: "" }))
  );

export const normalize = (s) => {
  const startRow = Math.min(s.startRow, s.endRow);
  const endRow = Math.max(s.startRow, s.endRow);
  const startCol = Math.min(s.startCol, s.endCol);
  const endCol = Math.max(s.startCol, s.endCol);
  return { startRow, endRow, startCol, endCol };
};
