# garoon-plugin-uploader
Garoon plugin uploader using [puppeteer](https://github.com/puppeteer/puppeteer).

Note: In environments where only SAML authentication is enabled, only Users & System Administrators can use this uploader to upload plugins. ([References](https://jp.cybozu.help/general/en/id/02036.html#list_saml_saml_restriction_20))

## Install

```
$ npm install -D @garoon/plugin-uploader
```

or

```
$ npm install -g @garoon/plugin-uploader
```

## Usage

```
$ cd your_project
```

### Apply the plugin to Garoon for the first time

```
$ garoon-plugin-uploader \
--base-url ${yourGaroonBaseUrl} \
--username ${yourLoginName} \
--password ${yourPassword} \
--plugin-path ${pluginZipPath}
```

### Update existing plugin

```
$ garoon-plugin-uploader \
--base-url ${yourGaroonBaseUrl} \
--username ${yourLoginName} \
--password ${yourPassword} \
--plugin-path ${pluginZipPath} \
--plugin-id ${pluginId}
```

## Options

```
$ garoon-plugin-uploader --help

Options:
  --version              Show version number                           [boolean]
  --base-url             Garoon base url to apply plugin's zip. example)
                         https://example.cybozu.com/         [string] [required]
  --username             Garoon username                     [string] [required]
  --password             Garoon password                     [string] [required]
  --plugin-path          existing plugin's zip path          [string] [required]
  --plugin-id            plugin's id                                    [string]
  --basic-auth-username  username for Basic Authentication               [string]
  --basic-auth-password  password for Basic Authentication               [string]
  --proxy                IP or hostname for proxy server                 [string]
  --help                 Show help                                     [boolean]
```

> You can set the values through environment variables.<br />
>  --base-url: GAROON_BASE_URL<br />
>  --username: GAROON_USERNAME<br />
>  --password: GAROON_PASSWORD<br />
>  --basic-auth-username: GAROON_BASIC_AUTH_USERNAME<br />
>  --basic-auth-password: GAROON_BASIC_AUTH_PASSWORD<br />
>  --proxy: HTTPS_PROXY or HTTP_PROXY<br />


## License

MIT License
