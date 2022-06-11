import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";

const DeleteItem = () => {
  const [API_URL, apiRequestHeaders, handleChange] = useOutletContext();
  const API_REQUEST_HEADERS = apiRequestHeaders;
  const { id } = useParams();
  const [details, setDetails] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    getItemDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function getItemDetails() {
    console.log("name set: ", details.name);
    console.log("get details is running........");
    console.log("fetching item details for id: ", id);
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
        console.log(details.name);
        console.log(details);
        return result;
      });
  }

  function sendDeleteRequest() {
    console.log("sending delete request for id: ", id);
    fetch(`${API_URL}/items/${id}`, {
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
    <div className="confirmDeletion">
      Are you sure you want to delete the following item? <br />
      ID:<span className="details">{details.id}</span> <br />
      Name:
      <span className="details">{details.name}</span> <br />
      Location: <span className="details">{details.location}</span>
      <br />
      Item Value:<span className="details">{details.value}</span>
      <br />
      <button onClick={() => sendDeleteRequest()}>Confirm</button>
      <button onClick={() => navigate("/")}>Cancel</button>
    </div>
  );
};

export default DeleteItem;
