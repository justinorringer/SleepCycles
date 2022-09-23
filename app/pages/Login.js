import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useState, useContext, useEffect } from "react";
import tw from "twrnc";
import PocketBase from "pocketbase";
import { UserContext } from "../../App";

import { LinearGradient } from "expo-linear-gradient";

import { styles } from "../../Style";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const client = new PocketBase("https://sleep-cycles.codymitchell.dev");
    const { user, setUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        client.users
            .authViaEmail(email, password)
            .then((response) => {
                console.log(response);
                const userState = {
                    isLoggedIn: true,
                    user: response.user,
                    token: response.token,
                };
                
                setUser(userState)
                AsyncStorage.setItem("user", JSON.stringify(userState));
                navigation.navigate("Dashboard");
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                setError(error.message);
            });
    };

    useEffect(() => {
        if (user.isLoggedIn) {
            navigation.navigate("Dashboard");
        }
    }, [user]);

    return (
        <View style={styles.loginPage}>
            <LinearGradient
                colors={["#5a589a", "#312e81"]}
                style={styles.gradient}
            >
                <View style={styles.innerView}>
                    <Text style={styles.text}>Log In</Text>
                    <Text style={styles.subheading}>
                        to continue with SleepCycles
                    </Text>
                    <Text style={styles.errorText}>{error || " "}</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor={"#999"}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Password"
                        placeholderTextColor={"#999"}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "80%",
                        }}
                    >
                        <Button
                            color="transparent"
                            title="Sign Up"
                            onPress={() => {
                                navigation.navigate("Sign-Up");
                            }}
                        />
                        <Button title="Submit" onPress={handleSubmit} />
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}
