# Janith Dasanayaka — Portfolio

A responsive, four-page software engineering portfolio featuring selected projects, verified credentials, qualifications, technical skills, open-source contributions and contact information. It includes a persistent dark/light theme, accessible mobile navigation, project filters and motion that respects reduced-motion preferences.

## Run locally

This is a static website with no runtime dependencies. Serve the `dist` directory with a local web server:

```bash
python3 -m http.server 8000 --directory dist
```

Open `http://localhost:8000`.

## Edit the site

Content and page layout are maintained in `build.py`. After editing it, regenerate the committed HTML pages:

```bash
python3 build.py
```

Styles and behavior live in `dist/styles.css` and `dist/script.js`. Tool logos are stored locally in `dist/assets/icons` from [Devicon](https://github.com/devicons/devicon); its MIT license is included in `LICENSE-devicon.txt`.

## Hosting

The publishable site is the `dist` directory. For AWS Amplify Hosting, point the app at this repository and configure the output directory as `dist`; no install or build command is needed. All four pages are plain HTML and work without server-side routing.
