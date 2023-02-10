import React from 'react';
import './App.css';
import Table from './Components/Table';
import PlanetsProvider from './Context/PlanetsProvider';
import FilterProvider from './Context/FilterProvider';

function App() {
  return (
    <PlanetsProvider>
      <FilterProvider>
        <Table />
      </FilterProvider>
    </PlanetsProvider>
  );
}

export default App;
