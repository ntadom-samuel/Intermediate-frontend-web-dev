import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import AppNav from "../components/AppNav";
function Home() {
  return (
    <div>
      <PageNav />
      <AppNav />

      <h1 className="test">Worldwise</h1>

      {/* We can use the link component to link to routes together */}
      <Link to="/app">Go to the app</Link>

      {/* <a href="/pricing">Pricing</a>{" "} */}
      {/* This creates a link to pricing, but not in the way we want */}
    </div>
  );
}

export default Home;
