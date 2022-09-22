import { View, Text, Button } from "react-native";
import { styles } from "../../Style";

export default function Settings() {
    return (
        <View style={styles.page}>
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
        </View>
    );
};
