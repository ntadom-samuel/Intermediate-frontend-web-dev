import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./ui/Home";
import Error from "./ui/Error";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import Order, { loader as orderLoader } from "./features/order/Order";
import AppLayout from "./ui/AppLayout";
import { action as updateOrderAction } from "./features/order/UpdateOrder";

//Vid 289: Handling errors with error elements. Note: the error element gets access to the error that occurs
//Errors within nested routes will bubble up to the parent element, so place error elements within each route to handle the errors there

//Vid 285: Using  React Router for Data Fetching: createBrowserRouter
//Each route is defined as an object as shown below
//Import RouterProvider
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      //This is how to implement nested routes
      { path: "/", element: <Home /> },
      {
        path: "/menu",
        element: <Menu />,
        errorElement: <Error />,
        loader: menuLoader,
      },
      { path: "/cart", element: <Cart /> },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction, //this connects our URL with the action
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        errorElement: <Error />,
        loader: orderLoader,
        action: updateOrderAction,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;

//Vid 287: Fetching data with react router
//1. Create an async function that fetches data and returns. That function can go anywhere, but by convention it stays in the component that s displayed in the route that uses it. Call that function loader.
//2. Pass that function into the loader property of the intended route

//Vid 291: Making API requests with React-Router's Actions and Form: see CreateOrder.jsx

//Vid 295: Setting up tailwind CSS
//Use tailwind's documentation-vite to set up tailwind
//Install tailwind's vs code extension-- allows you to see what each style does
//Google tailwinds' pretter extension, go to the github page and install the extension-- sorts the order of the classnames in the way tailwind recommends it
//See preflight to checkout tailwind's base styles
// For this to work,your file should be named prettier.config.cjs
// module.exports = {
//   "plugins": [require("prettier-plugin-tailwindcss")]
// }
