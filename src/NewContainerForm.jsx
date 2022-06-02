import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";

const API_URL = "https://productivity-inventory.herokuapp.com";
const API_REQUEST_HEADERS = {
  Authorization:
    "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IktCaWoyb3V1TEJ1RVNrblRUWlhrcSJ9.eyJpc3MiOiJodHRwczovL2Rhdi1lbmctY29kZS10ZXN0aW5nLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MjQ2ZGNiZGYwYWE1NTAwNmFjNzQ4NWYiLCJhdWQiOiJodHRwczovL3Byb2R1Y3Rpdml0eS1pbnZlbnRvcnkuaGVyb2t1YXBwLmNvbS8iLCJpYXQiOjE2NTQxNzA0NzYsImV4cCI6MTY1NDI1Njg3NiwiYXpwIjoiUTdwUVU4akdSQWlPQ0dFcW41NVNUelBQbWV2cTNyc2IiLCJzY29wZSI6IiIsInBlcm1pc3Npb25zIjpbImRlbGV0ZTpjb250YWluZXJzIiwiZGVsZXRlOml0ZW1zIiwiZ2V0OmNvbnRhaW5lcnMiLCJnZXQ6aXRlbXMiLCJwYXRjaDpjb250YWluZXJzIiwicGF0Y2g6aXRlbXMiLCJwb3N0OmNvbnRhaW5lcnMiLCJwb3N0Oml0ZW1zIl19.oPuEFtpsh8CPrimDQhLp0kuU3gtPVcUyCHB0BZxSXHQQ2ByUTAdfgBCLkNSvOvCOBKJWgOEjtby9mgdXbtcSunvxlqEOEHf-4KWvSHBHER2vGNFMFjU9OYJ27WKOx_-vD8U7o70_HvfxBSa_YMBmlXY02O4q1AqRl6QK1P5G-0ARaHFJZqAy7SGOYztGpScWIMbGiUUZ0QPEGq6reUaYHAC_7S8f2kSFH5l7-pWe5RPSvIotaSWnnHQIXMtIxlCSyJe7nqtC4_73WV_h_O1r-tyvDCMQLwrS_y9UIr5S8eeTKZ-QOB21D-sArVBM2R4WwTOR7jnPNKn4Gxj9KOhcJA",
  "Content-Type": "application/json",
};

const NewContainerForm = () => {
  const [details, setDetails] = useState({});
  const { id } = useParams();
  let navigate = useNavigate();

  if (id && !details.name) {
    console.log("fetching container details for id: ", id);
    fetch(`${API_URL}/containers/${id}`, {
      headers: API_REQUEST_HEADERS,
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setDetails(result);
        return result;
      });
  }

  function postContainer(e) {
    console.log(e);
    console.log(e.target);
    console.log(e.target[0].value);
    let name = e.target[0].value;
    let location = e.target[1].value;
    let container_value = e.target[2].value;

    let data = `{"name":"${name}","location":"${location}","container_value":${container_value}}`;
    fetch(`${API_URL}/containers/add`, {
      headers: API_REQUEST_HEADERS,
      method: "POST",
      body: data,
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log(result);
      });
    navigate("/"); //code to post container fields to api";
  }

  return (
    <div>
      <h1>{id}</h1>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          postContainer(e);
        }}
      >
        <label htmlFor="name">
          Name
          <input type="text" name="name" id="name" value={details.name} />
        </label>
        <label htmlFor="location">
          Location
          <input
            type="text"
            name="location"
            id="location"
            value={details.location}
          />
        </label>
        <label htmlFor="container_value">
          Value
          <input
            type="text"
            name="container_value"
            id="container_value"
            value={details.container_value}
          />
        </label>
        <button type="submit">Create Container!</button>
      </form>
    </div>
  );
};

export default NewContainerForm;
