import AppNav from "./AppNav";
// import { styles } from "./Sidebar.module.css"; //doesn't work
import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import { Outlet } from "react-router-dom";
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />{" "}
      {/* this is where the nested route component will displayed when you specify you URL */}
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
