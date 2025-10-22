import { useEffect } from "react";

function useFetch() {
    useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchUserPlaces();
        setUserPlaces(places);
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch user places. Please try again later!",
        });
      }
      setIsFetching(false);
    }
    fetchPlaces();
  }, []);

}