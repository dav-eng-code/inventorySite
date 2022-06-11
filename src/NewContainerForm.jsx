import {
  useParams,
  Link,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { useState, useEffect } from "react";

// const API_URL = "https://productivity-inventory.herokuapp.com";
// const API_REQUEST_HEADERS = {
//   Authorization:
//     "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IktCaWoyb3V1TEJ1RVNrblRUWlhrcSJ9.eyJpc3MiOiJodHRwczovL2Rhdi1lbmctY29kZS10ZXN0aW5nLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MjQ2ZGNiZGYwYWE1NTAwNmFjNzQ4NWYiLCJhdWQiOiJodHRwczovL3Byb2R1Y3Rpdml0eS1pbnZlbnRvcnkuaGVyb2t1YXBwLmNvbS8iLCJpYXQiOjE2NTQyNTAzNDIsImV4cCI6MTY1NDMzNjc0MiwiYXpwIjoiUTdwUVU4akdSQWlPQ0dFcW41NVNUelBQbWV2cTNyc2IiLCJzY29wZSI6IiIsInBlcm1pc3Npb25zIjpbImRlbGV0ZTpjb250YWluZXJzIiwiZGVsZXRlOml0ZW1zIiwiZ2V0OmNvbnRhaW5lcnMiLCJnZXQ6aXRlbXMiLCJwYXRjaDpjb250YWluZXJzIiwicGF0Y2g6aXRlbXMiLCJwb3N0OmNvbnRhaW5lcnMiLCJwb3N0Oml0ZW1zIl19.D7yReZkTyuHSzTB09xFhJvS6kd4lUo6UanBmlSb0lT3vyeP4SI40d_fcGuhixPbQXir3hjowrMDBsJ29T_byzoeQ2yeQwIQOt5DQlTGh_L_ivdZgl9O627h6I4P5cT9O7ZG5addixL-3Oaf21teVX9i1NKLF_sEcfMVa-mitM5DKjkhCOn4JDIJ8d-Z82s3zDzEg3JXVkyXs-tNE6TWZDU7xa3ZwNe-Rc9ci2MQRo-SkhTuOOUvbQGJ46VjpW7tmQbb1JoRKJq6pj9zO71l-IgBpStAynIejgepoQ-fKsItKxJ6dMMoJaRdIItGl7LefTs5Ie2CAcYCiKM2tXUb9IA",
//   "Content-Type": "application/json",
// };

const NewContainerForm = () => {
  const [API_URL, apiRequestHeaders, handleChange] = useOutletContext();
  const API_REQUEST_HEADERS = apiRequestHeaders;
  const [details, setDetails] = useState({});
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  let navigate = useNavigate();

  // function handleChange(apiChanged) {
  //   onChange(apiChanged);
  // }

  useEffect(() => {
    getContainerDetails();
    setEditMode(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function getContainerDetails() {
    console.log("name set: ", details.name);
    console.log("edit mode: ", editMode);
    console.log("get details is running........");
    if (id && !editMode) {
      // && !details.name && !editMode) {
      setEditMode(true);
      console.log("fetching container details for id: ", id);
      console.log(API_URL, API_REQUEST_HEADERS);
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
  }

  getContainerDetails();

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
        handleChange(result.success);
      });
    navigate("/"); //code to post container fields to api";
  }

  function patchContainer(e) {
    console.log(e);
    console.log(e.target);
    console.log(e.target[0].value);
    let name = e.target[0].value;
    let location = e.target[1].value;
    let container_value = e.target[2].value;

    let data = `{"id":"${id}","name":"${name}","location":"${location}","container_value":${container_value}}`;
    fetch(`${API_URL}/containers/update`, {
      headers: API_REQUEST_HEADERS,
      method: "PATCH",
      body: data,
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log(result);
        handleChange(result.success);
      });
    navigate("/");
  }
  let rows = [];
  return (
    <div className="form_area">
      {
        //<h1>{id}</h1>
        //<h2>{JSON.stringify(details)}</h2>
      }
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          editMode ? patchContainer(e) : postContainer(e);
        }}
      >
        {
          //returns a label and input for each label name
          ["Name", "Location", "Container_Value"].forEach((labelName) => {
            console.log("label: ", labelName);
            let labelLCase = labelName.toLowerCase();
            let nameValue = (e) => {
              labelName === "Name" ? e.target.value : details.name;
            };
            let locationValue = (e) => {
              labelName === "Location" ? e.target.value : details.location;
            };
            let container_valueValue = (e) => {
              labelName === "Container_Value"
                ? e.target.value
                : details.container_value;
            };
            console.log(
              "functions created... ",
              nameValue,
              locationValue,
              container_valueValue
            );
            rows.push(
              <label htmlFor={labelLCase}>
                {labelName}
                <input
                  type="text"
                  name={labelLCase}
                  id={labelLCase}
                  value={details[labelLCase]}
                  disabled={labelName === "Name" ? editMode : false}
                  onChange={(e) =>
                    setDetails({
                      name: nameValue(e),
                      location: locationValue(e),
                      container_value: container_valueValue(e),
                    })
                  }
                />
              </label>
            );
          })
        }
        {rows}
        {/* <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            id="name"
            value={details.name}
            disabled={editMode}
            onChange={(e) =>
              setDetails({
                name: e.target.value,
                location: details.location,
                container_value: details.container_value,
              })
            }
          />
        </label>
        <label htmlFor="location">
          Location
          <input
            type="text"
            name="location"
            id="location"
            value={details.location}
            onChange={(e) =>
              setDetails({
                name: details.name,
                location: e.target.value,
                container_value: details.container_value,
              })
            }
          />
        </label>
        <label htmlFor="container_value">
          Value
          <input
            type="text"
            name="container_value"
            id="container_value"
            value={details.container_value}
            onChange={(e) =>
              setDetails({
                name: details.name,
                location: details.location,
                container_value: e.target.value,
              })
            }
          />
        </label>
          */}
        {editMode ? (
          <button type="submit">Update Container</button>
        ) : (
          <button type="submit">Create Container!</button>
        )}
        <Link to="/">Cancel</Link>
      </form>
    </div>
  );
};

export default NewContainerForm;
