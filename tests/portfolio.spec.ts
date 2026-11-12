import { chromium, expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { projects } from "../src/data/projects";
import { projectGroups } from "../src/data/project-types";
import { resumePath, site } from "../src/data/site";

for (const width of [360, 390, 768, 1024, 1440, 1920]) {
  test(`layout and navigation at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 940 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    for (const route of ["/", "/projects", "/projects/velora"]) {
      expect((await page.goto(route))?.status()).toBe(200);
      await expect(page.locator("main h1")).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      await expect(page.getByRole("link", { name: "Get in Touch", exact: true })).toBeVisible();
    }
    await page.goto("/");
    await page.getByRole("link", { name: "Explore Projects" }).click();
    await expect(page).toHaveURL(/#work$/);
    await expect(page.locator("[data-project] h3")).toHaveText(["Velora", "MeetingMinutes AI", "Downshift", "Sentinel SecOps", "Lumen", "Solvanta", "LeanMate"]);
    await expect(page.locator("#work .project-icon img")).toHaveCount(7);
    await expect(page.locator("#work img")).toHaveCount(7);
    if (width <= 830) {
      await page.getByLabel("Open navigation").click();
      await page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: "About" }).click();
      await expect(page).toHaveURL(/#about$/);
      await expect(page.getByRole("navigation", { name: "Mobile" })).toBeHidden();
    } else {
      await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Stack" }).click();
      await expect(page).toHaveURL(/#stack$/);
    }
    expect(errors).toEqual([]);
  });
}

test("keyboard filters, quick navigation, and disclosures", async ({ page }) => {
  for (const route of ["/", "/projects"]) {
    await page.goto(route);
    await expect(page.locator(".directory-count")).toHaveText(`${projects.length} projects`);
    await page.getByRole("radio", { name: "All", exact: true }).focus();
    for (const category of projectGroups) {
      await page.keyboard.press("ArrowRight");
      await expect(page.getByRole("radio", { name: category, exact: true })).toBeChecked();
      const selected = projects.filter(item => item.group === category);
      await expect(page.locator(".directory-count")).toHaveText(`${selected.length} projects`);
      await expect(page.locator(".project-card-link")).toHaveText(selected.map(item => item.title));
      await expect(page.locator(".project-card-category")).toHaveText(selected.map(() => category));
    }
    await page.getByRole("radio", { name: "All", exact: true }).check();
    await expect(page.locator(".project-card-link")).toHaveText(projects.map(item => item.title));
  }
  await page.keyboard.press("Control+k");
  await expect(page.getByRole("dialog", { name: "Quick navigation" })).toBeVisible();
  await page.getByRole("textbox", { name: "Search pages and projects" }).fill("downshift");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/projects\/downshift$/);
  await expect(page.locator("h1")).toContainText("Downshift");
  await page.keyboard.press("Control+k");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await page.goto("/#stack");
  await page.locator("#stack").getByText("Mobile", { exact: true }).click();
  await expect(page.getByRole("link", { name: "In practice · Velora" })).toBeVisible();
});

test("homepage project grid pairs the cards and centers the seventh", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText("Usman Qureshi");
  await expect(page.locator("#work .project-card")).toHaveCount(7);
  const cards = await page.locator("[data-project]").evaluateAll(items => items.map(item => {
    const { x, y, width } = item.getBoundingClientRect();
    return { x, y, width };
  }));
  expect(cards[0].y).toBe(cards[1].y);
  expect(cards[2].y).toBeGreaterThan(cards[0].y);
  expect(cards[6].x + cards[6].width / 2).toBeCloseTo(720, 0);
  expect(cards[6].width).toBeCloseTo(cards[0].width, 0);
  const scrollControl = await page.locator(".hero-scroll").evaluate(link => {
    const arrow = link.querySelector("svg")!.getBoundingClientRect();
    const control = link.getBoundingClientRect();
    return { width: arrow.width, offset: Math.abs(arrow.x + arrow.width / 2 - (control.x + control.width / 2)) };
  });
  expect(scrollControl.width).toBe(18);
  expect(scrollControl.offset).toBeLessThan(1);
});

test("touch navigation and static hero on a mobile device", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, isMobile: true, hasTouch: true, viewport: { width: 390, height: 844 } });
  try {
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator(".hero-visual")).toHaveAttribute("data-interactive", "false");
    await page.getByLabel("Open navigation").tap();
    await page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: "Project archive" }).tap();
    await expect(page).toHaveURL(/\/projects$/);
    await expect(page.getByRole("navigation", { name: "Mobile" })).toBeHidden();
  } finally {
    await context.close();
  }
});

test("editorial cards use repository icons and expose distinct working destinations", async ({ page, context }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/#work", "/projects"]) {
    await page.goto(route);
    await expect(page.locator(".project-card img")).toHaveCount(7);
    await expect(page.locator(".project-card video, .project-card picture, .project-card canvas")).toHaveCount(0);
    for (const project of projects) {
      const card = page.locator(`[data-project="${project.slug}"]`);
      await expect(card.getByRole("link", { name: project.title, exact: true })).toHaveAttribute("href", `/projects/${project.slug}`);
      await expect(card.getByRole("link", { name: `GitHub for ${project.title}` })).toHaveAttribute("href", project.githubUrl);
      await expect(card.locator(".project-card-description")).toHaveText(project.shortDescription);
      await expect(card.getByRole("list", { name: "Technologies" }).locator("li")).toHaveText([...project.tags]);
      const iconPath = await card.locator("img").evaluate(img => {
        const url = new URL((img as HTMLImageElement).src);
        return url.searchParams.get("url") ?? url.pathname;
      });
      expect(iconPath).toBe(project.icon?.src);
    }
  }

  const velora = page.locator('[data-project="velora"]');
  await expect(velora.getByRole("link", { name: "Google Play" })).toHaveAttribute("href", projects[0].playStoreUrl!);
  const github = projects[0].githubUrl;
  await context.route(github, route => route.fulfill({ body: "Repository destination" }));
  const detailLink = velora.getByRole("link", { name: "Velora", exact: true });
  await detailLink.focus();
  await page.keyboard.press("Tab");
  const githubLink = velora.getByRole("link", { name: "GitHub for Velora" });
  await expect(githubLink).toBeFocused();
  const popupPromise = page.waitForEvent("popup");
  await page.keyboard.press("Enter");
  const popup = await popupPromise;
  await expect(popup).toHaveURL(github);
  await expect(page).toHaveURL(/\/projects$/);
  await popup.close();

  const description = velora.locator(".project-card-description");
  await description.scrollIntoViewIfNeeded();
  const box = (await description.boundingBox())!;
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  await expect(page).toHaveURL(/\/projects\/velora$/);
});

test("project card tilt responds to the pointer and respects reduced motion", async ({ page }) => {
  await page.goto("/projects");
  const slot = page.locator('[data-project="velora"]');
  await slot.scrollIntoViewIfNeeded();
  const card = slot.locator(".project-card");
  await expect(card.locator(".project-icon")).toHaveCSS("border-top-width", "0px");
  const box = (await slot.boundingBox())!;
  await page.mouse.move(box.x + box.width * .9, box.y + box.height * .15);
  await expect(card).not.toHaveCSS("transform", "none");
  const readTilt = () => slot.evaluate(element => {
    const style = getComputedStyle(element);
    return Math.hypot(parseFloat(style.getPropertyValue("--project-tilt-x")), parseFloat(style.getPropertyValue("--project-tilt-y")));
  });
  await expect.poll(readTilt).toBeGreaterThan(1.5);
  expect(await readTilt()).toBeLessThanOrEqual(2.001);
  const lightX = await slot.evaluate(element => getComputedStyle(element).getPropertyValue("--project-light-x"));
  await page.mouse.move(box.x + box.width * .25, box.y + box.height * .3);
  await expect.poll(() => slot.evaluate(element => getComputedStyle(element).getPropertyValue("--project-light-x"))).not.toBe(lightX);
  await expect(card.locator(".project-icon")).not.toHaveCSS("transform", "none");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(card).toHaveCSS("transform", "none");
  await expect(card.locator(".project-icon")).toHaveCSS("transform", "none");
});

test("the homepage backdrop connects sections and its parallax respects reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const sections = page.locator(".portfolio-atmosphere > section");
  expect(await sections.evaluateAll(elements => elements.map(section => section.id))).toEqual(["work", "stack", "experience", "about", "contact"]);

  const patterns = await page.locator("#work .project-card").evaluateAll(cards => cards.map(card => getComputedStyle(card).getPropertyValue("--project-pattern")));
  expect(new Set(patterns).size).toBe(4);
  const light = page.locator(".work-atmosphere-light");
  await page.locator("#work").evaluate(section => window.scrollTo(0, section.getBoundingClientRect().top + window.scrollY + 300));
  await expect.poll(() => light.evaluate(element => new DOMMatrix(getComputedStyle(element).transform).m42)).toBeLessThan(-5);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(light).toHaveCSS("transform", "none");
  await expect(page.getByRole("link", { name: "Velora", exact: true })).toBeVisible();
});

test("project routes, media, canonical tags, previews and 404", async ({ page, request }) => {
  for (const project of projects) {
    const route = `/projects/${project.slug}`;
    expect((await page.goto(route))?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveText(`${project.title}.`);
    await expect(page.getByRole("link", { name: `GitHub for ${project.title}` })).toHaveAttribute("href", project.githubUrl);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${route}$`));
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", new RegExp(`/social/${project.slug}$`));
    for (const image of (project.icon ? [project.icon, ...project.gallery] : project.gallery)) {
      const response = await request.get(image.src);
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toMatch(/^image\//);
    }
    const og = await request.get(`/social/${project.slug}`);
    expect(og.status()).toBe(200);
    expect(og.headers()["content-type"]).toContain("image/png");
  }
  for (const slug of ["home", "archive"]) expect((await request.get(`/social/${slug}`)).status()).toBe(200);
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap.match(/<loc>/g)?.length).toBe(projects.length + 2);
  expect(await (await request.get("/robots.txt")).text()).toContain("Sitemap:");
  expect((await page.goto("/projects/missing-case-study"))?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Off the map." })).toBeVisible();
});

