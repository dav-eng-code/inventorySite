import { Link, Outlet, useLocation } from "react-router-dom";
//import Pet from "./component.jsx";
//import SearchParams from "./SearchParams.jsx";
import ItemsList from "./ItemsList.jsx";
import ContainersList from "./ContainersList.jsx";
import { useState, useEffect } from "react";
//import { useCallback } from "react";

const Homepage = () => {
  const { hash } = useLocation();
  let accessToken = ""; //hash === "" ? undefined : hash;
  const LOGIN_URL =
    "https://dav-eng-code-testing.eu.auth0.com/authorize?audience=https://productivity-inventory.herokuapp.com/&response_type=token&client_id=Q7pQU8jGRAiOCGEqn55STzPPmevq3rsb&redirect_uri=http://localhost:1234/";
  //const LOGOUT_URL =    "https://dav-eng-code-testing.eu.auth0.com/v2/logout?client_id=Q7pQU8jGRAiOCGEqn55STzPPmevq3rsb&returnTo=http://localhost:1234/";
  const API_URL = "https://productivity-inventory.herokuapp.com";
  //let API_REQUEST_HEADERS = {};

  const [apiRequestHeaders, setApiRequestHeaders] = useState({});
  const [apiChanged, setApiChanged] = useState(false);

  console.log("Start functional component (Homepage) render...");
  console.log("check current state of apiRequestHeaders: ", apiRequestHeaders);

  const handleChange = (val) => {
    setApiChanged(val);
  };

  if (hash !== "" && accessToken !== hash) {
    console.log(
      "setting request headers in local storage: ",
      apiRequestHeaders
    );
    window.localStorage.setItem(
      "reqHeaderLocalStorage",
      JSON.stringify(apiRequestHeaders)
    );
  }

  let getAccessToken = () => {
    if (accessToken !== hash) {
      console.log("extracting token");
      accessToken = hash;
      let extractedToken = accessToken.replace("#access_token=", "");
      extractedToken = extractedToken.replace(/&.*/, "");
      console.log("token: ", extractedToken);
      console.log("setting state");
      setApiRequestHeaders({
        Authorization: `Bearer ${extractedToken}`,
        "Content-Type": "application/json",
      });
      console.log("page should now re-render");
    }
  };

  useEffect(() => {
    console.log("running effect");
    !(hash === "") ? getAccessToken() : console.log("no!!!"), [];
    console.log(
      "check current state of apiRequestHeaders: ",
      apiRequestHeaders
    );
  }, [hash]);

  useEffect(() => {
    console.log("getting request headers from local storage...");
    let fromLocalStorage = window.localStorage.getItem("reqHeaderLocalStorage");
    console.log("got: ", fromLocalStorage);
    if (Object.keys(JSON.parse(fromLocalStorage)).length !== 0) {
      setApiRequestHeaders(JSON.parse(fromLocalStorage));
    }
    console.log("this is what we got: ", apiRequestHeaders);
  }, []);
  //console.log("current access token: ", accessToken);
  console.log("request header: ", JSON.stringify(apiRequestHeaders));
  console.log(Object.keys(apiRequestHeaders).length == 0);
  console.log("about to return page content....");
  return (
    <div>
      <a href={LOGIN_URL}>Login</a>
      {/*<a href={LOGOUT_URL}>Logout</a>*/}
      {Object.keys(apiRequestHeaders).length !== 0 &&
      apiRequestHeaders !== null ? (
        <div>
          {console.log("loading all elements")}
          <h1 className="items-list">All Items</h1>
          <Link to={"item_form_new"}>Add Item</Link>
          <ItemsList
            API_URL={API_URL}
            API_REQUEST_HEADERS={apiRequestHeaders}
            apiChangedFlag={apiChanged}
          />
          <h1 className="containers-list">All Containers</h1>
          <Link to={"container_form_new"}>Add Container</Link>
          <ContainersList
            API_URL={API_URL}
            API_REQUEST_HEADERS={apiRequestHeaders}
            apiChangedFlag={apiChanged}
          />
          {/*<Pet dogName="a massive great big dog" />
      <Pet dogName="a massive great big dog" />
      <SearchParams />*/}
          <Outlet
            context={[API_URL, apiRequestHeaders, apiChanged, handleChange]}
          />
        </div>
      ) : (
        <h2>Please log in</h2>
      )}
    </div>
  );
};

{
  /*
   * Next steps
   * Create form for creating containers
   * What happens when selecting a container?
   */
}

export default Homepage;
