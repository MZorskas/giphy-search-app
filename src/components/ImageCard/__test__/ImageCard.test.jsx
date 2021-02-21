import React from 'react';
import ReactDom from 'react-dom';
import ImageCard from '../ImageCard';
import { generateModalRoot } from 'testUtils';
import { render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';

const images = {
  downsized: {
    url: 'imgURL1',
  },
  downsized_large: {
    url: 'imgURL2',
  },
  original: {
    url: 'imgURL3',
  },
};

const alt = 'image alt';

describe('ImageCard component', () => {
  it('renders with propTypes warning', () => {
    const spy = jest.spyOn(global.console, 'error');
    const div = document.createElement('div');
    ReactDom.render(<ImageCard />, div);
    expect(spy).toHaveBeenCalled();
  });

  it('renders without crashing', () => {
    const spy = jest.spyOn(global.console, 'error');
    const div = document.createElement('div');
    ReactDom.render(<ImageCard images={images} />, div);
    expect(spy).not.toHaveBeenCalled();
  });

  it('renders with correct alt attribute', () => {
    render(<ImageCard images={images} alt={alt} />);
    expect(screen.getByAltText(alt)).toBeInTheDocument();
  });

  it('renders with correct srcSet', () => {
    render(<ImageCard images={images} alt={alt} />);

    expect(
      screen.getByTestId('image-card-source-1').getAttribute('srcSet')
    ).toMatch(images.downsized.url);
    expect(
      screen.getByTestId('image-card-source-2').getAttribute('srcSet')
    ).toMatch(images.downsized_large.url);

    expect(screen.getByAltText(alt).getAttribute('src')).toMatch(
      images.downsized_large.url
    );
  });

  it('renders modal on mouse click', () => {
    generateModalRoot();
    render(<ImageCard images={images} />);
    expect(screen.queryByTestId('image-modal')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('image-card'));

    expect(screen.queryByTestId('image-modal')).toBeInTheDocument();
  });

  it('renders modal on enter key down', () => {
    generateModalRoot();
    render(<ImageCard images={images} />);
    expect(screen.queryByTestId('image-modal')).not.toBeInTheDocument();

    fireEvent.keyDown(screen.getByTestId('image-card'), { key: 'Enter' });

    expect(screen.queryByTestId('image-modal')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const tree = renderer
      .create(<ImageCard alt={alt} images={images} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
