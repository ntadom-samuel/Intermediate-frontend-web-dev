import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

//Vid 325: updating data without navigation
function UpdateOrder({ order }) {
  //updating data with useFetcher
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make Priority</Button>
    </fetcher.Form>
  );
}

//We use an actio to update the data
export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}

export default UpdateOrder;
