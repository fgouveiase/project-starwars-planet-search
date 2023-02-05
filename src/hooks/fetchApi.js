import { useState } from "react";

function fetchAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiPlanet = async (url) => {
    try {
      setLoading(true);

      const response = await fetch(url);

      const json = await response.json();

      return json;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    apiPlanet,
  };
}

export default fetchAPI;
