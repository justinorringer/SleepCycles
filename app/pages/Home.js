import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../Style";
import tw from "twrnc";

import { LinearGradient } from "expo-linear-gradient";

export default function Home() {
    return (
        <SafeAreaView style={styles.page}>
            <LinearGradient
                colors={["#5a589a", "#312e81"]}
                style={styles.gradient}
            >
                <View style={styles.innerView}>
                    <Text style={styles.heading}>Sleep Cycles</Text>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.text}>Next Alarm: 10:00 AM</Text>
                    </View>

                    <View style={styles.sectionContainerNoBG}>
                        <View
                            style={[
                                tw`content-center justify-center items-center`,
                            ]}
                        >
                            <Text style={styles.subheading}>
                                Hit the hay by:
                            </Text>
                        </View>
                        <View style={local.split}>
                            <TimeBox time="1:00 AM" />
                            <TimeBox time="2:30 AM" />
                            <TimeBox time="4:00 AM" />
                        </View>
                    </View>

                    <View style={styles.bottomAlignedContainer}>
                        <View style={styles.featureImageContainer}>
                            <Image
                                source={require("../assets/sleepyPandaTransparent.png")}
                                style={styles.featureImage}
                            />
                        </View>

                        <View style={styles.sectionContainer}>
                            <Text
                                style={[styles.subheading, tw`content-center`]}
                            >
                                Tip!
                            </Text>
                            <Text style={styles.text}>
                                The average adult takes 14 minutes to fall
                                asleep.
                            </Text>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}

function TimeBox({ time }) {
    return (
        <View style={local.timeBox}>
            <Text style={local.timeBoxText}>{time}</Text>
        </View>
    );
}

var local = StyleSheet.create({
    split: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    timeBox: {
        backgroundColor: "#4a5568",
        borderRadius: 5,
        padding: 10,
        margin: 5,
    },
});
