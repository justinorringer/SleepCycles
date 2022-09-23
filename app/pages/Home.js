import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LinearGradient } from "expo-linear-gradient";

import tw from "twrnc";
import { styles } from "../../Style";

import SleepFacts from "../assets/sleep-facts";

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

                        <View
                            style={[
                                styles.sectionContainer,
                                {
                                    flex: 1,
                                },
                            ]}
                        >
                            <Text style={[styles.subheading, tw`text-center`]}>
                                Tip!
                            </Text>
                            <SleepFacts
                                styles={[
                                    styles.text,
                                    {
                                        width: "80%",
                                        textAlign: "center",
                                        marginLeft: "10%",
                                    },
                                ]}
                            />
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
        height: 40,
    },
    timeBoxText: {
        textAlign: "center",
        color: "white",
        fontSize: 15,
    },
});
