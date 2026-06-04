import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData(); //this is the data from the menu returned below
  // console.log(menu);
  return (
    //Vid 308: the divide class to create lines btw elements
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;

//Vid 288: the useNavigation hook can tell us if our page is idle, loading, or submitting
