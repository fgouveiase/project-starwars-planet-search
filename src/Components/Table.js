import React, { useContext } from 'react';
// import PlanetsContext from '../Context/PlanetsContext';
import FilterContext from '../Context/FilterContext';

function Table() {
  // const { loading, planets } = useContext(PlanetsContext);
  const {
    search,
    setSearch,
    matchFilterPlanets,
    filterByValue: { column, comparison, valueInitial },
    handleClick,
    handleChange,
  } = useContext(FilterContext);

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
          name="column"
          id=""
          data-testid="column-filter"
          value={ column }
          onChange={ handleChange }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
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
          onClick={ handleClick }
        >
          Filtrar

        </button>
      </div>

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
          {matchFilterPlanets?.map((planet) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </>
  );
}

export default Table;
