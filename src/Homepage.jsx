import { Link } from "react-router-dom";
//import Pet from "./component.jsx";
//import SearchParams from "./SearchParams.jsx";
import ItemsList from "./ItemsList.jsx";
import ContainersList from "./ContainersList.jsx";

const Homepage = () => {
  return (
    <div>
      <h1 className="items-list">All Items</h1>
      <Link to={"new_item_form"}>Add Item</Link>
      <ItemsList />
      <h1 className="containers-list">All Containers</h1>
      <Link to={"container_form_new"}>Add Container</Link>
      <ContainersList />
      {/*<Pet dogName="a massive great big dog" />
      <Pet dogName="a massive great big dog" />
      <SearchParams />*/}
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
