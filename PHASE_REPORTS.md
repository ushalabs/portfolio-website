# Phase reports

| Phase | Result |
| --- | --- |
| 0 · Audit and initialization | Initialized a standalone portfolio repository, discovered public sources through the GitHub connector, inspected shallow clones, and established the strict TypeScript project schema and design tokens. |
| 1 · Design system | Added the editorial type scale, page shell, focus treatment, and shared navigation and action styles. Staged diff passed Git whitespace checks. |
| 2 · Hero | Added a custom Three.js rotor, pointer and scroll response, a static vector fallback, and device and motion gating. Staged diff passed Git whitespace checks. |
| 3 · Featured projects | Integrated the featured trio in the requested order. Visually reviewed their media and checked that the referenced files exist. |
| 4 · Portfolio archive | Added 12 evidence-backed projects and a keyboard-operable category filter. Staged diff passed Git whitespace checks. |
| 5 · Case studies | Added statically generated detail routes, galleries, source material, and related work for every project. Staged diff passed Git whitespace checks. |
| 6 · Stack, about, and education | Added evidence-linked skill disclosures and a timeline for education and independent work. Strict TypeScript and ESLint passed. |
| 7 · Contact and navigation tools | Added direct contact links, clipboard feedback, verified byte-identical résumé downloads, mobile navigation, and a keyboard command palette. Strict TypeScript passed. |
| 8 · Motion and interaction | Added GSAP ScrollTrigger reveals, Motion press feedback, pointer cues, reading progress, and section-aware navigation. Local Chrome preview confirmed live 3D at 1440px and the static fallback at 390px. TypeScript and ESLint passed. |
| 9 · SEO and performance | Added canonical metadata, 14 generated social images, JSON-LD, sitemap, robots, and the custom 404. Deferred the WebGL path with motion, device, and capability checks. Production build, TypeScript, and ESLint passed. |
| 10 · Production QA | Production build, lint, strict TypeScript, all 15 Playwright checks, and npm audit passed. Lighthouse performance scored 100 desktop and 92 mobile, with 100 accessibility, best practices, and SEO on both. |
| 11 · Local delivery | Verified the clean portfolio checkout and separate RideGo remote. The accidental parent Git metadata was moved into temporary recovery storage. Delivery is local, with GitHub and Vercel commands in DEPLOYMENT.md. |

## Local commits through production QA

- 9230137 Initialize portfolio and audit verified project sources
- 87c45ff Establish the editorial layout and design system
- 8c66a79 Build the interactive rotor and static hero fallback
- 0b63ab0 Showcase Velora, MeetingMinutes AI, and Downshift
- d779ea7 Add the filterable project archive and verified catalog
- 68d2572 Publish evidence-backed case studies for the complete archive
- 023972e Add engineering stack, education, and about sections
- f209fb0 Enable contact, résumé downloads, and quick navigation
- 789fc66 Polish scroll, pointer, and navigation interactions
- 8ef9e9f Add search metadata, social previews, and performance gates
- b53526d Verify the production build and document Vercel readiness

## Reference-led portfolio refresh

- Aligned the homepage with the supplied reference and reduced the public catalog to seven projects.
- Rebuilt the card previews with far-right tilted devices, single-screen phone crops, and genuine desktop and dark browser captures.
- Moved case-study media below the written content, replaced the résumé section with a direct download, and standardized the site name to Usman Qureshi.
- Added browser coverage for the card geometry, media playback, and direct PDF download.

## Editorial Projects redesign

- Replaced homepage and archive previews with compact repository-icon cards and separate GitHub actions.
- Preserved the project order, category filters, and case-study media. Added pointer-responsive tilt with a reduced-motion fallback.
- Verified all seven repository and icon-source URLs and the Google Play listing.

## Atmospheric refinement

