const OSS_LICENSE = [
  "GPL-2.0-only", // https://bozuman.cybozu.com/k/8979/show#record=1
  "GPL-3.0-only", // https://bozuman.cybozu.com/k/8979/show#record=1
  "EUPL-1.1", // https://bozuman.cybozu.com/k/8979/show#record=3
  "MPL-1.0", // https://bozuman.cybozu.com/k/8979/show#record=4
  "MPL-1.1", // https://bozuman.cybozu.com/k/8979/show#record=4
  "MPL-2.0", // https://bozuman.cybozu.com/k/8979/show#record=4
  "LGPL-2.0-only", // https://bozuman.cybozu.com/k/8979/show#record=5
  "LGPL-2.1-only", // https://bozuman.cybozu.com/k/8979/show#record=5
  "LGPL-3.0-only", // https://bozuman.cybozu.com/k/8979/show#record=5
  "CDDL-1.0", // https://bozuman.cybozu.com/k/8979/show#record=6
  "CPL-1.0", // https://bozuman.cybozu.com/k/8979/show#record=7
  "EPL-1.0", // https://bozuman.cybozu.com/k/8979/show#record=8
  "YPL-1.0", // https://bozuman.cybozu.com/k/8979/show#record=9
  "YPL-1.1", // https://bozuman.cybozu.com/k/8979/show#record=9
  "BSD-2-Clause", // https://bozuman.cybozu.com/k/8979/show#record=10
  "BSD-3-Clause", // https://bozuman.cybozu.com/k/8979/show#record=10
  "0BSD", // https://bozuman.cybozu.com/k/8979/show#record=10
  "Apache-2.0", // https://bozuman.cybozu.com/k/8979/show#record=11
  "MIT", // https://bozuman.cybozu.com/k/8979/show#record=12
  "Sendmail", // https://bozuman.cybozu.com/k/8979/show#record=13
  "OpenSSL", // https://bozuman.cybozu.com/k/8979/show#record=14
  "CPOL-1.02", // https://bozuman.cybozu.com/k/8979/show#record=15
  "ISC", // https://bozuman.cybozu.com/k/8979/show#record=16
  "Artistic-1.0", // https://bozuman.cybozu.com/k/8979/show#record=17
  "Artistic-2.0", // https://bozuman.cybozu.com/k/8979/show#record=17
  "WTFPL", // https://bozuman.cybozu.com/k/8979/show#record=18
  "Zlib", // https://bozuman.cybozu.com/k/8979/show#record=20
  "OFL-1.1", // https://bozuman.cybozu.com/k/8979/show#record=26
  "Unlicense", // https://bozuman.cybozu.com/k/8979/show#record=27
  "CC0-1.0", // https://bozuman.cybozu.com/k/8979/show#record=28
];

const config = {
  analyze: {
    query: ":root > .dev", // license-manager uses npm query to search packages.
    allowLicenses: OSS_LICENSE, // If any package is found for which this option is not specified, analyze command will output errors.
    allowPackages: [
      'argparse', // https://bozuman.cybozu.com/k/36070/show#record=349
    ], // Packages specified with this option are allowed regardless of the license.
  },
};

module.exports = config;