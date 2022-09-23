import React, { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PocketBase from "pocketbase";

import Moment from "react-moment";
import { styles } from "../../Style";

const client = new PocketBase("https://sleep-cycles.codymitchell.dev");

export default function Alarms() {
    const [alarms, setAlarms] = useState([]);

    const updateAlarms = async () => {
        client.records.getList("alarms", 1, 50).then((response) => {
            setAlarms(response.items);
        });
    };

    useEffect(() => {
        updateAlarms();
        client.realtime.subscribe("alarms", updateAlarms);

        return () => {
            client.realtime.unsubscribe();
        };
    }, []);

    return (
        <SafeAreaView style={styles.page}>
            <View style={styles.innerView}>
                <FlatList
                    data={alarms}
                    renderItem={({ item }) => <AlarmView alarm={item} />}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </SafeAreaView>
    );
}

function AlarmView({ alarm }) {
    return (
        <View style={styles.alarmContainer}>
            <Text style={styles.alarmTitle}>{alarm.name}</Text>
            <Text style={styles.alarmTitle}>
                <Moment format="hh:mm A">{alarm.time}</Moment>
            </Text>
            <Text style={[styles.alarmSubtitle]}>
                <Moment format="MM-DD-YYYY">{alarm.time}</Moment>
            </Text>
        </View>
    );
}
