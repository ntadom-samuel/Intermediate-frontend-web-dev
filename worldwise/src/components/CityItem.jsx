//City Item is an  Item in the intial list of cities before it is clicked
import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;
  console.log(position);

  function handleClick(e) {
    e.preventDefault(); //this prevents the navlink element from working. Watch vid 236 1:55-2:06
    deleteCity(id);
  }

  return (
    <li>
      {/* We pass in only the id in to and the react router forms a path of this form 'currentPath/:id'. Vid 216 */}
      {/* Vid 217, Adding queries to the URL */}
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
