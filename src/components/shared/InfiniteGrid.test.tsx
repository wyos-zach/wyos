/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { InfiniteGrid } from './InfiniteGrid';

// Mock the Lucide icons
jest.mock('lucide-react', () => ({
  Loader2: function MockLoader2() {
    return <div className="animate-spin" data-testid="loader-icon" />;
  },
}));

describe('InfiniteGrid Component', () => {
  const mockFetchNextAction = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders children correctly', () => {
    render(
      <InfiniteGrid isFetching={false} fetchNextAction={mockFetchNextAction}>
        <div data-testid="child-element">Child Content</div>
      </InfiniteGrid>
    );
    
    expect(screen.getByTestId('child-element')).toBeInTheDocument();
    expect(screen.getByTestId('child-element')).toHaveTextContent('Child Content');
  });
  
  it('does not show "Load More" button when hasMore is false', () => {
    render(
      <InfiniteGrid 
        isFetching={false} 
        fetchNextAction={mockFetchNextAction}
        hasMore={false}
      >
        <div>Child Content</div>
      </InfiniteGrid>
    );
    
    expect(screen.queryByText('Load More')).not.toBeInTheDocument();
  });
  
  it('shows "Load More" button when hasMore is true', () => {
    render(
      <InfiniteGrid 
        isFetching={false} 
        fetchNextAction={mockFetchNextAction}
        hasMore={true}
      >
        <div>Child Content</div>
      </InfiniteGrid>
    );
    
    expect(screen.getByText('Load More')).toBeInTheDocument();
  });
  
  it('calls fetchNextAction when "Load More" button is clicked', () => {
    render(
      <InfiniteGrid 
        isFetching={false} 
        fetchNextAction={mockFetchNextAction}
        hasMore={true}
      >
        <div>Child Content</div>
      </InfiniteGrid>
    );
    
    fireEvent.click(screen.getByText('Load More'));
    expect(mockFetchNextAction).toHaveBeenCalledTimes(1);
  });
  
  it('disables "Load More" button and shows loader when isFetching is true', () => {
    render(
      <InfiniteGrid 
        isFetching={true} 
        fetchNextAction={mockFetchNextAction}
        hasMore={true}
      >
        <div>Child Content</div>
      </InfiniteGrid>
    );
    
    const button = screen.getByText('Load More');
    expect(button).toBeDisabled();
    expect(screen.getByTestId('loader-icon')).toBeInTheDocument();
  });
});
