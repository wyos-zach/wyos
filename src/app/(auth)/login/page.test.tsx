/**
 * @jest-environment jsdom
 */
import { render, screen } from '@/__tests__/test-utils';
import LoginPage from './page';

// Mock all imports properly
jest.mock('@/components/auth/forms/login/LoginHeader', () => ({
  LoginHeader: function MockLoginHeader() {
    return <div data-testid="login-header">Mocked Login Header</div>;
  }
}));

jest.mock('@/components/auth/forms/login/LoginFields', () => ({
  LoginFields: function MockLoginFields() {
    return <div data-testid="login-fields">Mocked Login Fields</div>;
  }
}));

jest.mock('@/components/auth/SocialAuth', () => ({
  SocialAuth: function MockSocialAuth() {
    return <div data-testid="social-auth">Mocked Social Auth</div>;
  }
}));

jest.mock('@/components/ui/ripple-button', () => ({
  RippleButton: function MockRippleButton(props) {
    return <button data-testid="ripple-button" {...props} />;
  }
}));

jest.mock('@/lib/hooks/auth/useLogin', () => ({
  useLoginForm: () => ({
    isLoading: false,
    error: null,
    handleSubmit: jest.fn((e) => e.preventDefault())
  })
}));

describe('LoginPage', () => {
  it('renders login page components', () => {
    render(<LoginPage />);
    
    expect(screen.getByTestId('login-header')).toBeInTheDocument();
    expect(screen.getByTestId('login-fields')).toBeInTheDocument();
    expect(screen.getByTestId('ripple-button')).toBeInTheDocument();
    expect(screen.getByTestId('social-auth')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Login');
  });
});