import { memo, useState, useEffect } from "react";

function Cell({
  value,
  selected,
  active,
  isEditing,
  startEdit,
  stopEdit,
  onMouseDown,
  onMouseEnter,
  onChange
}) {
  const [temp, setTemp] = useState(value);

  useEffect(() => {
    if (!isEditing) setTemp(value);
  }, [value, isEditing]);

  return (
    <div
      className={`cell ${selected ? "selected" : ""} ${
        active ? "active" : ""
      }`}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onDoubleClick={startEdit}
    >
      {isEditing ? (
        <input
          autoFocus
          value={temp}
          onChange={e => setTemp(e.target.value)}
          onBlur={() => {
            onChange(temp);
            stopEdit();
          }}
          onKeyDown={e => {
            if (e.key === "Enter" || e.key === "Tab") {
              e.preventDefault();
              onChange(temp);
              stopEdit();
            }
            if (e.key === "Escape") {
              stopEdit();
            }
          }}
        />
      ) : (
        value
      )}
    </div>
  );
}

export default memo(Cell);
