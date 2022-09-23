import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Button, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PocketBase from "pocketbase";

import { LinearGradient } from "expo-linear-gradient";

import { styles } from "../../Style";
import moment from "moment";
const client = new PocketBase("https://sleep-cycles.codymitchell.dev");
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReactNativeModernDatepicker from "react-native-modern-datepicker";

export default function Alarms() {
    const [alarms, setAlarms] = useState([]);
    const [newAlarmName, setNewAlarmName] = useState("");

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
        console.log(id, alarm);
        client.records.update("alarms", id, { time: new Date(alarm.time) })
            .catch((error) => {
                console.log(error);
            });

    };

    const addAlarm = async () => {
        const localUser = await AsyncStorage.getItem("user");
        const { user } = JSON.parse(localUser);
        client.records.create("alarms", {
            time: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
            user: user.id,
            name: newAlarmName,
        })
    };

    const deleteAlarm = async (id) => {
        client.records.delete("alarms", id)
            .catch((error) => {
                console.log(error);
            });
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
                    <View style={{
                        flexDirection: "row",
                        marginBottom: 20,
                    }}>
                        <Button title="SYNC" onPress={updateAlarms} />
                        <TextInput style={{
                            flex: 1,
                            backgroundColor: "white",
                            borderRadius: 5,
                            padding: 10,
                            marginLeft: 10,
                            minWidth: 100,
                        }} placeholder="Alarm Name" defaultValue={newAlarmName}
                            onChangeText={(text) => setNewAlarmName(text)}
                        />
                        <Button title="+ ADD ALARM" onPress={addAlarm} />
                    </View>
                    <FlatList
                        data={alarms}
                        renderItem={({ item }) => (
                            <AlarmView alarm={item} updateAlarm={updateAlarm} deleteAlarm={deleteAlarm} />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}

function AlarmView({ alarm, updateAlarm, deleteAlarm }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <View style={styles.alarmContainer}>
            <View style={styles.alarmInnerContainer}>
                <View>
                    <Text style={styles.alarmTitle}>{alarm.name}</Text>
                </View>
                <View>
                    <Text style={styles.alarmTitle}>
                        {moment(alarm.time).format("MM/DD/YY h:mm A")}
                    </Text>
                </View>

            </View>
            <Button title="UPDATE" onPress={() => setExpanded(!expanded)} />
            {expanded && (
                <>
                    <ReactNativeModernDatepicker
                        onSelectedChange={(date) => {
                            updateAlarm(alarm.id, {
                                time: date,
                            });
                        }}
                    />
                    <Button color={"red"} title="DELETE" onPress={() => deleteAlarm(alarm.id)} />
                </>)}
        </View>
    );
}
