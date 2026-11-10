# Usha Labs

The engineering portfolio of Usman Qureshi. It features an interactive prism, seven project showcases, a filterable archive, and source-backed case studies.

## Run locally

Use Node.js 24 and npm.

```powershell
npm ci
npm run dev
```

Open [the local portfolio](http://localhost:3000/). To verify a production build with the acceptance suite, follow [Deployment and verification](DEPLOYMENT.md).

## Project structure

| Path | Contents |
| --- | --- |
| `src/app/` | Next.js routes, page styles, metadata, social images, and 404 |
| `src/components/` | Hero, Three.js scene, project presentation, navigation, and contact |
| `src/data/` | Typed project registry, media provenance, and identity data |
| `public/projects/` | Verified project imagery |
| `public/resumes/` | The supplied PDF résumé downloaded from the top bar |
| `tests/` | Playwright production smoke tests and axe scans |

[Project audit](PROJECT_AUDIT.md) · [Media manifest](MEDIA_MANIFEST.md) · [Phase reports](PHASE_REPORTS.md) · [Acceptance report](ACCEPTANCE_REPORT.md)
