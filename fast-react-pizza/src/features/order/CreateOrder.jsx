import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import EmptyCart from "../cart/EmptyCart";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const dispatch = useDispatch();
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((store) => store.user);
  const isLoadingAddress = addressStatus === "loading";
  //console.log(errorAddress);

  const navigation = useNavigation();
  const isSubmiting = navigation.state === "submitting";
  const formErrors = useActionData(); //this gives us acces to the data the action linked to this component returns

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  // console.log(cart);

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* Vid 291: Making API requests with React-Router's Actions and Form
      Import the Form component from react router */}
      {/* <Form method="POST" action="/order/new"> */}
      {/* The value in the action attribute is the path that this form should be submitted to. The expression below works the same because react-router maps to the closest path */}
      {/* This works for PUT,PATCH,and POST requests */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          {/* TODO: figure out how flex basis , wrap, and grow work. Rule of thumb is to not use the width property in flex items. Instead, we use the basis property */}
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
          </div>
          {formErrors?.phone && (
            <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
              {formErrors.phone}
            </p>
          )}
        </div>
        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>

          {!position.latitude && !position.logitude && (
            <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
              <Button
                type="small"
                disabled={isLoadingAddress}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          {/* Vid 303: styling a checkbox */}
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>
        <div>
          {/* Vid 291: This is a special kind of input that allows us put data into our actions. When we submit the form, cart will automatically be added into our actions */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
          {/* Vid 302-9:00: focus, hover, and ring */}
          <Button type="primary" disabled={isSubmiting}>
            {isSubmiting
              ? `Placing Order`
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

//vid 291: creating an action
//As soon as we submit the form above, it will send a request which will be intercepted by the action below
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData); //this converts formData to an object
  // console.log(data);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    //Vid 321:changed this from 'on' to 'true'
    priority: data.priority === "true",
  };

  //Vid 292: Error handling
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  //Vid 321: using redux's action functions in a non-component function.
  //Since we cant use useDispatch in a non-component function we have to use the dispatch methoc on the store object directly as shown below. But Do Not Overuse it
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`); //this function from react-router is a way of redirecting to a new page in functions that are not componenets
}

export default CreateOrder;
