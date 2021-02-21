import React from 'react';
import ReactDom from 'react-dom';
import ErrorMessage from '../ErrorMessage';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';

describe('ErrorMessage component', () => {
  it('renders with propTypes warning', () => {
    const spy = jest.spyOn(global.console, 'error');
    const div = document.createElement('div');
    ReactDom.render(<ErrorMessage />, div);
    expect(spy).toHaveBeenCalled();
  });

  it('renders without crashing', () => {
    const spy = jest.spyOn(global.console, 'error');
    const div = document.createElement('div');
    ReactDom.render(<ErrorMessage message="" />, div);
    expect(spy).not.toHaveBeenCalled();
  });

  it('renders with correct message', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<ErrorMessage message="Error message" />);
    expect(screen.getByTestId('error-message').textContent).toBe(
      'Error message'
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('renders with additional className', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <ErrorMessage className="error-message-test" message="Error message" />
    );

    expect(screen.getByTestId('error-message').className).toBe(
      'error-message error-message-test'
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('matches snapshot', () => {
    const tree = renderer
      .create(<ErrorMessage message="Error message" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot with additional className', () => {
    const tree = renderer
      .create(
        <ErrorMessage message="Error message" className="error-message-test" />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
