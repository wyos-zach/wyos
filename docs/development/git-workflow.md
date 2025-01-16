# WYOS Git Workflow Guidelines

## Branch Structure

### Main Branches

- `main` - Production-ready code
- `develop` - Primary development branch

### Feature Branches

Branch naming convention: `feature/descriptive-name`
Example: `feature/auth-implementation`

### Fix Branches

Branch naming convention: `fix/issue-description`
Example: `fix/login-validation`

## Commit Standards

### Commit Message Format

```bash
<type>: <description>
[optional body]
```

### Commit Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or modifying tests
- `chore` - Maintenance tasks

### Commit Examples

```bash
feat: add user authentication flow
fix: correct form validation logic
docs: update component documentation
```

## Development Cycle

### Daily Development Flow

1. Work on feature branches
2. Merge completed features to develop
3. Test thoroughly on develop
4. When ready for release:
   - Merge develop to main
   - Tag version
   - Deploy

### Branch Lifecycle

- Create branches only when starting new work
- Keep branches focused on single features/fixes
- Delete feature/fix branches after merging to develop
- Keep repository clean by removing stale branches

## Version Control Best Practices

### Before Committing

- Review changes
- Run linting checks
- Ensure tests pass
- Check for sensitive data

### Code Review (Self-Review)

- Review diff before committing
- Ensure code meets standards
- Verify functionality
- Check for potential issues

## Version Tagging

### Version Format

- Format: v[major].[minor].[patch]
- Examples:
  - v0.1.0 - Initial development
  - v0.2.0 - Feature additions
  - v0.2.1 - Bug fixes
  - v1.0.0 - First production release

### When to Tag

- After significant feature completion
- Before each production deployment
- When making breaking changes
- For important bug fix releases
