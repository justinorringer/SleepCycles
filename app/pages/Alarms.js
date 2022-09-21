import React, { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PocketBase from "pocketbase";

import Moment from "react-moment";
import tw from "twrnc";

const client = new PocketBase("https://sleep-cycles.codymitchell.dev");

export default function Alarms() {
    const [alarms, setAlarms] = useState([]);

    const updateAlarms = async () => {
        client.records.getList("alarms", 1, 50).then((response) => {
            setAlarms(response.items);
        });
    }

    useEffect(() => {
        updateAlarms();
        client.realtime.subscribe('alarms', updateAlarms);

        return () => {
            client.realtime.unsubscribe();
        }
    }, []);

    return (
        <SafeAreaView style={[tw`h-full bg-indigo-900`]}>
            <View style={[tw`p-5 text-white`]}>
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
        <View style={[tw`p-5`]}>
            <Moment format="hh:mm a">{alarm.time}</Moment>
        </View>
    );
}
