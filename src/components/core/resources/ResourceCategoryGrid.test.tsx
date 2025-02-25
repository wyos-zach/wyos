/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react';
import { ResourceCategoryGrid } from './ResourceCategoryGrid';
import { ResourceService } from '@/models/server/resources';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: jest.fn((param) => param === 'category' ? null : null),
  }),
}));

// Mock the ResourceService
jest.mock('@/models/server/resources', () => ({
  ResourceService: {
    getResourceCategories: jest.fn(),
    getMainCategoryBySlug: jest.fn(),
    getSubcategories: jest.fn(),
  },
}));

// Mock the ResourceCategoryCard component
jest.mock('./ResourceCategoryCard', () => ({
  ResourceCategoryCard: function MockResourceCategoryCard({ category }: { category: any }) {
    return (
      <div data-testid="resource-category-card">
        {category.name}
      </div>
    );
  },
}));

// Mock the Skeleton component
jest.mock('@/components/ui/skeleton', () => ({
  Skeleton: function MockSkeleton(props: React.HTMLAttributes<HTMLDivElement>) {
    return <div data-testid="skeleton" {...props} />;
  },
}));

describe('ResourceCategoryGrid', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    // Mock the service to return a promise that never resolves
    (ResourceService.getResourceCategories as jest.Mock).mockReturnValue(
      new Promise(() => {})
    );

    render(
      <QueryClientProvider client={queryClient}>
        <ResourceCategoryGrid />
      </QueryClientProvider>
    );

    // Check for loading skeletons
    expect(screen.getAllByTestId('skeleton')).toHaveLength(3);
  });

  it('renders resource categories when data is loaded', async () => {
    // Mock data
    const mockCategories = [
      { $id: '1', name: 'Category 1', description: 'Description 1' },
      { $id: '2', name: 'Category 2', description: 'Description 2' },
      { $id: '3', name: 'Category 3', description: 'Description 3' },
    ];

    // Mock the service to return the data
    (ResourceService.getResourceCategories as jest.Mock).mockResolvedValue(mockCategories);

    render(
      <QueryClientProvider client={queryClient}>
        <ResourceCategoryGrid />
      </QueryClientProvider>
    );

    // Wait for the data to load
    await waitFor(() => {
      expect(screen.getAllByTestId('resource-category-card')).toHaveLength(3);
    });

    // Check that each category is rendered
    expect(screen.getByText('Category 1')).toBeInTheDocument();
    expect(screen.getByText('Category 2')).toBeInTheDocument();
    expect(screen.getByText('Category 3')).toBeInTheDocument();
  });

  it('renders error state when there is an error', async () => {
    // Mock the service to throw an error
    (ResourceService.getResourceCategories as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch categories')
    );

    render(
      <QueryClientProvider client={queryClient}>
        <ResourceCategoryGrid />
      </QueryClientProvider>
    );

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Error loading resource categories/)).toBeInTheDocument();
    });
  });

  it('renders empty state when no categories are found', async () => {
    // Mock the service to return an empty array
    (ResourceService.getResourceCategories as jest.Mock).mockResolvedValue([]);

    render(
      <QueryClientProvider client={queryClient}>
        <ResourceCategoryGrid />
      </QueryClientProvider>
    );

    // Wait for the empty message to appear
    await waitFor(() => {
      expect(screen.getByText(/No resource categories found/)).toBeInTheDocument();
    });
  });
});
