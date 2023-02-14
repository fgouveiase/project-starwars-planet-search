import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from "@testing-library/user-event";
import testData from "../../cypress/mocks/testData"
import { act } from 'react-dom/test-utils';

  
describe('Testa Table', () => {
  beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(testData),
      });
    });
  test('filtros maior que e menor que', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(global.fetch).toBeCalled();
    const filterColumn = screen.getByTestId('column-filter');
    const optionColumn = screen.getAllByRole('option', { name: /population/i})[0];
    const filterComparison = screen.getByTestId('comparison-filter');
    const optionComparison = screen.getByRole('option', { name: /maior que/i});
    const filterValue = screen.getByTestId('value-filter');
    const filterBtn = screen.getByTestId('button-filter');

    userEvent.selectOptions(filterColumn, optionColumn);
    userEvent.selectOptions(filterComparison, optionComparison);
    userEvent.type(filterValue, '10000');
    userEvent.click(filterBtn);
    userEvent.clear(screen.getByTestId('value-filter'));
    userEvent.selectOptions(screen.getByTestId('column-filter'), screen.getAllByRole('option', { name: /rotation_period/i})[0]);     
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), screen.getByRole('option', { name: /menor que/i}));
    userEvent.type(screen.getByTestId('value-filter'), '10');
    userEvent.click(screen.getByTestId('button-filter'));
    userEvent.clear(screen.getByTestId('value-filter'));
  })
  test('Se o input de pesquisa é renderizado', () => {
    render(<App />);
    const searchInput = screen.getByTestId('name-filter');
    expect(searchInput).toBeInTheDocument();
});
  test('verifica filtros com valores numéricos', async() => {
    await act(async () => {
      render(<App />);
    });
    expect(global.fetch).toBeCalled();
    const columnFilter = screen.getByTestId('column-filter');
    const compareFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');

    expect(columnFilter).toBeInTheDocument();
    expect(compareFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
    expect(btnFilter).toBeInTheDocument();
  });
  test('Se filtra corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
    render(<App />);
    const columnFilterInput = screen.getByTestId('column-filter');
    const comparisonFilterInput = screen.getByTestId('comparison-filter');
    const valueFilterInput = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnFilterInput, 'rotation_period');
    userEvent.selectOptions(comparisonFilterInput, 'menor que');
    userEvent.type(valueFilterInput, '18');
    userEvent.click(filterButton);

    const planetFiltered = await screen.findByRole('cell', {
      name: /bespin/i
    })

    expect(planetFiltered).toBeInTheDocument();
});
  test('testa o filtro igual a', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(global.fetch).toBeCalled();
    const selectColumn = screen.getByTestId('column-filter');
    const optionColumn = screen.getAllByRole('option', { name: /population/i})[0];
    const selectComparison = screen.getByTestId('comparison-filter');
    const optionComparison = screen.getByRole('option', { name: /igual a/i});
    const optionValue = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter');
    userEvent.selectOptions(selectColumn, optionColumn);
    userEvent.selectOptions(selectComparison, optionComparison);
    userEvent.type(optionValue, '4500000000');
    userEvent.click(filterButton);
  });
  test('input asc, dec e button sao renderizados', async () => {
    await act(async () => {
      render(<App />);
    });
    const inputAsc = screen.getByTestId('column-sort-input-asc');
    expect(inputAsc).toBeInTheDocument();

    const inputDec =  screen.getByTestId('column-sort-input-desc');
    expect(inputDec).toBeInTheDocument();

    const sortBtn = screen.getByTestId('column-sort-button');
    expect(sortBtn).toBeInTheDocument();
  })
  test('filtro populacao em ordem crescente funciona', async () => { 
    await act(async () => {
      render(<App />);
    });
    const inputAsc = screen.getByTestId('column-sort-input-asc');
    const sortBtn = screen.getByTestId('column-sort-button');
    userEvent.selectOptions(
      screen.getByTestId('column-sort'),
      screen.getAllByText(/population/i)[1],
    ); 
    userEvent.click(inputAsc);
    userEvent.click(sortBtn);

    const planetName = screen.getByText(/tatooine/i)
    expect(planetName).toBeInTheDocument();
  });
  test('filtro em diametro decrescente funciona', async () => { 
    await act(async () => {
      render(<App />);
    });
    const inputDec = screen.getByTestId('column-sort-input-desc');
    const sortBtn = screen.getByTestId('column-sort-button');
    userEvent.selectOptions(
      screen.getByTestId('column-sort'),
      screen.getAllByText(/diameter/i)[1],
    ); 
    userEvent.click(inputDec);
    userEvent.click(sortBtn);
    const planetName = screen.getByText(/bespin/i);
    expect(planetName).toBeInTheDocument();
  });
  test('ordenação do surface water de forma descescente', async () => { 
    await act(async () => {
      render(<App />);
    });
    const inputDec = screen.getByTestId('column-sort-input-desc');
    const sortBtn = screen.getByTestId('column-sort-button');
    userEvent.selectOptions(
      screen.getByTestId('column-sort'),
      screen.getAllByText(/surface_water/i)[1],
    ); 
    userEvent.click(inputDec);
    userEvent.click(sortBtn);
    const planetName = screen.getByText(/Kamino/i);
    expect(planetName).toBeInTheDocument();
  });
  test('ordenação do periodo de rotação de forma crescente', async () => { 
    await act(async () => {
      render(<App />);
    });
    const asc = screen.getByTestId('column-sort-input-asc');
    const sortButton = screen.getByTestId('column-sort-button');
    userEvent.selectOptions(
      screen.getByTestId('column-sort'),
      screen.getAllByText(/orbital_period/i)[1],
    ); 
    userEvent.click(asc);
    userEvent.click(sortButton);

    const planetName = screen.getByText(/naboo/i);
    expect(planetName).toBeInTheDocument();
  });
  test('ordenação do surface water de forma crescente ', async () => { 
    await act(async () => {
      render(<App />);
    });
    const inputAsc = screen.getByTestId('column-sort-input-asc');
    const sortBtn = screen.getByTestId('column-sort-button');
    userEvent.selectOptions(
      screen.getByTestId('column-sort'),
      screen.getAllByText(/surface_water/i)[1],
    ); 
    userEvent.click(inputAsc);
    userEvent.click(sortBtn);

    const planetName = screen.getByText(/Yavin IV/i);
    expect(planetName).toBeInTheDocument();
  });
});