test("case studies keep the supplied and animated media below the write-up", async ({ page, request }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/projects/meetingminutes-ai");
  const video = page.getByLabel("MeetingMinutes AI screen recording");
  const dimensions = await page.locator(".detail").evaluate(detail => {
    const media = detail.querySelector(".case-media-wide")!.getBoundingClientRect();
    const copy = detail.querySelector(".detail-grid")!.getBoundingClientRect();
    const back = detail.querySelector(".back-link")!.getBoundingClientRect();
    const header = document.querySelector(".site-header")!.getBoundingClientRect();
    return { ratio: media.width / detail.getBoundingClientRect().width, belowCopy: media.top > copy.bottom, topGap: back.top - header.bottom };
  });
  expect(dimensions.ratio).toBeCloseTo(.7, 2);
  expect(dimensions.belowCopy).toBe(true);
  expect(dimensions.topGap).toBeLessThan(32);
  await expect(page.getByRole("heading", { name: "Source material" })).toHaveCount(0);
  await expect(video).toHaveAttribute("preload", "none");
  await expect(video.locator("source")).toHaveAttribute("src", "/projects/meetingminutes-ai/demo.mp4");
  await expect(page.locator('a[href*="loom.com"]')).toHaveCount(0);
  const response = await request.get("/projects/meetingminutes-ai/demo.mp4", { headers: { Range: "bytes=0-1023" } });
  expect(response.status()).toBe(206);
  expect(response.headers()["content-type"]).toContain("video/mp4");
  await video.evaluate(async element => {
    const player = element as HTMLVideoElement;
    player.muted = true;
    await player.play();
    player.pause();
  });

  await page.goto("/projects/sentinel-secops");
  const gif = page.getByRole("img", { name: "Sentinel SecOps dashboard demonstrating live threat detection" });
  await page.getByRole("button", { name: "Play GIF" }).click();
  await expect(gif).toHaveAttribute("src", "/projects/sentinel-secops/live-demo.gif");
  await page.getByRole("button", { name: "Stop GIF" }).click();
  await expect(gif).toHaveAttribute("src", /demo-poster/);

  for (const slug of ["sentinel-secops", "leanmate", "downshift", "lumen"]) {
    if (slug !== "sentinel-secops") await page.goto(`/projects/${slug}`);
    const ratio = await page.locator(".case-media-wide").evaluate(media => media.clientWidth / media.closest(".detail")!.clientWidth);
    expect(ratio).toBeCloseTo(.7, 2);
  }

  const lumenVideo = page.getByLabel("Lumen screen recording");
  await expect(page.getByRole("region", { name: "Lumen gallery" })).toHaveCount(0);
  await expect(page.getByText("Lumen product walkthrough")).toBeVisible();
  await expect(lumenVideo).toHaveAttribute("preload", "none");
  await expect(lumenVideo.locator("source")).toHaveAttribute("src", "/projects/lumen/demo.mp4");
  expect((await request.get("/projects/lumen/demo.mp4", { headers: { Range: "bytes=0-1023" } })).status()).toBe(206);
  const playback = await lumenVideo.evaluate(async element => {
    const player = element as HTMLVideoElement;
    player.muted = true;
    await player.play();
    await new Promise<void>(resolve => { player.onseeked = () => resolve(); player.currentTime = 15; });
    player.pause();
    return { position: player.currentTime, duration: player.duration };
  });
  expect(playback.position).toBeCloseTo(15, 0);
  expect(playback.duration).toBeGreaterThan(60);
});

