export default function LabelColumn({ rows }) {
  return (
    <div className="label-column">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="label-cell">
          Row {i + 1}
        </div>
      ))}
    </div>
  );
}
