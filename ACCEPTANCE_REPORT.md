# Acceptance report

The seven-project portfolio was validated locally on Windows with Chrome against the Next.js production server.

| Check | Result |
| --- | --- |
| Build and static checks | Production build, ESLint, and strict TypeScript passed. |
| Browser suite | All 19 checks passed in 54.4 seconds, covering the homepage, archive, seven case studies, downloads, and navigation. |
| Responsive layout | Tested at 360, 390, 768, 1024, 1440, and 1920px. |
| Project cards | Seven repository icons, descriptions, technology tags, and separate GitHub links across the homepage and archive. Browser checks cover the full-card click target, keyboard navigation, and reduced-motion tilt. |
| Visual review | Desktop and mobile screenshots confirm the compact editorial layout. The homepage retains two cards per desktop row and a centered final card. |
| External links | All seven GitHub repositories, all seven pinned icon sources, and Velora’s Google Play listing returned HTTP 200. |
| Case-study media | Visuals follow the written content. Desktop media containers use 40% of the content width. The original MeetingMinutes MP4 plays and the Sentinel GIF starts and stops. |
| Identity and résumé | The homepage uses Usman Qureshi. The top bar downloads the supplied PDF, and its SHA-256 matches the original. |
| Accessibility | Keyboard, touch, reduced-motion and no-WebGL checks passed. axe found zero WCAG A/AA violations on the homepage, archive, and Velora case study. |
| Routes and metadata | Seven case studies, nine social previews, the sitemap, robots, canonical tags, and the custom 404 passed. |

The supplied MeetingMinutes video remains the case-study demo. The seven repository icon sources are listed in the [media manifest](MEDIA_MANIFEST.md).

The original release’s Lighthouse results and Git checkpoints are recorded in the [phase reports](PHASE_REPORTS.md). The current revision is local. [Deployment instructions](DEPLOYMENT.md)

## Atmosphere and interaction refinement

| Check | Result |
| --- | --- |
| Production checks | ESLint, strict TypeScript and the Next.js production build passed. |
| Chrome browser suite | All 20 tests passed, including six viewport widths, keyboard and touch navigation, all seven project routes, and three axe scans with zero WCAG A/AA violations. |
| Motion | Verified the 2° tilt limit, pointer spotlight tracking, icon lift, and the static reduced-motion behavior for both cards and Projects parallax. |
| Local motion sampling | Synthetic pointer movement on a project card averaged 59.5 FPS across 120 animation frame intervals in headless Chrome. |
| Visual review | Reviewed the Projects section at 1440px and 390px and the Experience section at 1440px. |
| Links | Checked 37 unique internal destinations and anchors across nine pages. All seven repositories, the GitHub profile, and Velora’s Play Store listing returned HTTP 200. LinkedIn rejected the automated check with HTTP 999. |
