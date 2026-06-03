const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const STATIC_FRAMEWORK_LINE = '$RNFirebaseAsStaticFramework = true';
const PODFILE_PROPERTIES_LINE =
  "podfile_properties = JSON.parse(File.read(File.join(__dir__, 'Podfile.properties.json'))) rescue {}";
const REACT_NATIVE_POST_INSTALL = 'react_native_post_install(';
const NON_MODULAR_SETTING = 'CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES';
const RNFB_MESSAGING_MODULES_SETTING = 'CLANG_ENABLE_MODULES';
const NON_MODULAR_SNIPPET = `
    installer.pods_project.targets.each do |target|
      next unless ['RNFBApp', 'RNFBMessaging'].include?(target.name)

      target.build_configurations.each do |config|
        config.build_settings['${NON_MODULAR_SETTING}'] = 'YES'
        config.build_settings['${RNFB_MESSAGING_MODULES_SETTING}'] = 'NO' if target.name == 'RNFBMessaging'
      end
    end
`;

module.exports = function withFirebaseIosPods(config) {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const podfilePath = path.join(config.modRequest.platformProjectRoot, 'Podfile');

      patchPodfile(podfilePath);
      return config;
    },
  ]);
};

function patchPodfile(podfilePath) {
  let contents = fs.readFileSync(podfilePath, 'utf8');

  if (!contents.includes(STATIC_FRAMEWORK_LINE)) {
    contents = contents.replace(
      PODFILE_PROPERTIES_LINE,
      `${PODFILE_PROPERTIES_LINE}\n${STATIC_FRAMEWORK_LINE}`,
    );
  }

  if (!contents.includes(NON_MODULAR_SETTING)) {
    contents = insertAfterReactNativePostInstall(contents, NON_MODULAR_SNIPPET);
  } else if (!contents.includes(RNFB_MESSAGING_MODULES_SETTING)) {
    contents = contents.replace(
      `config.build_settings['${NON_MODULAR_SETTING}'] = 'YES'`,
      `config.build_settings['${NON_MODULAR_SETTING}'] = 'YES'\n        config.build_settings['${RNFB_MESSAGING_MODULES_SETTING}'] = 'NO' if target.name == 'RNFBMessaging'`,
    );
  }

  fs.writeFileSync(podfilePath, contents);
}

function insertAfterReactNativePostInstall(contents, snippet) {
  const start = contents.indexOf(REACT_NATIVE_POST_INSTALL);

  if (start === -1) {
    throw new Error('[with-firebase-ios-pods] react_native_post_install not found in Podfile.');
  }

  let depth = 1;
  let cursor = start + REACT_NATIVE_POST_INSTALL.length;

  while (cursor < contents.length && depth > 0) {
    const character = contents[cursor];

    if (character === '(') {
      depth += 1;
    } else if (character === ')') {
      depth -= 1;
    }

    cursor += 1;
  }

  if (depth !== 0) {
    throw new Error('[with-firebase-ios-pods] react_native_post_install call is not balanced.');
  }

  return `${contents.slice(0, cursor)}${snippet}${contents.slice(cursor)}`;
}
