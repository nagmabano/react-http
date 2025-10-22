import { useState, useEffect } from "react";
import Places from "./Places.jsx";
import ErrorPage from "./ErrorPage.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const response = await fetch("http://localhost:3000/placessss");
        const resData = await response.json();
        if (!response.ok) {
          throw new Error();
        }
        setAvailablePlaces(resData.places);
      } catch (error) {
        setError({message: error.message || 'Could not fetch places. Please try again later!'});
      }
      setIsFetching(false);
    }
    fetchPlaces();
  }, []);

  if (error) {
    return <ErrorPage title="an error occured" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText={"Fetching places data..."}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
