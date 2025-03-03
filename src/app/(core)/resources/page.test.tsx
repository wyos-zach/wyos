/**
 * @jest-environment jsdom
 */
import { render, screen } from '@/__tests__/test-utils';
import ResourcesPage from './page';

// Mock all imported components
jest.mock('@/components/shared/layout/PageHeader', () => ({
  PageHeader: function MockPageHeader({ title }: { title: string }) {
    return <h1 data-testid='page-header'>{title}</h1>;
  },
}));

jest.mock('@/components/core/resources/CategoryNav', () => ({
  CategoryNav: function MockCategoryNav() {
    return <nav data-testid='category-nav'>Category Navigation</nav>;
  },
}));

jest.mock('@/components/core/resources/ResourceCategoryGrid', () => ({
  ResourceCategoryGrid: function MockResourceCategoryGrid() {
    return <div data-testid='resource-category-grid'>Resource Categories</div>;
  },
}));

jest.mock('@/components/core/resources/FeaturedResources', () => ({
  FeaturedResources: function MockFeaturedResources() {
    return <div data-testid='featured-resources'>Featured Resources</div>;
  },
}));

// Mock the loading component
jest.mock('./loading', () => ({
  __esModule: true,
  default: function MockResourceLoading() {
    return <div data-testid='resource-loading'>Loading...</div>;
  },
}));

// Mock Suspense to immediately render children instead of fallback
jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    Suspense: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

describe('ResourcesPage', () => {
  it('renders the page with correct components', () => {
    render(<ResourcesPage />);

    // Check if the PageHeader is rendered with correct title
    expect(screen.getByTestId('page-header')).toBeInTheDocument();
    expect(screen.getByTestId('page-header')).toHaveTextContent('Resources');

    // Check if the CategoryNav is rendered
    expect(screen.getByTestId('category-nav')).toBeInTheDocument();

    // Check if the ResourceCategoryGrid is rendered
    expect(screen.getByTestId('resource-category-grid')).toBeInTheDocument();

    // Check if the FeaturedResources is rendered
    expect(screen.getByTestId('featured-resources')).toBeInTheDocument();
  });
});
