import { View, Text, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { styles } from "../../Style";

export default function Profile() {
    return (
        <View style={styles.page}>
            <LinearGradient
                colors={["#5a589a", "#312e81"]}
                style={styles.gradient}
            >
                <View style={styles.innerView}>
                    <Text style={styles.text}>Settings</Text>
                    <Button
                        title="Log Out"
                        onPress={() => {
                            localStorage.removeItem("user");
                            window.location.reload();
                        }}
                    />
                </View>
            </LinearGradient>
        </View>
    );
}