1. Connected the homepage sections below the hero with a shared charcoal backdrop, subtle violet lighting, grain, and a masked technical grid.
2. Layered the project card surfaces and icon frames, with four category-specific line patterns and a restrained pointer spotlight. Capped the combined tilt at 2°.
3. Added section and card numbering, editorial rules, and adjusted spacing while preserving the grid, featured order, and separate project actions.
4. Used ScrollTrigger for a small Projects lighting shift and short card reveals. Fine-pointer and motion preferences gate the spatial effects.
5. Passed the production checks and all 20 Chrome tests. Reviewed desktop and mobile screenshots and verified project destinations. [Acceptance report](ACCEPTANCE_REPORT.md)

## Lumen recording

- Replaced Lumen’s screenshot gallery with the supplied 1080p MP4 from Downloads and a preview frame extracted at 00:15.
- Kept the player at 70% desktop width with native controls and deferred video loading. The copied recording’s SHA-256 matches the supplied file.
- Updated the browser checks to cover Lumen’s player, byte-range delivery, and seeking.

## Project categories

- Added Desktop Apps, Mobile Apps, and AI Agents & Automations as the three visitor-facing categories on the homepage and project archive.
- Category controls filter the list, and card labels identify each project’s group. The All view retains the existing project order.
- Downshift and Lumen are desktop apps. Velora, Solvanta, and LeanMate are mobile apps. MeetingMinutes AI and Sentinel SecOps are grouped under AI Agents & Automations.

## Ordered project sections and additional agents

- Replaced category filters with three permanently visible sections, ordered Desktop Apps, Mobile Apps, then AI Agents & Automations. Each section retains the two-column desktop grid and uses semantic subgroup headings.
- Verified and added AI Sales Agent and Outbound SDR Agent using their actual public repository slugs, pinned source revisions, and repository logos.
- Added both agent detail pages through the shared registry, including technology, engineering approach, and documented challenges. No public live demo URL was present in either repository.
- Inspected both repository media inventories. Outbound SDR’s design reference is excluded from the screenshot gallery, and AI Sales Agent has no application captures.

## Shared atmosphere and motion

- Added a shared CSS/SVG backdrop behind the homepage sections, archive, detail pages, and 404. Its light and contour layers move slowly, and the homepage’s local lighting blends with it.
- Added short page entrance transitions for pathname navigation, including browser history and quick navigation. The header remains stable while the new content arrives.
- Staggered the hero’s title, supporting copy, actions, and facts. Added scroll reveals for headings, section copy, timeline entries, toolkit rows, and project cards.
- Updated Core focus to Full Stack & AI Automation. Added a rotating internal cube mechanism, animated glass reflections, and an orbital highlight. Rendering pauses outside the viewport and in hidden tabs.
- Reduced-motion preferences disable the ambient drift, page entrances, title animations, and scroll reveals and select the existing static cube fallback.

## Brand animation and navigation refinement

- Replaced the cube with the authentic Usha Labs mark, rendered as layered SVG with idle movement, pointer response, and a moving light reflection. Header and footer marks reuse the same paths.
- Added separate icon and wordmark hover effects, title underline and translation effects, navigation feedback, and hover responses for hero copy and facts. Keyboard and reduced-motion behavior remain supported.
- Replaced the technical contour backdrop with brighter, broad illuminated ribbon forms and a quieter grain layer.
- Integrated native old/new page snapshot transitions through `next-view-transitions`. All internal page links and quick navigation use the transition router. Same-page anchors use smooth scrolling. Browsers without the native API retain the page entrance fallback.
- Removed the obsolete prism assets and unused Three.js dependencies. Dependency audit returned zero vulnerabilities.

## Continuous background fix

- Removed the separate hero landscape, hero overlay and bottom border, homepage background wash, per-section lighting, and Projects spotlight.
- The shared site backdrop now continues behind the header, hero, homepage sections, archive, and detail pages. The sticky header uses a transparent blur for readability while scrolling.
- Removed the unused landscape asset and spotlight animation. Verified the hero-to-Projects boundary on desktop and mobile.
- Lint, TypeScript, the production build, and all 23 Chrome tests passed. The backdrop check verifies transparent section backgrounds and a single shared backdrop element.
