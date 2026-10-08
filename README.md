# Janith Dasanayaka — Portfolio

A responsive software engineering and full-stack developer portfolio featuring selected projects, open-source contributions, technical skills, education, and contact information.

## Run locally

This is a static website with no build step. Serve the `dist` directory with a local web server:

```bash
python3 -m http.server 8000 --directory dist
```

Open `http://localhost:8000`.

## Hosting

The publishable site is the `dist` directory. For AWS Amplify Hosting, point the app at this repository and configure the output directory as `dist`; no install or build command is needed.
