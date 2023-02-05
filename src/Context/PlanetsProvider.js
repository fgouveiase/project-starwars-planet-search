import { useEffect, useState, useMemo } from "react";
import fetchAPI from "../hooks/fetchApi";
import PlanetsContext from "./PlanetsContext";

function PlanetsProvider({ children }) {
  const { loading, error, apiPlanet } = fetchAPI();
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    async function fetch(url) {
      const response = await apiPlanet(url);

      const returnDelete = response.results.map((residents) => {
        delete residents.residents;
        return residents;
      });
      setPlanets(returnDelete);
    }
    fetch("https://swapi.dev/api/planets");
  }, []);

  const values = useMemo(
    () => ({
      loading,
      error,
      planets,
    }),
    [loading, error, planets]
  );

  return (
    <PlanetsContext.Provider value={values}>{children}</PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {}.isRequired;

export default PlanetsProvider;
