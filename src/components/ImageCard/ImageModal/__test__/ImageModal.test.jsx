import React from 'react';
import ReactDom from 'react-dom';
import ImageModal from '../ImageModal';
import { generateModalRoot } from 'testUtils';
import { render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
// import '@testing-library/jest-dom/extend-expect';

const imageUrl = 'imageUrl';
const alt = 'alt';

describe('ImageModal component', () => {
  it('renders with propTypes warning', () => {
    const spy = jest.spyOn(global.console, 'error');
    generateModalRoot();
    expect(screen.queryByTestId('image-modal')).not.toBeInTheDocument();
    render(<ImageModal />);
    expect(screen.queryByTestId('image-modal')).toBeInTheDocument();
    expect(spy).toHaveBeenCalled();
  });

  it('renders without propTypes warning', () => {
    const spy = jest.spyOn(global.console, 'error');
    const mockOnClick = jest.fn();
    generateModalRoot();
    expect(screen.queryByTestId('image-modal')).not.toBeInTheDocument();
    render(<ImageModal imageUrl={imageUrl} closeModal={mockOnClick} />);
    expect(screen.queryByTestId('image-modal')).toBeInTheDocument();
    expect(spy).not.toHaveBeenCalled();
  });

  it('renders and focuses IconButton', () => {
    const mockOnClick = jest.fn();
    generateModalRoot();
    expect(screen.queryByTestId('image-modal')).not.toBeInTheDocument();
    render(
      <ImageModal imageUrl={imageUrl} alt={alt} closeModal={mockOnClick} />
    );
    expect(screen.queryByTestId('image-modal')).toBeInTheDocument();
    expect(document.activeElement).toEqual(screen.queryByTestId('icon-button'));
  });

  it('fires closeModal function prop with escape key', () => {
    const mockOnClick = jest.fn();
    generateModalRoot();
    expect(screen.queryByTestId('image-modal')).not.toBeInTheDocument();
    render(<ImageModal imageUrl={imageUrl} closeModal={mockOnClick} />);
    expect(mockOnClick).toHaveBeenCalledTimes(0);
    fireEvent.keyDown(screen.queryByTestId('image-modal'), {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    });
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('fires closeModal function prop when clicking outsite of modal', () => {
    const mockOnClick = jest.fn();
    generateModalRoot();
    render(
      <ImageModal imageUrl={imageUrl} closeModal={mockOnClick} alt={alt} />
    );
    expect(mockOnClick).toHaveBeenCalledTimes(0);
    fireEvent.click(screen.queryByTestId('image-modal-content'));
    fireEvent.click(screen.getByAltText(alt));
    expect(mockOnClick).toHaveBeenCalledTimes(0);
    fireEvent.click(screen.queryByTestId('image-modal'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('fires closeModal function prop when clicking on IconButton', () => {
    const mockOnClick = jest.fn();
    generateModalRoot();
    render(
      <ImageModal imageUrl={imageUrl} closeModal={mockOnClick} alt={alt} />
    );
    expect(mockOnClick).toHaveBeenCalledTimes(0);
    fireEvent.click(screen.queryByTestId('icon-button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot', () => {
    ReactDom.createPortal = jest.fn((element, node) => {
      return element;
    });
    const tree = renderer
      .create(<ImageModal imageUrl={imageUrl} alt={alt} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
