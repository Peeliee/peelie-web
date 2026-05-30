const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");
// 외부 link 패키지 (분리 publish 시뮬). publish 후 npm install 흐름이면 이 줄은 필요 없음.
const localBridgeRoot = path.resolve(monorepoRoot, "../../webview-bridge-kit");

const config = getDefaultConfig(projectRoot);

// pnpm 모노레포 — workspace 패키지 + .pnpm 심볼릭 링크 해결.
// hierarchical lookup은 끄지 말 것 (.pnpm/<pkg>@<ver>/node_modules/* 도 Metro가 walk up해서 찾아야 함).
config.watchFolders = [monorepoRoot, localBridgeRoot];
config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, "node_modules"),
    path.resolve(monorepoRoot, "node_modules"),
];
// Metro 기본은 symlink 비추적. link로 의존한 외부 패키지를 위해 활성.
config.resolver.unstable_enableSymlinks = true;
// package.json의 exports 필드(sub-entry: /react-native, /testing 등) 지원.
config.resolver.unstable_enablePackageExports = true;

// SVG 설정
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== "svg");
config.resolver.sourceExts = [...config.resolver.sourceExts, "svg"];

// transformer 병합 (기존 설정 유지)
config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

// alias 설정 - @ 하나로 통일.
// react/react-native는 외부 link 패키지(webview-bridge-kit)가 자기 위치에서 별개 인스턴스를 끌어오지 않도록 강제 단일화.
// dual React가 되면 hook 호출 시 'Cannot read property useRef of null' 류 에러 발생.
config.resolver.alias = {
    "@": path.resolve(__dirname, "."),
    react: path.resolve(projectRoot, "node_modules/react"),
    "react-native": path.resolve(projectRoot, "node_modules/react-native"),
};

// 외부 link 패키지(webview-bridge-kit)가 자기 node_modules의 react를 잡지 않도록 강제 redirect.
// alias 만으론 walkup이 더 우선이라 안 통하는 경우가 있어 resolveRequest로 강제 단일화.
// publish 후 진짜 npm install이면 이 블록은 빼도 됨.
config.resolver.resolveRequest = (context, moduleName, platform) => {
    if (
        moduleName === "react" ||
        moduleName === "react-native" ||
        moduleName.startsWith("react/") ||
        moduleName.startsWith("react-native/")
    ) {
        return context.resolveRequest(
            { ...context, originModulePath: path.join(projectRoot, "index.js") },
            moduleName,
            platform,
        );
    }
    return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
