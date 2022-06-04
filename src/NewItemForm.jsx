import {
  useParams,
  Link,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { useState, useEffect } from "react";

const NewItemForm = () => {
  const [API_URL, apiRequestHeaders, handleChange] = useOutletContext();
  const API_REQUEST_HEADERS = apiRequestHeaders;
  const [details, setDetails] = useState({});
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  let navigate = useNavigate();

  console.log("details are:  ", details);

  useEffect(() => {
    getItemDetails();
    setEditMode(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function getItemDetails() {
    console.log("name set: ", details.name);
    console.log("edit mode: ", editMode);
    console.log("get details is running........");
    if (id && !editMode) {
      setEditMode(true);
      console.log("fetching item details for id: ", id);
      console.log(API_URL, API_REQUEST_HEADERS);
      fetch(`${API_URL}/items/${id}`, {
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
        });
    }
  }
  getItemDetails();

  function postItem(e) {
    console.log(e);
    console.log(e.target);
    console.log(e.target[0].value);
    let name = e.target[0].value;
    let location = e.target[1].value;
    let value = e.target[2].value;
    let status = e.target[3].value;
    status = status.length !== 0 ? e.target[3].value : "not set";

    let data = `{"name":"${name}","location":"${location}","value":${value},"status":"${status}"}`;
    fetch(`${API_URL}/items/add`, {
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
    navigate("/");
  }

  function patchItem(e) {
    console.log("NEW ITEM FORM - patch item function");
    console.log(e);
    console.log(e.target);
    console.log(e.target[0].value);
    let name = e.target[0].value;
    let location = e.target[1].value;
    let value = e.target[2].value;
    let status = e.target[3].value;
    console.log("status length", status.length);
    status = status.length !== 0 ? e.target[3].value : "not set";

    let data = `{"id":${id},"name":"${name}","location":"${location}","value":${value},"status":"${status}"}`;
    fetch(`${API_URL}/items/update`, {
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
    <div>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          editMode ? patchItem(e) : postItem(e);
        }}
      >
        {
          //returns a label and input for each label name
          ["Name", "Location", "Value", "Status"].forEach((labelName) => {
            console.log("label: ", labelName);
            let labelLCase = labelName.toLowerCase();
            //function for onChange event changes current input while maintaining current value of other fields
            let nameValue = (e) => {
              return labelName === "Name" ? e.target.value : details.name;
            };
            let locationValue = (e) => {
              return labelName === "Location"
                ? e.target.value
                : details.location;
            };
            let valueValue = (e) => {
              return labelName === "Value" ? e.target.value : details.value;
            };
            let statusValue = (e) => {
              return labelName === "Status" ? e.target.value : details.status;
            };
            rows.push(
              <label htmlFor={labelLCase}>
                {console.log(labelName)}
                {labelName}
                <input
                  type="text"
                  name={labelLCase}
                  id={labelLCase}
                  value={
                    labelName === "Status"
                      ? "functionality TBC"
                      : details[labelLCase]
                  }
                  disabled={labelName === "Name" ? editMode : false}
                  //requires onChange event to allow overriding initial value set above
                  onChange={(e) =>
                    setDetails({
                      name: nameValue(e),
                      location: locationValue(e),
                      value: valueValue(e),
                      status: statusValue(e),
                    })
                  }
                />
              </label>
            );
          })
        }
        {rows}
        {editMode ? (
          <button type="submit">Update Container</button>
        ) : (
          <button type="submit">Create Container!</button>
        )}
      </form>

      <Link to="/">Close</Link>

      <h2>need to create form inlcuding drop down to select container</h2>
      <ul>
        <li>provide &quot;name&quot;</li>
        <li>provide &quot;location&quot;</li>
        <li>provide &quot;value&quot;</li>
      </ul>
    </div>
  );
};

export default NewItemForm;
