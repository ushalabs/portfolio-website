# Acceptance report

The seven-project portfolio was validated locally on Windows with Chrome against the Next.js production server.

| Check | Result |
| --- | --- |
| Build and static checks | Production build, ESLint, and strict TypeScript passed. |
| Browser suite | All 17 checks passed in 47.4 seconds, covering the homepage, archive, seven case studies, downloads, and navigation. |
| Responsive layout | Tested at 360, 390, 768, 1024, 1440, and 1920px. |
| Project cards | Seven previews, two cards per desktop row, and a centered final card. Browser checks measure the right alignment and both directions of tilt. |
| Visual review | Desktop and mobile screenshots confirm the device placement and title readability. |
| Case-study media | Visuals follow the written content. Desktop media containers use 40% of the content width. The original MeetingMinutes MP4 plays and the Sentinel GIF starts and stops. |
| Identity and résumé | The homepage uses Usman Qureshi. The top bar downloads the supplied PDF, and its SHA-256 matches the original. |
| Accessibility | Keyboard, touch, reduced-motion and no-WebGL checks passed. axe found zero WCAG A/AA violations on the homepage, archive, and Velora case study. |
| Routes and metadata | Seven case studies, nine social previews, the sitemap, robots, canonical tags, and the custom 404 passed. |

The dark MeetingMinutes card is a screenshot of the repository frontend running with local sample data. The supplied video remains the case-study demo. The seven card sources and their presentation treatments are listed in the [media manifest](MEDIA_MANIFEST.md).

The original release’s Lighthouse results and Git checkpoints are recorded in the [phase reports](PHASE_REPORTS.md). The current revision is local. [Deployment instructions](DEPLOYMENT.md)
