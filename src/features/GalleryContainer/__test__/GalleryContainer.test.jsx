import React from 'react';
import GalleryContainer from '../GalleryContainer';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';

const intersectionObserverMock = () => ({
  observe: () => null,
});

window.IntersectionObserver = jest
  .fn()
  .mockImplementation(intersectionObserverMock);

jest.mock('components/ImageCard', () => (props) => (
  <mock-ImageCard data-testId="mock-image-card" {...props} />
));

const mockfetchData = jest.fn();
const totalCount = 10;
const title = 'Title';
const errorMessage = `No GIFs found for ${title}`;
const altText = 'Test';
const data = [
  {
    images: { url: 'url1' },
    title: altText,
  },
  {
    images: { url: 'url2' },
    title: altText,
  },
  {
    images: { url: 'url3' },
    title: altText,
  },
];

describe('GalleryContainer component', () => {
  it('renders with propTypes warning', () => {
    const spy = jest.spyOn(global.console, 'error');
    expect(screen.queryByTestId('gallery-container')).not.toBeInTheDocument();
    render(<GalleryContainer data={[]} />);
    expect(screen.queryByTestId('gallery-container')).toBeInTheDocument();
    expect(spy).toHaveBeenCalled();
  });

  it('renders without propTypes warning', () => {
    const spy = jest.spyOn(global.console, 'error');
    expect(screen.queryByTestId('gallery-container')).not.toBeInTheDocument();
    render(
      <GalleryContainer
        data={[]}
        fetchData={mockfetchData}
        title={title}
        totalCount={0}
      />
    );
    expect(screen.queryByTestId('gallery-container')).toBeInTheDocument();
    expect(spy).not.toHaveBeenCalled();
  });

  it('displays title and totalCount correctly', () => {
    expect(screen.queryByText(title)).not.toBeInTheDocument();
    expect(screen.queryByText(`${totalCount} GIFs`)).not.toBeInTheDocument();
    render(
      <GalleryContainer
        data={[]}
        fetchData={mockfetchData}
        title={title}
        totalCount={totalCount}
      />
    );
    expect(screen.queryByText(title)).toBeInTheDocument();
    expect(screen.queryByText(`${totalCount} GIFs`)).toBeInTheDocument();
  });

  it('renders ImageCard elements', () => {
    expect(screen.queryByTestId('mock-image-card')).not.toBeInTheDocument();
    render(
      <GalleryContainer
        data={data}
        fetchData={mockfetchData}
        title={title}
        totalCount={totalCount}
      />
    );
    expect(screen.getAllByTestId('mock-image-card')[0]).toHaveAttribute(
      'alt',
      data[0].title
    );
    expect(screen.getAllByTestId('mock-image-card').length).toBe(data.length);
  });

  it('displays ErrorMessage if totalCount is 0', () => {
    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
    const { rerender } = render(
      <GalleryContainer
        data={[]}
        fetchData={mockfetchData}
        title={title}
        totalCount={totalCount}
      />
    );
    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
    rerender(
      <GalleryContainer
        data={[]}
        fetchData={mockfetchData}
        title={title}
        totalCount={0}
      />
    );
    expect(screen.queryByText(errorMessage)).toBeInTheDocument();
  });

  it('displays ErrorMessage with correct title', () => {
    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();

    const { rerender } = render(
      <GalleryContainer
        data={[]}
        fetchData={mockfetchData}
        title={title}
        totalCount={0}
      />
    );

    expect(
      screen.queryByText(`No GIFs found for ${title}`)
    ).toBeInTheDocument();

    rerender(
      <GalleryContainer
        data={[]}
        fetchData={mockfetchData}
        title="Test"
        totalCount={0}
      />
    );
    expect(
      screen.queryByText(`No GIFs found for ${title}`)
    ).not.toBeInTheDocument();

    expect(screen.queryByText(`No GIFs found for Test`)).toBeInTheDocument();
    expect;
  });

  it('matches snapshot without data', () => {
    const tree = renderer
      .create(
        <GalleryContainer
          data={[]}
          fetchData={mockfetchData}
          title="Test"
          totalCount={totalCount}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot with data', () => {
    const tree = renderer
      .create(
        <GalleryContainer
          data={data}
          fetchData={mockfetchData}
          title="Test"
          totalCount={totalCount}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot with ErrorMessage', () => {
    const tree = renderer
      .create(
        <GalleryContainer
          data={[]}
          fetchData={mockfetchData}
          title="Test"
          totalCount={0}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
