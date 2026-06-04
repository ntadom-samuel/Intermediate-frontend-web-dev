import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";
function Header() {
  return (
    <header className="border-b-1 flex items-center justify-between border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <Link className="font-serif tracking-widest" to="/">
        {/* <Link className="tracking-[.25rem]" to="/"> */}
        Fast React Pizza CO.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
