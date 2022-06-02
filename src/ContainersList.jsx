//import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://productivity-inventory.herokuapp.com";

const ContainersList = () => {
  const [containers, setContainers] = useState({});
  const [success, setSuccess] = useState(false);
  const [expired, setExpired] = useState(false);
  const [empty, setEmpty] = useState(false);

  //API call to get list of containers
  //console.log list of containers
  //useEffect(() => requestContainersList());
  console.log("Start functional component render...");
  console.log("check state before anytin", success, expired, empty);

  if (Object.keys(containers).length == 0 && !success && !expired && !empty) {
    console.log("call request function...");
    requestContainersList();
  }

  function requestContainersList() {
    console.log("calling request function");
    //setContainers([]);
    fetch(`${API_URL}/containers`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IktCaWoyb3V1TEJ1RVNrblRUWlhrcSJ9.eyJpc3MiOiJodHRwczovL2Rhdi1lbmctY29kZS10ZXN0aW5nLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MjQ2ZGNiZGYwYWE1NTAwNmFjNzQ4NWYiLCJhdWQiOiJodHRwczovL3Byb2R1Y3Rpdml0eS1pbnZlbnRvcnkuaGVyb2t1YXBwLmNvbS8iLCJpYXQiOjE2NTQxNjM2ODksImV4cCI6MTY1NDI1MDA4OSwiYXpwIjoiUTdwUVU4akdSQWlPQ0dFcW41NVNUelBQbWV2cTNyc2IiLCJzY29wZSI6IiIsInBlcm1pc3Npb25zIjpbImRlbGV0ZTpjb250YWluZXJzIiwiZGVsZXRlOml0ZW1zIiwiZ2V0OmNvbnRhaW5lcnMiLCJnZXQ6aXRlbXMiLCJwYXRjaDpjb250YWluZXJzIiwicGF0Y2g6aXRlbXMiLCJwb3N0OmNvbnRhaW5lcnMiLCJwb3N0Oml0ZW1zIl19.NrbPQuS0SZ2HcOrr9vsq6qYJvzzjYskLVx_5xZM8eY4XaucHgSKEbDvZGNuJ8cc7_C9kXsChyAJuJ1Vp7DQ_8eQ1x7cB__1WAcH3ZUA8P43ltwtQelLOM550foJFQaUpIPmAC1hxpv2_ueJL87QaRqcwWcnRKEUSSvDjiT_IjKV-5mXqze_gJ6AiK3tAU7A0ps0nlCYtJ7wcwAmkAeJUqJjTpVYOjROAEv7IYIbHOrAeFkzt6Jes_0lfxrF0E0gYyRhMZuULP-LxnJGScuOOliH8jI8OHbsGcozYbMIEIroS-x4lSM7hWkt7oMal6odNMTs7M6s4yHogExsA8UICzQ",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          console.log("API returned, result:");
          console.log(result);
          console.log("API returned, success:" + result.success);
          console.log("API returned, code:" + result.code);
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
          console.log(error);
        }
      );
  }

  if (success) {
    console.log("finish and display containers list");
    const containersArray = Object.entries(containers);
    console.log(containersArray);
    // eslint-disable-next-line react/jsx-key
    const containersList = containersArray.map((cont) => (
      <li key={cont[0]}>
        {cont[1]}{" "}
        <Link to={`/container_form_edit/${cont[0]}`} path={cont[0]}>
          Edit
        </Link>
      </li>
    ));
    return <ul>{containersList}</ul>;
  }
  if (expired) {
    console.log("display token expired message");
    return <h3>Session expired - please login again</h3>;
  }
  if (empty) {
    console.log("display list empty message");
    return (
      <h3>The list returned was empty - there are currently no containers</h3>
    );
  }
  console.log("display waiting/failed message (", success, expired, empty, ")");

  return (
    <div>
      <h3>Waiting for results...</h3>
      <h4>and/or something went wrong - sack the coder!</h4>
    </div>
  );
};

export default ContainersList;
