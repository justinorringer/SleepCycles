import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faHome,
    faClock,
    faBell,
    faCog,
} from "@fortawesome/free-solid-svg-icons";

import tw from "twrnc";

import Home from "./app/pages/Home";
import Alarms from "./app/pages/Alarms";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName="Home"
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === "Home") {
                                iconName = faHome;
                            }
                            if (route.name === "Alarms") {
                                iconName = faClock;
                            }

                            // You can return any component that you like here!
                            return (
                                <FontAwesomeIcon
                                    icon={iconName}
                                    size={size}
                                    color={color}
                                />
                            );
                        },
                        headerShown: false,
                    })}
                >
                    <Tab.Screen name="Home" component={Home} />
                    <Tab.Screen name="Alarms" component={Alarms} />
                </Tab.Navigator>
            </NavigationContainer>
            <StatusBar style="light" />
        </SafeAreaProvider>
    );
}
