import { View, Text, TextInput, Button } from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import PocketBase from "pocketbase";

import { styles } from "../../Style";

export default function SignUp({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState("");
    const client = new PocketBase("https://sleep-cycles.codymitchell.dev");

    const handleSubmit = async (e) => {
        e.preventDefault();
        client.users
            .create({
                email: email,
                password: password,
                passwordConfirm: passwordConfirm,
            })
            .then((response) => {
                console.log(response);
                navigation.navigate("Log-In");
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                setError(error.message);
            });
    };

    return (
        <SafeAreaView style={styles.loginPage}>
            <LinearGradient
                colors={["#5a589a", "#312e81"]}
                style={styles.gradient}
            >
                <View style={styles.innerView}>
                    <Text style={styles.text}>Sign Up</Text>
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
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Confirm Password"
                        placeholderTextColor={"#999"}
                        value={passwordConfirm}
                        onChangeText={(text) => setPasswordConfirm(text)}
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
                            title="Log In"
                            onPress={() => {
                                navigation.navigate("Log-In");
                            }}
                        />
                        <Button title="Submit" onPress={handleSubmit} />
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}
