import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PocketBase from "pocketbase";

import Moment from "react-moment";
import { LinearGradient } from "expo-linear-gradient";

import { styles } from "../../Style";
import moment from "moment";
const client = new PocketBase("https://sleep-cycles.codymitchell.dev");
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Alarms() {
    const [alarms, setAlarms] = useState([]);

    const updateAlarms = async () => {
        const localUser = await AsyncStorage.getItem("user");
        const { user } = JSON.parse(localUser);
        console.log(user);
        client.records.getList("alarms", 1, 50, {
            filter: `user='${user.id}'`,
        }).then((response) => {
            console.log(response);
            setAlarms(response.items);
        });
    };

    const updateAlarm = async (id, alarm) => {
        client.records.update("alarms", id, alarm);
    };

    useEffect(() => {
        updateAlarms();
    }, []);

    return (
        <SafeAreaView style={styles.page}>
            <LinearGradient
                colors={["#5a589a", "#312e81"]}
                style={styles.gradient}
            >
                <View style={styles.innerView}>
                    <FlatList
                        data={alarms}
                        renderItem={({ item }) => (
                            <AlarmView alarm={item} updateAlarm={updateAlarm} />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}

function AlarmView({ alarm, updateAlarm }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <View style={styles.alarmContainer}>
            <View style={styles.alarmInnerContainer}>
                <View>
                    <Text style={styles.alarmTitle}>{alarm.name}</Text>
                    <Text style={styles.alarmSubtitle}>Hello</Text>
                </View>
                <View>
                    <Text style={styles.alarmTitle}>
                        {moment(alarm.time).format("h:mm A")}
                    </Text>
                    <Button title="" onPress={() => {
                        setExpanded(!expanded);
                    }} />
                </View>
            </View>
            {expanded && <View style={styles.alarmExpandingContainer}>
                <Text style={styles.alarmSubtitle}>{alarm.recurring}</Text>
            </View>}
        </View>
    );
}

function DateTimePicker({ defaultValue, onChange }) {

    return React.createElement('input', {
        type: 'datetime-local',
        defaultValue: defaultValue,
        onInput: onChange,
    })
}
