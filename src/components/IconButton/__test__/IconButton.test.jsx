import React from 'react';
import ReactDom from 'react-dom';
import IconButton from '../IconButton';
import { SearchIcon } from 'assets/icons';
import { render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';

describe('IconButton component', () => {
  it('renders with propTypes warning', () => {
    const spy = jest.spyOn(global.console, 'error');
    const div = document.createElement('div');
    ReactDom.render(<IconButton />, div);
    expect(spy).toHaveBeenCalled();
  });

  it('renders without crashing', () => {
    const spy = jest.spyOn(global.console, 'error');
    const div = document.createElement('div');
    ReactDom.render(<IconButton icon={<SearchIcon />} />, div);
    expect(spy).not.toHaveBeenCalled();
  });

  it('renders with correct attributes', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IconButton
        type="button"
        form="form-id"
        ariaLabel="search"
        icon={<SearchIcon />}
      />
    );

    expect(screen.getByTestId('icon-button').getAttribute('type')).toBe(
      'button'
    );
    expect(screen.getByTestId('icon-button').getAttribute('form')).toBe(
      'form-id'
    );
    expect(screen.getByTestId('icon-button').getAttribute('aria-label')).toBe(
      'search'
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('renders with additional className', () => {
    render(<IconButton className="icon-button-test" icon={<SearchIcon />} />);

    expect(screen.getByTestId('icon-button').className).toBe(
      'icon-button icon-button-test'
    );
  });

  it('fires onClick event', () => {
    const mockOnClick = jest.fn();

    render(<IconButton icon={<SearchIcon />} onClick={mockOnClick} />);

    fireEvent.click(screen.getByTestId('icon-button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot', () => {
    const tree = renderer.create(<IconButton icon={<SearchIcon />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot with additional className', () => {
    const tree = renderer
      .create(<IconButton className="icon-button-test" icon={<SearchIcon />} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot with correct attributes', () => {
    const tree = renderer
      .create(
        <IconButton
          type="button"
          form="form-id"
          ariaLabel="search"
          icon={<SearchIcon />}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
