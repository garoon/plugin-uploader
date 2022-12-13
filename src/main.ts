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
      requiresArg: true,
    },
    username: {
      demandOption: true,
      default: process.env.GAROON_USERNAME,
      describe: "Garoon username",
      type: "string",
      requiresArg: true,
    },
    password: {
      demandOption: true,
      default: process.env.GAROON_PASSWORD,
      describe: "Garoon password",
      type: "string",
      requiresArg: true,
    },
    "plugin-path": {
      demandOption: true,
      describe: "existing plugin's zip path",
      type: "string",
      requiresArg: true,
    },
    "plugin-id": {
      describe: "plugin's id",
      type: "string",
      requiresArg: true,
    },
    "basic-auth-username": {
      describe: "username for Basic Authentication",
      default: process.env.GAROON_BASIC_AUTH_USERNAME,
      type: "string",
      requiresArg: true,
    },
    "basic-auth-password": {
      describe: "password for Basic Authentication",
      default: process.env.GAROON_BASIC_AUTH_PASSWORD,
      type: "string",
      requiresArg: true,
    },
    proxy: {
      describe: "IP or hostname for proxy server",
      default: process.env.HTTP_PROXY || process.env.HTTPS_PROXY,
      type: "string",
      requiresArg: true,
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

// yargs pass type definition including undifined and when default option is undifined, yargs catchs error.
// therefore, use as assertion in run function
run(
  argv["base-url"] as string,
  argv.username as string,
  argv.password as string,
  argv["plugin-path"],
  argv["plugin-id"],
  basicAuth,
  argv.proxy
);
