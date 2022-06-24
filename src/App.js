//import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage.jsx";
import NewContainerForm from "./NewContainerForm.jsx";
import NewItemForm from "./NewItemForm.jsx";
import DeleteContainer from "./DeleteContainer.jsx";
import DeleteItem from "./DeleteItem.jsx";

const App = () => {
  return (
    <Router basename="/inventorySite">
      <header>
        <h1 className="main_title">Inventory App</h1>
      </header>
      <Routes>
        {
          //<Route path="/new_item_form" element={<NewItemForm />} />
        }

        {/*<Route
          path="/container_form_edit/:id"
          element={
            <div>
              <Homepage />
              <NewContainerForm />
            </div>
          }
        />*/}
        {/*<Route path="/:accessToken" element={<Homepage />} />*/}
        <Route path="/" element={<Homepage />}>
          <Route path="item_form_new" element={<NewItemForm />} />
          <Route path="item_form_edit/:id" element={<NewItemForm />} />
          <Route path="items/delete/:id" element={<DeleteItem />} />

          <Route path="container_form_new" element={<NewContainerForm />} />
          <Route
            path="container_form_edit/:id"
            element={<NewContainerForm />}
          />
          <Route path="containers/delete/:id" element={<DeleteContainer />} />
        </Route>
      </Routes>
    </Router>
  );
};

render(<App />, document.getElementById("root")); //will change in React18
//render(React.createElement(App), document.getElementById("root")); //will change in React18
