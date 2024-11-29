const OSS_LICENSE = [
  "0BSD", // https://bozuman.cybozu.com/k/8979/show#record=10
  "BSD-2-Clause", // https://bozuman.cybozu.com/k/8979/show#record=10
  "BSD-3-Clause", // https://bozuman.cybozu.com/k/8979/show#record=10
  "Apache-2.0", // https://bozuman.cybozu.com/k/8979/show#record=11
  "MIT", // https://bozuman.cybozu.com/k/8979/show#record=12
  "ISC", // https://bozuman.cybozu.com/k/8979/show#record=16
  "WTFPL", // https://bozuman.cybozu.com/k/8979/show#record=18
  "Unlicense", // https://bozuman.cybozu.com/k/8979/show#record=27
];

const config = {
  analyze: {
    query: ":root > .prod", // license-manager uses npm query to search packages.
    allowLicenses: OSS_LICENSE, // If any package is found for which this option is not specified, analyze command will output errors.
    allowPackages: [
      'argparse', // https://bozuman.cybozu.com/k/36070/show#record=349
    ], // Packages specified with this option are allowed regardless of the license.
  },
};

module.exports = config;