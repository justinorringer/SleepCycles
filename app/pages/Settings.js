import { View, Text, StyleSheet, Button } from "react-native";
import tw from "twrnc";

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
}

var styles = StyleSheet.create({
    page: [tw`bg-indigo-900 h-full`],
    innerView: [tw`h-30 content-center justify-around items-center`],
    text: [tw`text-white text-2xl`],
});
