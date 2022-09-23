import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "../../Style";

export default function Profile({ navigation }) {
    return (
        <SafeAreaView style={styles.page}>
            <LinearGradient
                colors={["#5a589a", "#312e81"]}
                style={styles.gradient}
            >
                <View style={styles.innerView}>
                    <Text style={styles.text}>Settings</Text>
                    <Button
                        title="Log Out"
                        onPress={() => {
                            AsyncStorage.removeItem("user");
                            navigation.navigate("Log-In");
                        }}
                    />
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}
