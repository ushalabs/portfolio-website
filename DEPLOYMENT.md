# Deployment and verification

The portfolio builds with Next.js on Node.js 24. GitHub data and project media are checked in, so the site needs no GitHub credentials, API keys, database, or contact-form provider.

## Verify locally

```powershell
npm ci
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
npm audit
```

The browser suite starts the production build on port 3100. To use an installed Chrome instead of downloading Chromium, set `$env:PLAYWRIGHT_CHANNEL = 'chrome'` before running the suite.

## GitHub when the repository exists

Create the empty destination repository under the intended account and substitute its slug below. Run these commands from the portfolio directory.

```powershell
git status --short --branch
git remote -v
git remote add origin 'https://github.com/ushalabs/<new-repo>.git'
git push -u origin HEAD:main
```

## Vercel when a destination is selected

Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin, such as your Vercel production domain or custom domain. This value is used at build time for canonical URLs, the sitemap, and social metadata. Vercel’s project production URL is used when available and the override is unset. Preview builds are marked noindex.

To connect an existing Vercel project and deploy from the CLI, run the following and choose the intended account and project when prompted.

```powershell
npx vercel@latest login
npx vercel@latest link
npx vercel@latest env add NEXT_PUBLIC_SITE_URL production
npx vercel@latest deploy --prod
```

For Git-based deployment, import the new repository into Vercel, select the Next.js preset and Node.js 24, set the same production environment variable, and deploy `main`.

After deployment, verify the returned URL, a featured case study, both PDF downloads, `/robots.txt`, `/sitemap.xml`, and a project social image. Check that canonical URLs use the production origin. [Vercel Next.js documentation](https://vercel.com/docs/frameworks/full-stack/nextjs) · [Vercel CLI deployment documentation](https://vercel.com/docs/cli/deploy)
