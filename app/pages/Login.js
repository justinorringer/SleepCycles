import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useState, useContext } from "react";
import tw from "twrnc";
import PocketBase from "pocketbase";
import { UserContext } from "../../App";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const client = new PocketBase("https://sleep-cycles.codymitchell.dev");
    const { user, setUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        client.users.authViaEmail(email, password)
            .then((response) => {
                console.log(response);
                const userState = {
                    isLoggedIn: true,
                    user: response.user,
                    token: response.token,
                };
                
                setUser(userState)
                localStorage.setItem("user", JSON.stringify(userState));
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                setError(error.message);
            });
    }

    return (
        <View style={styles.page}>
            <View style={styles.innerView}>
                <Text style={styles.text}>Log In</Text>
                <Text style={styles.subheading}>to continue with SleepCycles</Text>
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
                <Button
                    style={styles.text}
                    title="Submit"
                    onPress={handleSubmit}
                />
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
