function useFilter() {
  const filterPlanets = (array, search) => array.filter(({ name }) => name.toUpperCase()
    .includes(search.toUpperCase()));

  const filterByNumberValue = ({ column, comparison, valueInitial }, array) => (
    array.filter((planet) => {
      const numberValue = parseFloat(valueInitial);
      const columnNumberValue = parseFloat(planet[column]);
      switch (comparison) {
      case 'igual a':
        return columnNumberValue === numberValue;
      case 'maior que':
        return columnNumberValue > numberValue;
      case 'menor que':
        return columnNumberValue < numberValue;
      default:
        throw new Error();
      }
    }));
  return {
    filterPlanets,
    filterByNumberValue,
  };
}

export default useFilter;
