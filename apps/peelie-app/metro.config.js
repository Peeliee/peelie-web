const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// pnpm 모노레포 — workspace 패키지 + .pnpm 심볼릭 링크 해결.
// hierarchical lookup은 끄지 말 것 (.pnpm/<pkg>@<ver>/node_modules/* 도 Metro가 walk up해서 찾아야 함).
config.watchFolders = [monorepoRoot];
config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, "node_modules"),
    path.resolve(monorepoRoot, "node_modules"),
];

// SVG 설정
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== "svg");
config.resolver.sourceExts = [...config.resolver.sourceExts, "svg"];

// transformer 병합 (기존 설정 유지)
config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

// alias 설정 - @ 하나로 통일
config.resolver.alias = {
    "@": path.resolve(__dirname, "."),
};

module.exports = config;
