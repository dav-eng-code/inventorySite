//import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from "./Homepage.jsx";
import NewContainerForm from "./NewContainerForm.jsx";
import NewItemForm from "./NewItemForm.jsx";

const App = () => {
  return (
    <Router>
      <header>Inventory App</header>
      <Routes>
        <Route path="/new_item_form" element={<NewItemForm />} />
        <Route path="/container_form_new" element={<NewContainerForm />} />
        <Route path="/container_form_edit/:id" element={<NewContainerForm />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
      <Link to="/">Go to homepage</Link>
    </Router>
  );
};

render(<App />, document.getElementById("root")); //will change in React18
//render(React.createElement(App), document.getElementById("root")); //will change in React18
