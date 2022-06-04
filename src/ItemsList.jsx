const ITEMS = ["vase", "delicate flower", "ironing board", "defalted football"];

const ItemsList = () => {
  console.log("Start functional component (ItemsList) render...");

  // eslint-disable-next-line react/jsx-key
  const items = ITEMS.map((item) => <li key={item}> {item} </li>);
  return <ul>{items}</ul>;
};

export default ItemsList;
