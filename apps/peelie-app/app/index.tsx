import { WebView } from "react-native-webview";
import { SafeAreaView, SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, Platform, Linking } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
    const router = useRouter();

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

    const handleMessage = (event) => {
        try {
            const data = JSON.parse(event.nativeEvent.data);
            console.log("버튼눌림");
            if (data.type === "OPEN_CAMERA") {
                router.push("/screen/CameraScreen");
            }

            if (data.type === "OPEN_INSTAGRAM") {
                const username = data.username;

                // 인스타 앱 열기
                const url = `instagram://user?username=${username}`;

                Linking.openURL(url).catch(() => {
                    // 앱 없으면 웹으로 fallback
                    Linking.openURL(`https://instagram.com/${username}`);
                });
            }
        } catch (e) {
            console.log("Invalid message", e);
        }
    };

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
                    source={{ uri: sourceUrl }}
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
                    onMessage={handleMessage}
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
