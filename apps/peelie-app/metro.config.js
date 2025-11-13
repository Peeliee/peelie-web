const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

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
