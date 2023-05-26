import { StatusBar } from "expo-status-bar";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import * as Notify from "expo-notifications";
import { styles } from "./style";

export default function App() {
    Notify.setNotificationHandler({
        handleNotification: async () => ({
            shouldPlaySound: true,
            shouldSetBadge: true,
            shouldShowAlert: true,
        }),
    });

    const handleCallNotification = async () => {
        const { status } = await Notify.requestPermissionsAsync();

        if (status !== "granted") {
            Alert.alert("Você precisa ativar a permissão para notificações");
        }

        await Notify.scheduleNotificationAsync({
            content: {
                title: "Nova notificação",
                body: "Agora funciona!",
                color: "#000",
            },
            trigger: { seconds: 1 },
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textline}>
                Esse app vai gerar uma notificação
            </Text>
            <StatusBar style="auto" />
            <TouchableOpacity
                style={styles.buttonNotification}
                onPress={handleCallNotification}
            >
                <Text style={styles.textButton}>Clique aqui</Text>
            </TouchableOpacity>
        </View>
    );
}
