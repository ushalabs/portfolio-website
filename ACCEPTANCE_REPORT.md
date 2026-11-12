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
| Case-study media | Visuals follow the written content. The original MeetingMinutes MP4 plays and the Sentinel GIF starts and stops. |
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

## Case-study media refresh

- ESLint, strict TypeScript, the production build, and all 21 Chrome tests passed.
- Verified a gap under 32 CSS pixels below the desktop header, borderless project card icons, and a 70% desktop media width for the MeetingMinutes video, Sentinel GIF, LeanMate banner, and Downshift capture.
- Reviewed the three galleries in Chrome. Tests cover side-by-side desktop placement, keyboard scrolling at 390px, captions, and page overflow. All 17 gallery images loaded in the production preview.

## Lumen demo update

- Replaced the Lumen gallery with the supplied 69.5-second, 1920 × 1080 recording. SHA-256 matches the original in Downloads. The preview frame comes from 00:15 in that recording.
- ESLint, TypeScript and the production build passed. Browser checks verified native playback, seeking to 15 seconds, HTTP 206 byte-range delivery, and 70% desktop player width.
- The browser run passed 20 checks. The remaining grid geometry check sampled an active entrance animation. It now measures the reduced-motion layout and passed its targeted rerun.

## Project categories

- Added three category filters and matching card labels to the homepage and archive. Desktop Apps contains two projects, Mobile Apps contains three, and AI Agents & Automations contains two.
- Production build, lint, and TypeScript passed. Reviewed the filters at 1440px and 390px. Twenty browser checks passed in the full run. The filter check initially matched the contact section’s status region too. After scoping the count assertion to the project directory, its targeted rerun passed for both pages, including keyboard selection and restoring All.

## Ordered sections and agent additions

- Projects now displays three permanent sections in the requested order on the homepage and archive. Desktop Apps contains two projects, Mobile Apps contains three, and AI Agents & Automations contains four.
- Added AI Sales Agent and Outbound SDR Agent, including source-pinned content, genuine repository icons, detail routes, social previews, sitemap entries, and quick navigation destinations. Both repository and logo-source URLs returned HTTP 200.
- ESLint, strict TypeScript, production build, and all 21 Chrome tests passed. Coverage includes section order, all nine project destinations and icons, six viewport sizes, and zero violations in three axe WCAG A/AA scans.
- Visually reviewed the desktop and mobile Projects composition and the complete four-card AI section. Both new agent pages omit screenshot galleries because their repositories provide no verified application captures.

## Shared backgrounds, route entrances, and cube animation

- Production build, ESLint, and strict TypeScript passed. Browser coverage now includes 22 checks. The full run passed 21 checks. The media layout check was adjusted to measure static spacing with reduced motion and passed its targeted rerun.
- Verified route entrances for archive-to-detail and return navigation, browser history, ambient background animation, and reduced-motion cancellation. The cube changes at rest, responds to pointer and scroll input, and switches to its static fallback with reduced motion.
- Screenshot-gallery items are excluded from scroll transforms to keep their native keyboard scrolling and scroll snapping stable. Gallery keyboard checks passed after that adjustment.
- All six viewport widths passed without horizontal overflow. Three axe WCAG A/AA scans found zero violations. Production Chrome reported no page or shader errors during the live hero review.
- Reviewed desktop hero and detail-page captures and a 390px detail page. Sampling 120 animation frame intervals with the live cube and backdrop in headless Chrome averaged 60.0 FPS, with a 17.2ms 95th-percentile interval. This is a local sample.
