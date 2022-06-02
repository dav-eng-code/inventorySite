const ITEMS = ["vase", "delicate flower", "ironing board", "defalted football"];

const ItemsList = () => {
  // eslint-disable-next-line react/jsx-key
  const items = ITEMS.map((item) => <li> {item} </li>);
  return <ul>{items}</ul>;
};

export default ItemsList;
