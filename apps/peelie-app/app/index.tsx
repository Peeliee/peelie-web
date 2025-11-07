// app/index.tsx
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
    const DEV_URL = "http://10.221.43.192:5173";
    const PROD_URL = "https://peelie.vercel.app";
    const sourceUrl = __DEV__ ? DEV_URL : PROD_URL;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <WebView
                source={{ uri: "http://10.30.99.128:5173/" }}
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
                injectedJavaScript={`
          window.ReactNativeWebView.postMessage(document.title);
          true;
        `}
            />
        </SafeAreaView>
    );
}
