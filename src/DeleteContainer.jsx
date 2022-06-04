import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";

// const API_URL = "https://productivity-inventory.herokuapp.com";
// const API_REQUEST_HEADERS = {
//   Authorization:
//     "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IktCaWoyb3V1TEJ1RVNrblRUWlhrcSJ9.eyJpc3MiOiJodHRwczovL2Rhdi1lbmctY29kZS10ZXN0aW5nLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MjQ2ZGNiZGYwYWE1NTAwNmFjNzQ4NWYiLCJhdWQiOiJodHRwczovL3Byb2R1Y3Rpdml0eS1pbnZlbnRvcnkuaGVyb2t1YXBwLmNvbS8iLCJpYXQiOjE2NTQyNTAzNDIsImV4cCI6MTY1NDMzNjc0MiwiYXpwIjoiUTdwUVU4akdSQWlPQ0dFcW41NVNUelBQbWV2cTNyc2IiLCJzY29wZSI6IiIsInBlcm1pc3Npb25zIjpbImRlbGV0ZTpjb250YWluZXJzIiwiZGVsZXRlOml0ZW1zIiwiZ2V0OmNvbnRhaW5lcnMiLCJnZXQ6aXRlbXMiLCJwYXRjaDpjb250YWluZXJzIiwicGF0Y2g6aXRlbXMiLCJwb3N0OmNvbnRhaW5lcnMiLCJwb3N0Oml0ZW1zIl19.D7yReZkTyuHSzTB09xFhJvS6kd4lUo6UanBmlSb0lT3vyeP4SI40d_fcGuhixPbQXir3hjowrMDBsJ29T_byzoeQ2yeQwIQOt5DQlTGh_L_ivdZgl9O627h6I4P5cT9O7ZG5addixL-3Oaf21teVX9i1NKLF_sEcfMVa-mitM5DKjkhCOn4JDIJ8d-Z82s3zDzEg3JXVkyXs-tNE6TWZDU7xa3ZwNe-Rc9ci2MQRo-SkhTuOOUvbQGJ46VjpW7tmQbb1JoRKJq6pj9zO71l-IgBpStAynIejgepoQ-fKsItKxJ6dMMoJaRdIItGl7LefTs5Ie2CAcYCiKM2tXUb9IA",
//   "Content-Type": "application/json",
// };

const DeleteContainer = () => {
  const [API_URL, apiRequestHeaders, handleChange] = useOutletContext();
  const API_REQUEST_HEADERS = apiRequestHeaders;
  const { id } = useParams();
  const [details, setDetails] = useState({});
  //const [apiChanged, setApiChanged] = useState(false);
  let navigate = useNavigate();

  {
    /*useEffect(() => {
    setApiChangedFlag(apiChanged);
  }, [apiChanged, setApiChangedFlag]);*/
  }

  //   function handleChange(apiChanged) {
  //     onChange(apiChanged);
  //   }

  useEffect(() => {
    getContainerDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function getContainerDetails() {
    console.log("name set: ", details.name);
    console.log("get details is running........");

    console.log("fetching container details for id: ", id);
    fetch(`${API_URL}/containers/${id}`, {
      headers: API_REQUEST_HEADERS,
      method: "GET",
    })
      .then((res) => {
        console.log("got res, extract json");
        return res.json();
      })
      .then((result) => {
        console.log("set details...");
        setDetails(result);
        console.log(details.name);
        console.log(details);
        return result;
      });
  }

  function sendDeleteRequest() {
    console.log("sending delete request for id: ", id);
    fetch(`${API_URL}/containers/${id}`, {
      headers: API_REQUEST_HEADERS,
      method: "DELETE",
    })
      .then((res) => {
        console.log("got res, extract json");
        return res.json();
      })
      .then((result) => {
        console.log("check for success...");
        console.log(result.success);
        handleChange(result.success);
        navigate("/");
        return result;
      });
  }

  return (
    <div>
      Are you sure you want to delete the following container? <br />
      ID:<span className="details">{details.id}</span>, Name:
      <span className="details">{details.name}</span>, Location:{" "}
      <span className="details">{details.location}</span>,<br />
      Container Value:<span className="details">{details.container_value}</span>
      ,<br />
      Items:<span className="details">{details.items}</span>,<br />
      Total Value:<span className="details">{details.total_value}</span> <br />
      <button onClick={() => sendDeleteRequest()}>Confirm</button>
      <button onClick={() => navigate("/")}>Cancel</button>
    </div>
  );
};

export default DeleteContainer;
