# Geothermal Networks Education Website

This is a code bundle for the Geothermal Networks Education Website.
The preliminary skeleton was made using Figma.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## GitHub Pages deployment

This project is configured to deploy from GitHub Actions in [`.github/workflows/deploy.yml`](/Users/billchen/Documents/geothermal-merge-5/.github/workflows/deploy.yml).

During production builds, the Vite `base` path is derived automatically from the GitHub repository name via `GITHUB_REPOSITORY`. That keeps asset URLs aligned with the actual GitHub Pages URL and avoids the common 404 issue caused by hardcoded repo paths.

If you ever need to override the deployed base path manually, set `BASE_PATH` before building.
