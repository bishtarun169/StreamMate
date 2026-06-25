
<!-- omit in toc -->
# Contributing to StreamMate

First of all, thank you for considering contributing to **StreamMate**! 🎉

Whether you're fixing bugs, improving documentation, enhancing the UI, or adding new features, every contribution is appreciated and helps make StreamMate better.

If you find this project useful, consider giving it a ⭐ on GitHub!

---

<!-- omit in toc -->
## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Development Setup](#development-setup)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Questions](#questions)

---

## Code of Conduct

Please be respectful, inclusive, and constructive when interacting with other contributors.

By participating in this project, you agree to foster a welcoming environment for everyone.

---

## Getting Started

1. Fork the repository.

2. Clone your fork.

```bash
git clone https://github.com/bishtarun169/StreamMate.git
```

3. Navigate into the project.

```bash
cd StreamMate
```

4. Create a new branch.

```bash
git checkout -b feature/your-feature-name
```

5. Install project dependencies.

```bash
cd server
npm install

cd ../client
npm install
```

6. Configure the required environment variables.

7. Start the development servers.

---

## How to Contribute

Contributions are welcome in many forms, including:

- 🐛 Bug fixes
- ✨ New features
- ⚡ Performance improvements
- 🎨 UI/UX enhancements
- 📚 Documentation updates
- 🔒 Security improvements
- 🧪 Testing

---

## Reporting Bugs

Before opening a bug report:

- Make sure you're using the latest version.
- Search existing issues to avoid duplicates.
- Clearly describe the issue.
- Include reproduction steps.
- Attach screenshots or logs if applicable.
- Mention your operating system, browser, and Node.js version.

Open an issue using the GitHub Issues page.

---

## Suggesting Features

Have an idea to improve StreamMate?

Please include:

- A clear description of the feature.
- Why it would be useful.
- Possible implementation details (optional).
- Mockups or screenshots if applicable.

Feature requests are tracked through GitHub Issues.

---

## Development Setup

Start the backend:

```bash
cd server
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

Open another terminal and start the frontend:

```bash
cd client
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## Commit Guidelines

Write concise, meaningful commit messages.

Examples:

```text
feat: add room password protection

feat: implement synchronized playback

fix: resolve socket reconnection bug

refactor: modularize socket handlers

docs: update README

style: improve landing page responsiveness
```

---

## Pull Request Process

Before opening a Pull Request:

- Ensure the project builds successfully.
- Follow the existing code style.
- Keep PRs focused on a single feature or fix.
- Update documentation when required.
- Remove any sensitive information such as `.env` files or API keys.

After submitting your Pull Request:

- A maintainer will review your changes.
- Address any requested modifications.
- Once approved, your contribution will be merged.

---

## Questions

- Open a GitHub Issue
- Start a GitHub Discussion (if enabled)

---

## Thank You ❤️

Every contribution, no matter how small, helps improve StreamMate.

If you enjoyed working with this project, don't forget to ⭐ the repository.

Happy Coding! 🚀
