# Contributing to ZincArt

Thank you for your interest in contributing to the ZincArt website! We welcome contributions from the community and appreciate your help in making this project better.

## 🤝 How to Contribute

### Reporting Issues

If you find a bug or have a suggestion for improvement, please:

1. **Check existing issues** first to avoid duplicates
2. **Use the issue templates** when available
3. **Provide detailed information**:
   - Description of the issue
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Browser and device information
   - Screenshots if applicable

### Suggesting Enhancements

For feature requests or enhancements:

1. **Check if the feature already exists**
2. **Describe the enhancement clearly**
3. **Explain the use case and benefits**
4. **Consider implementation complexity**

## 🛠️ Development Setup

### Prerequisites

- Modern web browser
- Text editor or IDE
- Git
- Python 3.x (for local development server)

### Getting Started

1. **Fork the repository**
2. **Clone your fork**:
   ```bash
   git clone https://github.com/yourusername/zincart.git
   cd zincart
   ```

3. **Start local development server**:
   ```bash
   python3 -m http.server 8000
   ```

4. **Open in browser**: `http://localhost:8000`

### Making Changes

1. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:
   - Follow the existing code style
   - Test your changes thoroughly
   - Update documentation if needed

3. **Test your changes**:
   - Test in multiple browsers
   - Test responsive design
   - Test language switching
   - Test all interactive elements

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add: brief description of your changes"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**

## 📝 Code Style Guidelines

### HTML
- Use semantic HTML5 elements
- Include proper accessibility attributes
- Maintain consistent indentation (2 spaces)
- Add comments for complex sections

### CSS
- Use consistent naming conventions
- Group related styles together
- Use CSS custom properties (variables) when appropriate
- Include responsive design considerations
- Add comments for complex styles

### JavaScript
- Use modern ES6+ syntax
- Follow consistent naming conventions
- Add comments for complex logic
- Handle errors gracefully
- Use meaningful variable and function names

### File Organization
- Keep files organized in appropriate directories
- Use descriptive file names
- Maintain the existing project structure

## 🌐 Multi-language Considerations

When making changes that affect content:

1. **Update all language files** (`assets/js/languages.json`)
2. **Test language switching functionality**
3. **Ensure translations are accurate and culturally appropriate**
4. **Maintain consistency across languages**

## 🧪 Testing Guidelines

Before submitting changes:

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Device Testing
- [ ] Desktop (1200px+)
- [ ] Tablet (768px - 1199px)
- [ ] Mobile (320px - 767px)

### Functionality Testing
- [ ] Navigation works correctly
- [ ] Language switching functions properly
- [ ] All forms work and validate
- [ ] Images load correctly
- [ ] Animations work smoothly
- [ ] No console errors

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Proper heading hierarchy
- [ ] Alt text for images
- [ ] Color contrast meets standards

## 📋 Pull Request Guidelines

### Before Submitting
- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] Documentation updated
- [ ] No merge conflicts
- [ ] Descriptive commit messages

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested in multiple browsers
- [ ] Tested responsive design
- [ ] Tested language switching
- [ ] No console errors

## Screenshots (if applicable)
Add screenshots to help explain your changes

## Additional Notes
Any additional information about the changes
```

## 🚫 What Not to Contribute

Please avoid:
- Changes that break existing functionality
- Incomplete features
- Code that doesn't follow the style guidelines
- Changes without proper testing
- Content that's not relevant to the project

## 📞 Getting Help

If you need help or have questions:

1. **Check existing issues and discussions**
2. **Create a new issue** with the "question" label
3. **Be specific** about what you need help with
4. **Provide context** about what you're trying to achieve

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- GitHub contributor statistics

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the same MIT License that covers the project.

---

Thank you for contributing to ZincArt! 🚀
