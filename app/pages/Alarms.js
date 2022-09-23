import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PocketBase from "pocketbase";

import Moment from "react-moment";
import { styles } from "../../Style";
import moment from "moment";
const client = new PocketBase("https://sleep-cycles.codymitchell.dev");

export default function Alarms() {
    const [alarms, setAlarms] = useState([]);

    const updateAlarms = async () => {
        client.records.getList("alarms", 1, 50).then((response) => {
            setAlarms(response.items);
        });
    }

    const updateAlarm = async (id, alarm) => {
        client.records.update("alarms", id, alarm);
    }

    useEffect(() => {
        updateAlarms();
        client.realtime.subscribe('alarms', updateAlarms);

        return () => {
            client.realtime.unsubscribe();
        }
    }, []);

    return (
        <SafeAreaView style={styles.page}>
            <View style={styles.innerView}>
                <FlatList
                    data={alarms}
                    renderItem={({ item }) => <AlarmView alarm={item} updateAlarm={updateAlarm} />}
                    keyExtractor={(item) => item.id}
                />
            </View>
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
                    <Text style={styles.alarmSubtitle}><Moment format="hh:mm A">{alarm.time}</Moment></Text>
                </View>
                <View>
                    <Text style={[styles.alarmSubtitle]}><Moment format="ddd MM-DD-YYYY">{alarm.time}</Moment></Text>
                    <Button onPress={() => {
                        setExpanded(!expanded)
                    }} />
                </View>
            </View>
            {expanded && <View style={styles.alarmExpandingContainer}>
                <DateTimePicker
                    defaultValue={moment(alarm.time).format("YYYY-MM-DDTkk:mm")}
                    onChange={(e) => {
                        const newTime = moment(e.target.value).toISOString();
                        updateAlarm(alarm.id, { time: newTime })
                    }}
                />
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