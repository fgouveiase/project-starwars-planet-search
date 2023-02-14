import React, { useContext, useState } from 'react';
// import PlanetsContext from '../Context/PlanetsContext';
import FilterContext from '../Context/FilterContext';

function Table() {
  // const { loading, planets } = useContext(PlanetsContext);
  const {
    search,
    setSearch,
    matchFilterPlanets,
    filterByValue,
    setFilterByValue,
    handleChange,
    handleClick,
    setSortDirection,
  } = useContext(FilterContext);

  const [filterOptionsColumn, setFilterOptionsColumn] = useState({
    population: 'population',
    orbital_period: 'orbital_period',
    diameter: 'diameter',
    rotation_period: 'rotation_period',
    surface_water: 'surface_water' });

  const [columnSortDirection, setcolumnSortDirection] = useState('population');
  const [radioSort, setRadioSort] = useState('');

  const { columnFilter, comparison, valueInitial } = filterByValue;

  const handleFilter = () => {
    handleClick();
    // console.log('remove:', filterOptionsColumn[column]);
    delete filterOptionsColumn[columnFilter];
    setFilterByValue({ ...filterByValue,
      columnFilter: Object.keys(filterOptionsColumn)[0] });
    setFilterOptionsColumn({ ...filterOptionsColumn });
  };

  const columnArray = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

  function renderFilterOptionsColumn(col) {
    return col.map((name) => (
      <option key={ name } value={ name }>{ name }</option>
    ));
  }
  return (

    <>
      <div>
        <input
          type="text"
          value={ search }
          data-testid="name-filter"
          onChange={ ({ target }) => { setSearch(target.value); } }
        />
      </div>

      <div>
        <select
          name="columnFilter"
          id=""
          data-testid="column-filter"
          value={ columnFilter }
          onChange={ handleChange }
        >
          { renderFilterOptionsColumn(Object.keys(filterOptionsColumn)) }
        </select>

        <select
          name="comparison"
          id=""
          data-testid="comparison-filter"
          value={ comparison }
          onChange={ handleChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          name="valueInitial"
          type="number"
          data-testid="value-filter"
          value={ valueInitial }
          onChange={ handleChange }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ handleFilter }
        >
          Filtrar

        </button>
      </div>
      <label htmlFor="column-sort">
        Ordenar
        <select
          id="column-sort"
          name="column"
          onChange={ ({ target: { value } }) => setcolumnSortDirection(value) }
          data-testid="column-sort"
        >
          { renderFilterOptionsColumn(columnArray) }
        </select>
      </label>

      <label htmlFor="ASC">
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          name="sort"
          id="ASC"
          value="ASC"
          onChange={ ({ target: { value } }) => setRadioSort(value) }
        />
        Ascendente
      </label>

      <label htmlFor="DESC">
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          name="sort"
          id="DESC"
          value="DESC"
          onChange={ ({ target: { value } }) => setRadioSort(value) }
        />
        Descendente
      </label>

      <button
        data-testid="column-sort-button"
        onClick={ () => setSortDirection({ order: {
          column: columnSortDirection,
          sort: radioSort,
        } }) }
      >
        Ordenar
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Filmes</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {matchFilterPlanets?.map((planet, i) => (
            <tr key={ `${planet.name}${i}` }>
              { Object.values(planet).map((value, index) => (
                <td
                  key={ `${planet.name}${value}${index}` }
                  data-testid={ planet.name === value && 'planet-name' }
                >
                  { value }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

    </>
  );
}

export default Table;
