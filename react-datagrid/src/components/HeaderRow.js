export default function HeaderRow({ cols }) {
  return (
    <div
      className="header-row"
      style={{
        gridTemplateColumns: `var(--label-width) repeat(${cols}, var(--cell-width))`
      }}
    >
      <div className="corner" />
      {Array.from({ length: cols }).map((_, i) => (
        <div key={i} className="header-cell">
          Col {i + 1}
        </div>
      ))}
    </div>
  );
}
