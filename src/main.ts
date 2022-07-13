import yargs from "yargs";
import { BasicAuth, run } from "./utils";

const argv = yargs(process.argv.slice(2))
  .options({
    "base-url": {
      demandOption: true,
      default: process.env.GAROON_BASE_URL,
      describe:
        "Garoon base url to apply plugin's zip. example) https://example.cybozu.com/",
      type: "string",
    },
    username: {
      demandOption: true,
      default: process.env.GAROON_USERNAME,
      describe: "Garoon username",
      type: "string",
    },
    password: {
      demandOption: true,
      default: process.env.GAROON_PASSWORD,
      describe: "Garoon password",
      type: "string",
    },
    "plugin-path": {
      demandOption: true,
      describe: "existing plugin's zip path",
      type: "string",
    },
    "plugin-id": {
      describe: "plugin's id",
      type: "number",
    },
    "basic-auth-username": {
      describe: "username for Basic Authentication",
      default: process.env.GAROON_BASIC_AUTH_USERNAME,
      type: "string",
    },
    "basic-auth-password": {
      describe: "password for Basic Authentication",
      default: process.env.GAROON_BASIC_AUTH_PASSWORD,
      type: "string",
    },
    proxy: {
      describe: "IP or hostname for proxy server",
      default: process.env.HTTP_PROXY || process.env.HTTPS_PROXY,
      type: "string",
    },
  })
  .help()
  .locale("en")
  .parseSync();

const basicAuth: BasicAuth | null =
  argv["basic-auth-username"] && argv["basic-auth-password"]
    ? {
        username: argv["basic-auth-username"],
        password: argv["basic-auth-password"],
      }
    : null;

run(
  argv["base-url"],
  argv.username,
  argv.password,
  argv["plugin-path"],
  argv["plugin-id"],
  basicAuth,
  argv.proxy
);
