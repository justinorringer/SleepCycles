import { View, Text } from "react-native";
import { styles } from "../../Style";

export default function Home() {
    return (
        <View style={styles.page}>
            <View style={styles.innerView}>
                <Text style={styles.text}>Metrics</Text>
            </View>
        </View>
    );
};
