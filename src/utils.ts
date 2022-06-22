import puppeteer, { Browser, Page } from "puppeteer";
import chalk from "chalk";

const TIMEOUT_MILLISECOUNDS = 10000;
const UPLOAD_WAIT_MILLISECOUNDS = 5000;

export type BasicAuth = {
  username: string;
  password: string;
};

const launchBrowser = async (proxy: string | undefined): Promise<Browser> => {
  const args = proxy ? [`--proxy-server=${proxy}`] : [];
  return puppeteer.launch({ args });
};

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const login = async (
  baseUrl: string,
  browser: Browser,
  username: string,
  password: string,
  basicAuth: BasicAuth | null
): Promise<Page> => {
  const loginUrl: string = `${baseUrl}/login/?saml=off`;
  const page: Page = await browser.newPage();

  if (basicAuth) {
    await page.authenticate(basicAuth);
  }

  try {
    await page.goto(loginUrl);
  } catch (e) {
    throw new Error("Error: Target URL is invalid.");
  }

  console.log("Trying to login.....");

  try {
    await page.type(".form-username-slash > input.form-text", username);
    await page.type(".form-password-slash > input.form-text", password);
    await page.click(".login-button");
    await page.waitForNavigation({
      timeout: TIMEOUT_MILLISECOUNDS,
      waitUntil: "domcontentloaded",
    });
    console.log(chalk.green("Success Login!"));
    return page;
  } catch (e) {
    throw new Error("Error: Can not Login!");
  }
};

const update = async (
  page: Page,
  baseUrl: string,
  pluginId: number,
  pluginPath: string
): Promise<void> => {
  const pluginUrl = `${baseUrl}/g/system/plugin/view.csp?id=${pluginId}`;
  console.log(`Navigate to ${pluginUrl}`);
  await page.goto(pluginUrl);

  try {
    await page.waitForSelector(".js_plugin_update", {
      timeout: TIMEOUT_MILLISECOUNDS,
    });
  } catch (e) {
    throw new Error("Error: Can not view plugin detail page!");
  }

  await page.click(".js_plugin_update");
  const file = await page.$('.file_input_div > input[type="file"]');
  if (file === null) {
    throw new Error('Error: input[type="file"] is not found');
  }

  try {
    await file.uploadFile(pluginPath);
  } catch (e) {
    throw new Error("Error: Can not upload zip file!!");
  }

  console.log("Upload File.");
  console.log("Waiting for reading file...........");

  // ATTENTION: Garoon can't read the file immediately.
  // So, it needs to wait for five seconds.
  await sleep(UPLOAD_WAIT_MILLISECOUNDS);
  await page.evaluate(() => {
    const submitButton = document.querySelector<HTMLAnchorElement>(
      ".js_dialog_footer > .button1_main_grn > a[role=button]"
    );
    if (submitButton) {
      submitButton.click();
    } else {
      throw new Error("Error: Can not find upload button!");
    }
  });

  try {
    await page.waitForSelector(".plugin_detail_name_grn", {
      timeout: TIMEOUT_MILLISECOUNDS,
    });
    console.log(chalk.green("Success submitting file!"));
  } catch (e) {
    throw new Error("Error: Can not submit zip file!");
  }
};

const add = async (
  page: Page,
  baseUrl: string,
  pluginPath: string
): Promise<void> => {
  const pluginSettingUrl = `${baseUrl}/g/system/plugin/settings.csp`;
  console.log(`Navigate to ${pluginSettingUrl}`);
  await page.goto(pluginSettingUrl);
  try {
    await page.waitForSelector(".js_file_upload_wrapper", {
      timeout: TIMEOUT_MILLISECOUNDS,
    });
  } catch (e) {
    throw new Error("Error: Can not view plugin setting page!");
  }

  await page.click("#main_menu_part > .menu_item > .button_main_grn");
  const file = await page.$('.file_input_div > input[type="file"]');
  if (file === null) {
    throw new Error('Error: input[type="file"] is not found');
  }

  try {
    await file.uploadFile(pluginPath);
  } catch (e) {
    throw new Error("Error: Can not upload zip file!!");
  }

  console.log("Upload File.");
  console.log("Waiting for reading file...........");

  // ATTENTION: Garoon can't read the file immediately.
  // So, it needs to wait for five seconds.
  await sleep(UPLOAD_WAIT_MILLISECOUNDS);
  await page.evaluate(() => {
    const submitButton = document.querySelector<HTMLAnchorElement>(
      ".js_dialog_footer > .button1_main_grn > a[role=button]"
    );
    if (submitButton) {
      submitButton.click();
    } else {
      throw new Error("Error: Can not find upload button!");
    }
  });
  try {
    await page.waitForSelector(".plugin_list_area_grn", {
      timeout: TIMEOUT_MILLISECOUNDS,
    });
    console.log(chalk.green("success submitting file!"));
  } catch (e) {
    throw new Error("Error: Can not submit zip file!");
  }
};

export const run = async (
  baseUrl: string,
  username: string,
  password: string,
  pluginPath: string,
  pluginId: number | undefined,
  basicAuth: BasicAuth | null,
  proxy: string | undefined
): Promise<void> => {
  const browser = await launchBrowser(proxy);
  let page: Page;
  try {
    page = await login(baseUrl, browser, username, password, basicAuth);
    if (pluginId) {
      await update(page, baseUrl, pluginId, pluginPath);
    } else {
      await add(page, baseUrl, pluginPath);
    }
    await browser.close();
  } catch (e) {
    console.error(e);
    await browser.close();
  }
};
