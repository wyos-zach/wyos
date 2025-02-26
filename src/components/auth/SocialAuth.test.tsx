/**
 * @jest-environment jsdom
 * @description Tests for the SocialAuth component
 */
import { render, screen, fireEvent } from '@/__tests__/test-utils';
import { SocialAuth } from './SocialAuth';
import { useAuthStore } from '@/store/Auth';
import { OAuthProvider } from 'appwrite';

// Mock the auth store
jest.mock('@/store/Auth', () => ({
  useAuthStore: jest.fn(),
}));

describe('SocialAuth', () => {
  beforeEach(() => {
    // Default mock implementation
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      createOAuthSession: jest.fn(),
    });
  });

  it('renders social login buttons', () => {
    render(<SocialAuth isLoading={false} />);

    expect(
      screen.getByRole('button', { name: /continue with google/i })
    ).toBeInTheDocument();
  });

  it('disables buttons when loading', () => {
    render(<SocialAuth isLoading={true} />);

    expect(
      screen.getByRole('button', { name: /continue with google/i })
    ).toBeDisabled();
  });

  it('calls createOAuthSession when Google button is clicked', () => {
    const mockCreateOAuthSession = jest.fn();
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      createOAuthSession: mockCreateOAuthSession,
    });

    render(<SocialAuth isLoading={false} />);

    fireEvent.click(
      screen.getByRole('button', { name: /continue with google/i })
    );
    expect(mockCreateOAuthSession).toHaveBeenCalledWith(OAuthProvider.Google);
  });

  it('handles errors during OAuth login', () => {
    // Mock console.error to capture error logs
    const originalConsoleError = console.error;
    console.error = jest.fn();

    const mockCreateOAuthSession = jest
      .fn()
      .mockRejectedValue(new Error('OAuth error'));
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      createOAuthSession: mockCreateOAuthSession,
    });

    render(<SocialAuth isLoading={false} />);

    fireEvent.click(
      screen.getByRole('button', { name: /continue with google/i })
    );

    // Wait for the async function to complete
    setTimeout(() => {
      expect(console.error).toHaveBeenCalledWith(
        'OAuth error:',
        expect.any(Error)
      );
      // Restore original console.error
      console.error = originalConsoleError;
    }, 0);
  });
});
