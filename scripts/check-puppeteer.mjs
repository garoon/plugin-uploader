#!/usr/bin/env node

// puppeteer's install script only warns (exit code 0) when the browser
// download fails, so `pnpm install` looks successful. Verify the browser
// actually exists and fail the install otherwise.
import { existsSync } from "node:fs";
import puppeteer from "puppeteer";

const skipDownload =
  process.env.PUPPETEER_SKIP_DOWNLOAD ||
  process.env.PUPPETEER_SKIP_CHROME_DOWNLOAD;

if (!skipDownload) {
  let executablePath;
  try {
    executablePath = await puppeteer.executablePath();
  } catch (e) {
    console.error(e);
  }

  if (!executablePath || !existsSync(executablePath)) {
    console.error(
      [
        "",
        "ERROR: Failed to install the browser for puppeteer.",
        `  Expected executable: ${executablePath ?? "(unknown)"}`,
        "  Check the network/proxy settings and run `pnpm exec puppeteer browsers install chrome`,",
        "  or reinstall with `pnpm install --force`.",
        "",
      ].join("\n")
    );
    process.exit(1);
  }
}
