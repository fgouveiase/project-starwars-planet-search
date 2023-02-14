import { useState, useMemo, useContext, useEffect } from 'react';
import FilterContext from './FilterContext';
import useFilter from '../hooks/useFilter';
import PlanetsContext from './PlanetsContext';

function FilterProvider({ children }) {
  const [matchFilterPlanets, setmatchFilterPlanets] = useState([]);
  const [search, setSearch] = useState('');
  const { filterPlanets, filterByNumberValue } = useFilter();
  const { planets } = useContext(PlanetsContext);
  const [filterByValue, setFilterByValue] = useState({
    columnFilter: 'population',
    comparison: 'maior que',
    valueInitial: '0',
  });
  const [sortDirection, setSortDirection] = useState({ order: { column: '', sort: '' } });

  useEffect(() => {
    setmatchFilterPlanets(filterPlanets(planets, search));
  }, [planets, search]);

  useEffect(() => {
    const sortPlanets = matchFilterPlanets.sort((planet1, planet2) => {
      const { order: { column, sort: direction } } = sortDirection;
      const valueDirection = { ASC: Infinity, DESC: -Infinity };
      const comparingNumber1 = Number(planet1[column]) || valueDirection[direction];
      const comparingNumber2 = Number(planet2[column]) || valueDirection[direction];

      return direction === 'ASC'
        ? comparingNumber1 - comparingNumber2
        : comparingNumber2 - comparingNumber1;
    });

    setmatchFilterPlanets([...sortPlanets]);
  }, [sortDirection]);

  const handleClick = () => {
    setmatchFilterPlanets(filterByNumberValue(filterByValue, matchFilterPlanets));
  };

  const handleChange = ({ target }) => {
    setFilterByValue({
      ...filterByValue,
      [target.name]: target.value,
    });
  };

  const values = useMemo(() => ({
    search,
    setSearch,
    matchFilterPlanets,
    filterByValue,
    setFilterByValue,
    handleClick,
    handleChange,
    // renderFilter,
    setSortDirection,
  }), [search, matchFilterPlanets, filterByValue], sortDirection);

  return (
    <FilterContext.Provider value={ values }>
      { children }
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {}.isRequired;

export default FilterProvider;
