import React from 'react';
import Input from '../Input';
import { render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';

const mockOnChange = jest.fn();

const inputSetup = () => {
  const utils = render(
    <Input
      onChange={mockOnChange}
      className="input-test"
      placeholder="Gifs"
      id="search-input"
      label="Search"
      autoFocus
    />
  );
  const input = screen.getByPlaceholderText('Gifs');
  return {
    input,
    ...utils,
  };
};

describe('Input component', () => {
  it('renders with propTypes warning', () => {
    const spy = jest.spyOn(global.console, 'error');

    expect(screen.queryByTestId('input')).not.toBeInTheDocument();
    render(<Input />);
    expect(screen.queryByTestId('input')).toBeInTheDocument();

    expect(spy).toHaveBeenCalled();
  });

  it('renders without propTypes warning', () => {
    const spy = jest.spyOn(global.console, 'error');

    expect(screen.queryByTestId('input')).not.toBeInTheDocument();
    inputSetup();
    expect(screen.queryByTestId('input')).toBeInTheDocument();

    expect(spy).not.toHaveBeenCalled();
  });

  //   it('renders and autofocus inputField', () => {
  //     expect(screen.queryByTestId('input')).not.toBeInTheDocument();
  //     render(<Input onChange={mockOnChange} placeholder="Gifs" />);
  //     expect(screen.queryByTestId('input')).toBeInTheDocument();

  //     expect(screen.getByPlaceholderText('Gifs')).toEqual(document.activeElement);
  //   });

  it('renders with additional className', () => {
    expect(screen.queryByTestId('input')).not.toBeInTheDocument();
    render(
      <Input
        onChange={mockOnChange}
        className="input-test"
        placeholder="Gifs"
      />
    );
    expect(screen.getByPlaceholderText('Gifs').className).toBe(
      'input-wrapper__input input-test'
    );
  });

  it('updates input value', () => {
    const { input } = inputSetup();

    fireEvent.change(input, { target: { value: '123' } });
    expect(input.value).toBe('123');
  });

  it('removes input value', () => {
    const { input } = inputSetup();

    fireEvent.change(input, { target: { value: '123' } });
    expect(input.value).toBe('123');
    fireEvent.change(input, { target: { value: '' } });
    expect(input.value).toBe('');
  });

  it('matches snapshot', () => {
    const tree = renderer
      .create(
        <Input
          onChange={mockOnChange}
          className="input-test"
          placeholder="Gifs"
          id="search-input"
          label="Search"
          autoFocus
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
