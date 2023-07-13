import { useState } from "react";
import "./index.css";
import Logo from './Logo';
import Form from './Form';
import PackingList from './PackingList';
import State from './State';

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];

function App() {
  const [items, setItems] = useState([]);
  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }
  function handleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleClearList() {
    const confirm = window.confirm("Are you sure u want delte all items");
    if (confirm) setItems([]);
  }
  return (
    <div>
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList
        items={items}
        onDelete={handleDelete}
        onToggle={handleToggleItem}
        onClear={handleClearList}
      />
      <State items={items} />
    </div>
  );
}





export default App;
