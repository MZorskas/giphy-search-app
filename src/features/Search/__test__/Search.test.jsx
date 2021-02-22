import React from 'react';
import Search from '../Search';
import { render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';

const mockfetchData = jest.fn();

const inputSetup = () => {
  const utils = render(<Search fetchData={mockfetchData} />);
  const input = screen.queryByPlaceholderText('Gifs');
  const form = screen.queryByTestId('search-form');
  return {
    input,
    form,
    ...utils,
  };
};

describe('Search component', () => {
  it('renders with propTypes warning', () => {
    const spy = jest.spyOn(global.console, 'error');

    expect(screen.queryByTestId('search')).not.toBeInTheDocument();
    render(<Search />);
    expect(screen.queryByTestId('search')).toBeInTheDocument();

    expect(spy).toHaveBeenCalled();
  });

  it('renders without propTypes warning', () => {
    const spy = jest.spyOn(global.console, 'error');

    expect(screen.queryByTestId('search')).not.toBeInTheDocument();
    render(<Search fetchData={mockfetchData} />);
    expect(screen.queryByTestId('search')).toBeInTheDocument();

    expect(spy).not.toHaveBeenCalled();
  });

  it('renders and focuses inputField', () => {
    expect(screen.queryByTestId('search')).not.toBeInTheDocument();
    render(<Search fetchData={mockfetchData} />);
    expect(screen.queryByTestId('search')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Gifs')).toHaveFocus();
  });

  it('fires handleSubmit function on submit', () => {
    const { input } = inputSetup();
    expect(screen.queryByTestId('search-form')).toBeInTheDocument();
    expect(input).toBeInTheDocument();

    expect(input.value).toBe('');
    expect(mockfetchData).toHaveBeenCalledTimes(0);

    fireEvent.submit(input);

    expect(mockfetchData).toHaveBeenCalledTimes(0);

    fireEvent.change(input, { target: { value: 'gifs' } });
    expect(input.value).toBe('gifs');
    fireEvent.submit(input);

    expect(mockfetchData).toHaveBeenCalledTimes(1);
  });

  it('validates input value on submit', () => {
    const { input, form } = inputSetup();
    expect(form).toBeInTheDocument();
    expect(input).toBeInTheDocument();

    expect(input.value).toBe('');
    expect(mockfetchData).toHaveBeenCalledTimes(0);

    fireEvent.submit(input);

    expect(mockfetchData).toHaveBeenCalledTimes(0);

    expect(screen.queryByTestId('error-message')).toHaveTextContent(
      'Input should not be empty'
    );
    expect(mockfetchData).toHaveBeenCalledTimes(0);

    fireEvent.change(input, { target: { value: '#' } });
    fireEvent.submit(input);

    expect(screen.queryByTestId('error-message')).toHaveTextContent(
      'Should only contain letters and numbers'
    );
    expect(mockfetchData).toHaveBeenCalledTimes(0);

    fireEvent.change(input, { target: { value: 'gifs' } });
    fireEvent.submit(input);

    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    expect(mockfetchData).toHaveBeenCalledTimes(1);
  });

  it('validates clears errorMessage onChange', () => {
    const { input, form } = inputSetup();
    expect(form).toBeInTheDocument();
    expect(input).toBeInTheDocument();

    expect(input.value).toBe('');
    fireEvent.submit(input);
    expect(screen.queryByTestId('error-message')).toHaveTextContent(
      'Input should not be empty'
    );
    fireEvent.change(input, { target: { value: '#' } });
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    fireEvent.submit(input);
    expect(screen.queryByTestId('error-message')).toHaveTextContent(
      'Should only contain letters and numbers'
    );
    fireEvent.change(input, { target: { value: '#1' } });
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const tree = renderer.create(<Search fetchData={mockfetchData} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