test("Velora and Solvanta galleries show distinct labeled visuals side by side", async ({ page }) => {
  for (const { slug, title, count } of [
    { slug: "velora", title: "Velora", count: 4 },
    { slug: "solvanta", title: "Solvanta", count: 6 },
  ]) {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`/projects/${slug}`);
    const gallery = page.getByRole("region", { name: `${title} gallery` });
    const captions = await gallery.locator("figcaption").allTextContents();
    expect(new Set(captions).size).toBe(count);
    const images = gallery.getByRole("img");
    await expect(images).toHaveCount(count);
    const first = (await images.nth(0).boundingBox())!;
    const second = (await images.nth(1).boundingBox())!;
    expect(second.y).toBeCloseTo(first.y, 0);
    expect(second.x).toBeGreaterThan(first.x + first.width);
    if (slug === "solvanta") {
      await expect(page.getByText("Mobile UI design reference")).toBeVisible();
      await expect(images.first()).toHaveAttribute("height", "1280");
    }

    await page.setViewportSize({ width: 390, height: 844 });
    expect(await gallery.evaluate(element => element.scrollWidth > element.clientWidth)).toBe(true);
    await gallery.focus();
    await page.keyboard.press("ArrowRight");
    await expect.poll(() => gallery.evaluate(element => element.scrollLeft)).toBeGreaterThan(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
  }
});

