import { View, Text, Image, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LinearGradient } from "expo-linear-gradient";
import PocketBase from "pocketbase";
import AsyncStorage from "@react-native-async-storage/async-storage";

import moment from "moment";

import tw from "twrnc";
import { styles } from "../../Style";

import SleepFacts from "../assets/sleep-facts";

const client = new PocketBase("https://sleep-cycles.codymitchell.dev");

export default function Home() {
    const [recentAlarm, setRecentAlarm] = useState(null);
    const [recommended, setRecommended] = useState([]);

    const isFocused = useIsFocused();

    const updateRecentAlarm = async () => {
        const localUser = await AsyncStorage.getItem("user");
        const { user } = JSON.parse(localUser);

        client.records
            .getList("alarms", 1, 1, {
                filter: `user='${user.id}' && time>'${moment()
                    .utc()
                    .format("YYYY-MM-DD")}' && time<'${moment()
                    .add(2, "day")
                    .utc()
                    .format("YYYY-MM-DD")}'`,
                sort: "time",
            })
            .then((response) => {
                if (response.items.length > 0) {
                    setRecentAlarm(response.items[0]);

                    const time = moment.utc(response.items[0].time).local();
                    const diff = moment(time).diff(moment(), "minutes");

                    // lets do diff / 1 hour 30 minutes (as in how many cycles)
                    const cycles = Math.floor(diff / 1.5);

                    // now find the most upcomming sleep cycle start times
                    const cycleStarts = [];

                    let i = cycles > 6 ? 6 : cycles;
                    let j = 3; // number of loops (I know its lazy :( )
                    for (i; i > 0 && j > 0; i-- && j--) {
                        cycleStarts.push(
                            moment(time)
                                .subtract(i * 1.5, "hours")
                                .format("h:mm A")
                        );
                    }

                    setRecommended(cycleStarts);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        updateRecentAlarm();
    }, []);

    useEffect(() => {
        updateRecentAlarm();
    }, [isFocused]);

    return (
        <SafeAreaView style={styles.page}>
            <LinearGradient
                colors={["#5a589a", "#312e81"]}
                style={styles.gradient}
            >
                <View style={styles.innerView}>
                    <Text style={styles.heading}>Sleep Cycles</Text>
                    {recentAlarm == null ? (
                        <View style={styles.sectionContainer}>
                            <Text
                                style={[
                                    styles.text,
                                    {
                                        textAlign: "center",
                                    },
                                ]}
                            >
                                When are you waking up tomrrow?
                            </Text>
                        </View>
                    ) : (
                        <>
                            <View style={styles.sectionContainer}>
                                <Text
                                    style={[
                                        styles.text,
                                        {
                                            textAlign: "center",
                                        },
                                    ]}
                                >
                                    Tomorrow's Alarm:{" "}
                                    {moment
                                        .utc(recentAlarm.time)
                                        .local()
                                        .format("h:mm a")}
                                </Text>
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
                                    {recommended.map((time, index) => (
                                        <TimeBox key={index} time={time} />
                                    ))}
                                </View>
                            </View>
                        </>
                    )}

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
