import { chromium, expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { projects } from "../src/data/projects";
import { categories } from "../src/data/project-types";
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
    await expect(page.locator("[data-featured] h3")).toHaveText(["Velora", "MeetingMinutes AI", "Downshift", "Sentinel SecOps", "Lumen", "Solvanta", "LeanMate"]);
    await expect(page.locator("#work .project-icon img")).toHaveCount(7);
    await expect(page.locator("#work [data-preview] img")).toHaveCount(7);
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
  await page.goto("/projects");
  await expect(page.getByRole("status")).toHaveText(`${projects.length} projects`);
  await page.getByRole("radio", { name: "All", exact: true }).focus();
  for (const category of categories) {
    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("radio", { name: category, exact: true })).toBeChecked();
    const count = projects.filter(item => item.category.includes(category)).length;
    await expect(page.getByRole("status")).toHaveText(count === 1 ? "1 project" : `${count} projects`);
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
  await page.getByText("Mobile", { exact: true }).click();
  await expect(page.getByRole("link", { name: "In practice · Velora" })).toBeVisible();
});

test("homepage project grid pairs the cards and centers the seventh", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText("Usman Qureshi");
  await expect(page.locator("#work [data-preview]")).toHaveCount(7);
  const cards = await page.locator("[data-featured]").evaluateAll(links => links.map(link => {
    const { x, y, width } = link.getBoundingClientRect();
    return { x, y, width };
  }));
  expect(cards[0].y).toBe(cards[1].y);
  expect(cards[2].y).toBeGreaterThan(cards[0].y);
  expect(cards[6].x + cards[6].width / 2).toBeCloseTo(720, 0);
  expect(cards[6].width).toBeCloseTo(cards[0].width, 0);
  const previews = await page.locator(".preview-device").evaluateAll(devices => devices.map(device => {
    const card = device.closest(".selected-project")!.getBoundingClientRect();
    const frame = device.getBoundingClientRect();
    const tilt = new DOMMatrix(getComputedStyle(device).transform);
    return {
      center: (frame.x + frame.width / 2 - card.x) / card.width,
      topEdgeClimbsRight: tilt.m12 < 0,
      bottomLeansLeft: tilt.m21 < 0,
    };
  }));
  expect(previews.every(preview => preview.center > .66 && preview.topEdgeClimbsRight && preview.bottomLeansLeft)).toBe(true);
  for (const slug of ["velora", "leanmate", "solvanta"]) {
    await expect(page.locator(`[data-featured="${slug}"] [data-preview]`)).toHaveAttribute("data-preview", "mobile");
  }
  await expect(page.locator('[data-featured="meetingminutes-ai"] .preview-screen img')).toHaveAttribute("src", /dark-preview/);
  await expect(page.locator('[data-featured="sentinel-secops"] .preview-screen img')).toHaveAttribute("src", /analyst-dark-preview/);
  await expect(page.locator('[data-featured="solvanta"] .preview-screen img')).toHaveAttribute("src", "/projects/solvanta/solar-phone-preview.webp");
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

test("project routes, media, canonical tags, previews and 404", async ({ page, request }) => {
  for (const project of projects) {
    const route = `/projects/${project.slug}`;
    expect((await page.goto(route))?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveText(`${project.title}.`);
    await expect(page.getByRole("link", { name: `GitHub for ${project.title}` })).toHaveAttribute("href", project.githubUrl);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${route}$`));
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", new RegExp(`/social/${project.slug}$`));
    for (const image of [project.icon, ...project.gallery]) {
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
    const media = detail.querySelector(".case-media-stack")!.getBoundingClientRect();
    const copy = detail.querySelector(".detail-grid")!.getBoundingClientRect();
    return { ratio: media.width / detail.getBoundingClientRect().width, belowCopy: media.top > copy.bottom };
  });
  expect(dimensions.ratio).toBeCloseTo(.4, 2);
  expect(dimensions.belowCopy).toBe(true);
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

  await page.goto("/projects/solvanta");
  await expect(page.locator(".case-media figcaption")).toContainText("Design reference");
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
    await page.locator('[data-featured="velora"]').click();
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
