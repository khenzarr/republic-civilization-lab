# Contributing to Republic Civilization Lab

Thank you for your interest in contributing to Republic Civilization Lab! This document provides guidelines and instructions for contributing.

## 🌟 Ways to Contribute

- **Report Bugs**: Submit detailed bug reports via GitHub Issues
- **Suggest Features**: Propose new features or improvements
- **Improve Documentation**: Fix typos, clarify instructions, add examples
- **Submit Code**: Fix bugs, implement features, optimize performance
- **Test**: Help test new features and report issues
- **Share**: Star the repo, share with others, write about it

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- GitHub account

### Setup Development Environment

1. **Fork the Repository**
   ```bash
   # Click "Fork" button on GitHub
   ```

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/republic-civilization-lab.git
   cd republic-civilization-lab
   ```

3. **Add Upstream Remote**
   ```bash
   git remote add upstream https://github.com/khenzarr/republic-civilization-lab.git
   ```

4. **Install Dependencies**
   ```bash
   npm install
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```

6. **Verify Setup**
   - Visit http://localhost:3000
   - Test civilization generation
   - Check console for errors

## 📝 Development Workflow

### 1. Create a Branch

```bash
# Update your fork
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions/updates
- `chore/` - Maintenance tasks

### 2. Make Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed
- Test your changes thoroughly

### 3. Test Your Changes

```bash
# Run linter
npm run lint

# Build project
npm run build

# Test locally
npm run dev
```

### 4. Commit Changes

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: add civilization comparison feature"
```

Commit message format:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Test updates
- `chore:` - Maintenance tasks

### 5. Push Changes

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

1. Go to your fork on GitHub
2. Click "Compare & pull request"
3. Fill out the PR template
4. Submit the pull request

## 🎨 Code Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type when possible
- Use meaningful variable names

```typescript
// Good
interface CivilizationData {
  name: string;
  population: number;
}

// Avoid
let data: any;
```

### React Components

- Use functional components with hooks
- Memoize components when appropriate
- Keep components focused and small
- Use Server Components by default

```typescript
// Good
export function CivilizationCard({ civilization }: Props) {
  return <div>...</div>;
}

// Use memo for expensive renders
export const CivilizationCard = memo(CivilizationCardComponent);
```

### File Organization

- One component per file
- Co-locate related files
- Use index files for exports
- Keep file names descriptive

```
components/
  CivilizationCard/
    CivilizationCard.tsx
    CivilizationCard.test.tsx
    index.ts
```

### CSS/Styling

- Use TailwindCSS utility classes
- Follow existing color scheme
- Keep custom CSS minimal
- Use CSS variables for themes

```tsx
// Good
<div className="rounded-xl border border-white/10 bg-surface-card p-6">

// Avoid inline styles unless dynamic
<div style={{ color: 'red' }}>
```

## 🧪 Testing Guidelines

### Manual Testing

Before submitting PR:
- [ ] Test on Chrome, Firefox, Safari
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Test all user interactions
- [ ] Verify no console errors
- [ ] Test error states
- [ ] Test loading states

### Automated Testing (Future)

We plan to add:
- Unit tests (Jest)
- Component tests (React Testing Library)
- E2E tests (Playwright)
- Visual regression tests

## 📚 Documentation Guidelines

### Code Comments

```typescript
/**
 * Generate a civilization based on theme.
 * 
 * @param theme - User-provided theme (1-120 chars)
 * @param variations - Generate 3 variations if true
 * @returns Promise resolving to civilization data
 */
export async function generateCivilization(
  theme: string,
  variations: boolean = false
): Promise<Civilization> {
  // Implementation
}
```

### README Updates

- Keep README.md up to date
- Add new features to feature list
- Update screenshots if UI changes
- Document new API endpoints

### Inline Documentation

- Explain "why" not "what"
- Document complex algorithms
- Add TODO comments for future work
- Link to relevant issues/PRs

## 🐛 Bug Reports

### Before Submitting

1. Check existing issues
2. Test on latest version
3. Reproduce the bug
4. Gather relevant information

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., Windows 11]
- Browser: [e.g., Chrome 120]
- Node version: [e.g., 18.17.0]

**Additional context**
Any other relevant information.
```

## 💡 Feature Requests

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Other solutions you've thought about.

**Additional context**
Mockups, examples, or other context.
```

## 🔍 Code Review Process

### What We Look For

- **Functionality**: Does it work as intended?
- **Code Quality**: Is it clean and maintainable?
- **Performance**: Is it optimized?
- **Testing**: Is it properly tested?
- **Documentation**: Is it well documented?
- **Style**: Does it follow guidelines?

### Review Timeline

- Initial review: Within 3-5 days
- Follow-up reviews: Within 2-3 days
- Merge: After approval from maintainer

## 🎯 Priority Areas

We especially welcome contributions in:

1. **Republic API Integration**
   - Real API implementation
   - Error handling improvements
   - Rate limiting logic

2. **UI/UX Enhancements**
   - Accessibility improvements
   - Mobile optimization
   - Animation refinements

3. **Features**
   - Civilization evolution
   - Shareable links
   - Export formats

4. **Documentation**
   - Tutorial videos
   - Integration guides
   - API documentation

5. **Testing**
   - Unit tests
   - E2E tests
   - Performance tests

## 📋 Pull Request Checklist

Before submitting your PR:

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings or errors
- [ ] Tested locally
- [ ] Commit messages are clear
- [ ] PR description is detailed

## 🤝 Community Guidelines

### Be Respectful

- Be kind and courteous
- Respect different viewpoints
- Accept constructive criticism
- Focus on what's best for the project

### Be Collaborative

- Help others learn
- Share knowledge
- Give credit where due
- Celebrate contributions

### Be Professional

- Keep discussions on-topic
- Avoid spam or self-promotion
- Follow GitHub's terms of service
- Maintain confidentiality

## 📞 Getting Help

- **Questions**: Open a GitHub Discussion
- **Bugs**: Create a GitHub Issue
- **Security**: Email security concerns privately
- **General**: Comment on relevant issues/PRs

## 🏆 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in relevant documentation
- Thanked publicly (if desired)

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Republic Civilization Lab! 🎉

Your contributions help make decentralized compute more accessible and exciting for everyone.
