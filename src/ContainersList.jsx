import { useState } from "react";
import { Link } from "react-router-dom";

const ContainersList = ({ API_URL, API_REQUEST_HEADERS, apiChangedFlag }) => {
  const [containers, setContainers] = useState({});
  const [success, setSuccess] = useState(false);
  const [expired, setExpired] = useState(false);
  const [empty, setEmpty] = useState(false);

  console.log("Start functional component (ContainersList) render...");
  console.log("ContainersList - apiChangedFlag", apiChangedFlag);
  console.log(
    "ContainersList - check state before anytin",
    Object.keys(containers).length,
    success,
    expired,
    empty,
    API_REQUEST_HEADERS !== ""
  );

  if (
    Object.keys(containers).length == 0 &&
    !success &&
    !expired &&
    !empty &&
    API_REQUEST_HEADERS !== ""
  ) {
    console.log("ContainersList - call request function...");
    requestContainersList();
  }
  // console.log(API_URL);
  //console.log(API_REQUEST_HEADERS);

  function requestContainersList() {
    console.log("ContainersList - calling request function");
    //setContainers([]);
    fetch(`${API_URL}/containers`, {
      headers: API_REQUEST_HEADERS,
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          console.log("ContainersList - API returned, result:");
          console.log(result);
          console.log(
            "ContainersList - API returned, success:" + result.success
          );
          console.log("ContainersList - API returned, code:" + result.code);
          if (result.success) {
            setContainers(result["Containers List"]);
            setSuccess(true);
          } else if (result.code === "token_expired") {
            setExpired(true);
          } else if (result["Total Containers"] === 0) {
            setEmpty(true);
          }
          return null;
        },
        (error) => {
          console.log("ContainersList - ", error);
        }
      );
  }

  if (success) {
    console.log("ContainersList - finish and display containers list");
    const containersArray = Object.entries(containers);
    console.log(containersArray);
    // eslint-disable-next-line react/jsx-key
    const containersList = containersArray.map((cont) => (
      <li key={cont[0]}>
        {cont[1]} <Link to={`/container_form_edit/${cont[0]}`}>Edit</Link>{" "}
        <Link to={`containers/delete/${cont[0]}`}>Delete</Link>
      </li>
    ));
    return <ul className="list">{containersList}</ul>;
  }
  if (expired) {
    console.log("ContainersList - display token expired message");
    return <h3>Session expired - please login again</h3>;
  }
  if (empty) {
    console.log("ContainersList - display list empty message");
    return (
      <h3>The list returned was empty - there are currently no containers</h3>
    );
  }
  console.log(
    "ContainersList - display waiting/failed message (",
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

export default ContainersList;
