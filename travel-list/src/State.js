export default function State({ items }) {
    const numItems = items.length;
    const numItemsPacked = items.filter((item) => item.packed).length;
    const peranctage = Math.round((numItemsPacked / numItems) * 100);
    return (
      <footer className="stats">
        You have {numItems} items on your list, and you already packed{" "}
        {numItemsPacked} ({peranctage}%)
      </footer>
    );
  }