test("direct contact, copy feedback, and the top-bar PDF download", async ({ page, context, request }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/#contact");
  for (const href of [`mailto:${site.email}`, site.telephone, site.github, site.linkedin]) await expect(page.locator(`#contact a[href="${href}"]`)).toBeVisible();
  await page.getByRole("button", { name: "Copy email" }).click();
  await expect(page.locator(".copy-email [role=status]")).toHaveText("Email copied.");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(site.email);
  const response = await request.get(resumePath);
  expect(response.status()).toBe(200);
  expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
  const event = page.waitForEvent("download");
  await page.getByRole("banner").getByRole("link", { name: "Resume" }).click();
  expect((await event).suggestedFilename()).toBe("usman-qureshi-resume.pdf");
  await expect(page.locator("#resumes")).toHaveCount(0);
});

test("3D responds to pointer and scroll and honors reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto("/");
  const visual = page.locator(".hero-visual");
  await expect(visual).toHaveAttribute("data-interactive", "true", { timeout: 18_000 });
  const canvas = visual.locator("canvas");
  const box = (await canvas.boundingBox())!;
  const before = await canvas.screenshot();
  await page.mouse.move(box.x + box.width * .12, box.y + box.height * .32);
  await expect.poll(async () => (await canvas.screenshot()).equals(before)).toBe(false);
  const tilted = await canvas.screenshot();
  await page.evaluate(() => window.scrollTo(0, 175));
  await expect.poll(async () => (await canvas.screenshot()).equals(tilted)).toBe(false);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(visual).toHaveAttribute("data-interactive", "false");
  await expect(canvas).toHaveCount(0);
  await expect(visual.locator(".hero-fallback")).toBeVisible();
});

test("WebGL unavailable and no JavaScript keep the portfolio usable", async ({ browser, baseURL }) => {
  const noGl = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || undefined, args: ["--disable-webgl"] });
  try {
    const fallback = await noGl.newPage({ viewport: { width: 1440, height: 900 } });
    await fallback.goto(baseURL!);
    await expect(fallback.locator(".hero-fallback")).toBeVisible();
    await fallback.waitForTimeout(850);
    await expect(fallback.locator(".hero-visual canvas")).toHaveCount(0);
  } finally {
    await noGl.close();
  }
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto(baseURL!);
    await expect(page.getByRole("heading", { name: "Projects", exact: true })).toBeVisible();
    await page.getByRole("link", { name: "Velora", exact: true }).click();
    await expect(page).toHaveURL(/\/projects\/velora$/);
  } finally {
    await context.close();
  }
});

for (const route of ["/", "/projects", "/projects/velora"]) {
  test(`axe WCAG A/AA scan of ${route}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(route);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(results.violations).toEqual([]);
  });
}
