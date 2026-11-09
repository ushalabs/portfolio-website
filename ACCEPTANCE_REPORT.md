# Acceptance report

Validated locally on Windows with Node.js 24.12.0 and Chrome against the Next.js production server. The portfolio is ready for Vercel configuration and local delivery.

| Check | Result |
| --- | --- |
| ESLint | Passed |
| TypeScript strict check | Passed |
| Production build | Passed. Next.js generated 12 project pages and 14 social images alongside the homepage, archive, and search metadata routes. |
| Playwright | All 15 checks passed in 24.5 seconds. |
| Responsive layout | 360, 390, 768, 1024, 1440, and 1920px. No horizontal overflow on the homepage, archive, or Velora detail at those widths. |
| 3D | Live WebGL canvas changed in response to pointer and scroll. Reduced motion, touch, disabled WebGL, and disabled JavaScript paths preserved usable static content. |
| Accessibility | axe found zero WCAG A/AA violations on the homepage, archive, and Velora case study. Keyboard filter, command dialog, section links, and touch navigation passed. |
| Contact and résumés | Mail and telephone URI values, external contact hrefs, clipboard feedback, and both PDF downloads passed. Both PDFs matched the original SHA-256 hashes. |
| Route and metadata coverage | All 12 case-study routes, 14 Open Graph PNGs, 18 local media URLs, sitemap, robots, canonicals, and the custom 404 passed. |
| Source verification | All 12 GitHub project pages and 36 revision-pinned case-study evidence links returned HTTP 200. The repository asset URLs and public Loom preview were verified. |
| Dependency audit | Zero vulnerabilities reported by `npm audit`. |

## Lighthouse

Scores are local lab results for the homepage. The mobile run uses simulated mobile throttling.

| Profile | Performance | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Desktop | 100 | 100 | 100 | 100 |
| Mobile | 92 | 100 | 100 | 100 |

Largest Contentful Paint measured 0.7 seconds on desktop and 3.3 seconds on mobile. Both runs reported zero Cumulative Layout Shift. Accessibility results reflect the automated scans and the tested interactions.

## Content and delivery limits

- LinkedIn blocks automated requests with HTTP 999. The supplied profile address appears verbatim and the browser test verifies the link target.
- MeetingMinutes AI uses the genuine settings frame from the published Loom demo. LeanMate and IOneXa use their banners, RideGo uses its icon, and AI Sales Agent and ScrapWorks use text presentations.
- Slack HR Bot, Inventory Sync, Strategy Backtest Dashboard, and a separate Outbound SDR Agent were absent from public discovery.
- Production deployment and live-domain checks are pending the destination and final origin. [Deployment instructions](DEPLOYMENT.md)
