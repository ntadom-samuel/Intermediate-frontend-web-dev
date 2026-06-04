import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";
import User from "../components/User";

function AppLayout() {
  return (
    <div className={styles.app}>
      {/* The Outlet component is used in Sidebar, one level deeper */}
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
