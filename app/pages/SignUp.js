import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useState } from "react";
import tw from "twrnc";
import PocketBase from "pocketbase";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState("");
    const client = new PocketBase("https://sleep-cycles.codymitchell.dev");

    const handleSubmit = async (e) => {
        e.preventDefault();
        client.users.create({
            email: email,
            password: password,
            passwordConfirm: passwordConfirm,
        })
            .then((response) => {
                console.log(response);
                window.location.reload();
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                setError(error.message);
            });
    }

    return (
        <View style={styles.page}>
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
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "80%",
                }}>
                    <Button
                        color="transparent"
                        title="Log In"
                        onPress={() => {
                            window.location.href = "/log-in";
                        }}
                    />
                    <Button
                        title="Submit"
                        onPress={handleSubmit}
                    />
                </View>
            </View>
        </View>
    );
}

var styles = StyleSheet.create({
    page: [tw`bg-indigo-900 h-full items-center justify-center`],
    innerView: [tw`h-30 w-full content-center justify-center items-center`],
    text: [tw`text-white text-2xl`],
    subheading: [tw`text-white text-lg`],
    errorText: [tw`text-red-500 text-xl`],
    input: [tw`bg-white h-48 w-4/5 rounded mb-3 p-2 text-lg`],
});
