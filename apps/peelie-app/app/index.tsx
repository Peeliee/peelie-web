// app/index.tsx
import { WebView } from "react-native-webview";
import { SafeAreaView, SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, Platform } from "react-native";

export default function HomeScreen() {
    const DEV_URL = "http://10.221.43.192:5173";
    const PROD_URL = "https://peelie.vercel.app";
    const sourceUrl = __DEV__ ? DEV_URL : PROD_URL;

    const insets = useSafeAreaInsets();

    const injectedJavaScript = `
        window.safeAreaInsets = {
            top: ${insets.top},
            bottom: ${insets.bottom},
            left: ${insets.left},
            right: ${insets.right}
        };
        true;
    `;

    return (
        <SafeAreaProvider>
            <SafeAreaView
                style={[
                    styles.container,
                    {
                        paddingBottom: Platform.OS === "ios" ? -20 : 0,
                    },
                ]}
            >
                <WebView
                    source={{ uri: "https://peelie.vercel.app" }}
                    originWhitelist={["*"]}
                    allowsInlineMediaPlayback
                    startInLoadingState
                    javaScriptEnabled
                    domStorageEnabled
                    mixedContentMode="always"
                    style={{ flex: 1 }}
                    onLoadStart={() => console.log("WebView 시작")}
                    onLoadEnd={() => console.log("WebView 완료")}
                    onError={(e) => console.log("WebView 오류:", e.nativeEvent)}
                    onMessage={(event) => console.log("📩 message:", event.nativeEvent.data)}
                    injectedJavaScript={injectedJavaScript}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
});
