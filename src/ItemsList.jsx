import { useState } from "react";
import { Link } from "react-router-dom";

const ItemsList = ({ API_URL, API_REQUEST_HEADERS, apiChangedFlag }) => {
  const [items, setItems] = useState({});
  const [success, setSuccess] = useState(false);
  const [expired, setExpired] = useState(false);
  const [empty, setEmpty] = useState(false);

  console.log("Start functional component (ItemsList) render...");
  console.log("ItemsList - apiChangedFlag", apiChangedFlag);
  console.log(
    "ItemsList - check state before anytin",
    Object.keys(items).length,
    success,
    expired,
    empty,
    API_REQUEST_HEADERS !== ""
  );

  if (
    Object.keys(items).length == 0 &&
    !success &&
    !expired &&
    !empty &&
    API_REQUEST_HEADERS !== ""
  ) {
    console.log("ItemsList - call request function...");
    requestItemsList();
  }

  function requestItemsList() {
    console.log("ItemsList - calling request function");

    fetch(`${API_URL}/items`, {
      headers: API_REQUEST_HEADERS,
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          console.log("ItemsList - API returned, result:");
          console.log(result);
          console.log("ItemsList - API returned, success:" + result.success);
          console.log("ItemsList - API returned, code:" + result.code);
          if (result.success) {
            setItems(result["Items List"]);
            setSuccess(true);
          } else if (result.code === "token_expired") {
            setExpired(true);
          } else if (result["Total Items"] === 0) {
            setEmpty(true);
          }
          return null;
        },
        (error) => {
          console.log("ItemsList - ", error);
        }
      );
  }

  if (success) {
    console.log("ItemsList - finish and display items list");
    const itemsArray = Object.entries(items);
    console.log(itemsArray);
    // eslint-disable-next-line react/jsx-key
    const itemsList = itemsArray.map((cont) => (
      <li key={cont[0]}>
        {cont[1]} <Link to={`/item_form_edit/${cont[0]}`}>Edit</Link>{" "}
        <Link to={`items/delete/${cont[0]}`}>Delete</Link>
      </li>
    ));
    return <ul className="list">{itemsList}</ul>;
  }
  if (expired) {
    console.log("ItemsList - display token expired message");
    return <h3>Session expired - please login again</h3>;
  }
  if (empty) {
    console.log("ItemsList - display list empty message");
    return <h3>The list returned was empty - there are currently no items</h3>;
  }
  console.log(
    "ItemsList - display waiting/failed message (",
    success,
    expired,
    empty,
    ")"
  );

  return (
    <div>
      <h3>Waiting for results...</h3>
      <h4>and/or something went wrong - sack the coder!</h4>
    </div>
  );
};

export default ItemsList;
