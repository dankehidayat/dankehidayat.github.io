# Copilot Instructions for dankehidayat.github.io

## Project Overview
This is a personal portfolio website, primarily static, with HTML, CSS, and static assets. There is no build system, backend, or dynamic scripting. The site is organized for clarity and maintainability.

## Key Structure
- `index.html`, `experience.html`, `project.html`: Main site pages.
- `src/css/`: Page-specific CSS files (`index.css`, `experience.css`, `project.css`).
- `src/img/`, `src/img/project/`: Images for the site and projects.
- `src/Resume.pdf`: Resume download link.
- `src/favicon/`: Favicon assets.

## Conventions & Patterns
- **Page-specific CSS**: Each HTML page imports only its relevant CSS from `src/css/`.
- **Image organization**: Project images are in `src/img/project/`, general images in `src/img/`.
- **No JavaScript**: The site is static; do not add JS unless explicitly requested.
- **Relative paths**: Use relative paths for all asset references in HTML and CSS.
- **Accessibility**: Use semantic HTML tags and provide `alt` text for all images.

## Developer Workflows
- **Previewing**: Use a static server (e.g., Five Server, Live Server) to preview changes locally.
- **No build step**: Edit HTML/CSS directly; refresh browser to see changes.
- **No tests**: There are no automated tests or build scripts.
- **Deployment**: Push to the `main` branch to update the GitHub Pages site.

## Examples
- To add a new project:
  1. Add images to `src/img/project/`.
  2. Update `project.html` and `src/css/project.css` as needed.
- To update the resume:
  1. Replace `src/Resume.pdf`.
  2. Ensure links in `index.html` point to the new file.

## Do/Don't
- **Do**: Follow the file organization and naming conventions.
- **Do**: Keep HTML and CSS clean and minimal.
- **Don't**: Add JavaScript, frameworks, or build tools unless requested.
- **Don't**: Change the deployment branch or add CI/CD files.

## References
- Main entry: `index.html`
- Styles: `src/css/`
- Images: `src/img/`, `src/img/project/`
- Resume: `src/Resume.pdf`

---
For questions or changes to these instructions, ask for clarification or feedback from the project owner.
