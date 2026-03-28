# React TypeScript Portfolio

This is a lightweight Vite + React + TypeScript portfolio scaffold with animations (Framer Motion) and a GitHub Actions workflow to publish to GitHub Pages.

Quick start

```bash
npm install
npm run dev
```

Build

```bash
npm run build
npm run preview
```

Deploy to GitHub Pages

1. Create a GitHub repository and push this code to `main`.
2. The included workflow (`.github/workflows/deploy.yml`) builds and deploys `dist/` to the `gh-pages` branch on push to `main`.
3. The workflow sets the Vite base using `VITE_PUBLIC_PATH`, so Pages links will resolve correctly.

Release workflow (production)

- A second workflow (`.github/workflows/release.yml`) is included. It triggers on tag pushes (eg. `v1.2.3`) or manual run. It will:
  - install dependencies and build the app
  - create a GitHub Release for the tag
  - upload `dist/` as an artifact
  - publish `dist/` to the `gh-pages` branch

To publish a production release with a tag:

```bash
git tag v1.0.0
git push origin v1.0.0
```

The `release.yml` workflow will run and publish the release + deploy the site.

Files of interest:

- [package.json](package.json#L1)
- [vite.config.ts](vite.config.ts#L1)
- [.github/workflows/deploy.yml](.github/workflows/deploy.yml#L1)
- [.github/workflows/release.yml](.github/workflows/release.yml#L1)
- [src/App.tsx](src/App.tsx#L1)
