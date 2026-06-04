//TODO: fix "use your position" functionality
import { useNavigate, useSearchParams } from "react-router-dom"; //this allows us access our URL queries
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useMemo, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";
function Map() {
  const navigate = useNavigate();
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => {
    //Usually, effects are used for synchronization
    //this is used to recenter our map each time we select a new city
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
      navigate(
        `form?lat=${geolocationPosition?.lat}&lng=${geolocationPosition?.lng}`
      );
    }
    //I'm not adding nvigate because it renders this everytime
  }, [geolocationPosition]);
  return (
    <div
      className={styles.mapContainer}
      // onClick={() => {
      //   navigate("form");
      // }}
    >
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

//Custom Components
function ChangeCenter({ position }) {
  //used to center our map on the current city
  const map = useMap(); //this is a leaflet hook that returns the current instance of our map
  map.setView(position); //setView is used to center our map on a particular position

  return null;
}

function DetectClick() {
  //Vid 218: Programatic Navigation with useNavigate. This helps us navigatewithout needing to click a link
  const navigate = useNavigate();

  //useMapEvents is a leaflet library used to detect clicks on the map
  useMapEvents({
    //click is a property that stores a callback function. It stores the current event
    click: (e) => {
      // console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`); //this navigates to form, but also adds a query to the form URL
    },
  });

  return null;
}

export default Map;
