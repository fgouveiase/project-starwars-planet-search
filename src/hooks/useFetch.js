import { useState } from 'react';

function useFetch() {
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState(null);

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
    errors,
    apiPlanet,
  };
}

export default useFetch;
