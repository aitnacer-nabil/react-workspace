
import { useState } from "react";

export default function PackingList({ items, onDelete, onToggle, onClear }) {
    const [sortBy, setsortBy] = useState("input");
    let lastItemesSorted;
    if (sortBy === "input") lastItemesSorted = items;
    //use slice to make copy of an array so dont change it
    if (sortBy === "description") {
      lastItemesSorted = items
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description));
    }
  
    if (sortBy === "packed")
      lastItemesSorted = items
        .slice()
        .sort((a, b) => Number(a.packed) - Number(b.packed));
    return (
      <div className="list">
        <ul>
          {lastItemesSorted.map((item) => (
            <Item
              item={item}
              key={item.id}
              onDelete={onDelete}
              onToggle={onToggle}
              onClear={onClear}
            />
          ))}
        </ul>
        <div className="actions">
          <select value={sortBy} onChange={(e) => setsortBy(e.target.value)}>
            <option value="input">Sort by input order</option>
            <option value="description">Sort by description</option>
            <option value="packed">Sort by packed static</option>
          </select>
          <button onClick={onClear}>Clear List</button>
        </div>
      </div>
    );
  }
  
  function Item({ item, onDelete, onToggle }) {
    return (
      <li>
        <input
          type="checkbox"
          value={item.packed}
          onChange={() => onToggle(item.id)}
          id=""
        />
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.description}
        </span>
        <button onClick={() => onDelete(item.id)}>❌</button>
      </li>
    );
  }