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
    faLineChart,
} from "@fortawesome/free-solid-svg-icons";

import tw from "twrnc";

import Login from "./app/pages/Login";
import Home from "./app/pages/Home";
import Alarms from "./app/pages/Alarms";
import Metrics from "./app/pages/Metrics";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName="Login"
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === "Home") {
                                iconName = faHome;
                            } else if (route.name === "Alarms") {
                                iconName = faClock;
                            } else if (route.name === "Metrics") {
                                iconName = faLineChart;
                            } else if (route.name === "Login") {
                                iconName = faCog;
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
                    <Tab.Screen name="Metrics" component={Metrics} />
                    <Tab.Screen name="Login" component={Login} />
                </Tab.Navigator>
            </NavigationContainer>
            <StatusBar style="light" />
        </SafeAreaProvider>
    );
}
