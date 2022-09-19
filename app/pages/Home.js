import { View, Text, StyleSheet, FlatList } from "react-native";
import tw from "twrnc";

export default function Home() {
    return (
        <View style={styles.page}>
            <View style={[tw`h-30 content-center justify-center items-center`]}>
                <Text style={[tw`text-white text-2xl`]}>Sleep Cycles</Text>
            </View>
        </View>
    );
}

var styles = StyleSheet.create({
    page: [tw`bg-indigo-900 h-full`],
});
