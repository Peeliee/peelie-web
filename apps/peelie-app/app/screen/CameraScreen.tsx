import { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Alert, Dimensions, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import BackButton from "@/assets/backButton.svg";

const { width, height } = Dimensions.get("window");

const BOX_SIZE = 250;

const CameraScreen = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const cameraRef = useRef(null);
    const scanningRef = useRef(false);
    const router = useRouter();

    useEffect(() => {
        if (!permission?.granted) {
            requestPermission();
        }
    }, [permission]);

    const handleBarCodeScanned = ({ data, bounds }) => {
        if (scanned) return;
        if (scanningRef.current) return;

        // QR이 화면 중앙 박스 안에 있는지 체크
        if (bounds) {
            const { origin, size } = bounds;
            const centerX = origin.x + size.width / 2;
            const centerY = origin.y + size.height / 2;

            const boxLeft = (width - BOX_SIZE) / 2;
            const boxTop = (height - BOX_SIZE) / 2;
            const boxRight = boxLeft + BOX_SIZE;
            const boxBottom = boxTop + BOX_SIZE;

            const inside =
                centerX >= boxLeft &&
                centerX <= boxRight &&
                centerY >= boxTop &&
                centerY <= boxBottom;

            if (!inside) return; // 중앙 영역 바깥이면 무시
        }
        scanningRef.current = true;
        setScanned(true);

        Alert.alert("QR 코드 감지됨", `URL: ${data}`, [
            {
                text: "확인",
                onPress: () => {
                    scanningRef.current = false; // 리셋
                    router.back();
                },
            },
        ]);
    };

    if (!permission?.granted) {
        return <Text>카메라 권한이 필요합니다.</Text>;
    }

    return (
        <View style={styles.container}>
            <CameraView
                ref={cameraRef}
                style={StyleSheet.absoluteFillObject}
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            />

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
                activeOpacity={0.7}
            >
                <BackButton />
            </TouchableOpacity>

            <View style={styles.overlay}>
                <View style={styles.scannerBox} />
                <Text style={styles.text}>QR 코드를 박스 안에 맞춰주세요</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    backButton: {
        position: "absolute",
        top: 60,
        left: 20,
        zIndex: 20,
        // backgroundColor: "rgba(0,0,0,0.5)",
        // borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 6,
    },
    scannerBox: {
        width: BOX_SIZE,
        height: BOX_SIZE,
        borderWidth: 2,
        borderColor: "#ff8800",
        borderRadius: 16,
        backgroundColor: "rgba(0,0,0,0.1)",
    },
    text: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        marginTop: 20,
    },
});

export default CameraScreen;
