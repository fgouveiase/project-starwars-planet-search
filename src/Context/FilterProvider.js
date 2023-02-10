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
    column: 'population',
    comparison: 'maior que',
    valueInitial: '0',
  });

  useEffect(() => {
    setmatchFilterPlanets(filterPlanets(planets, search));
  }, [planets, search]);

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
    handleClick,
    handleChange,
  }), [search, matchFilterPlanets, filterByValue]);

  return (
    <FilterContext.Provider value={ values }>
      { children }
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {}.isRequired;

export default FilterProvider;
