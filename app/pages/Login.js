import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useState } from "react";
import tw from "twrnc";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
        setError(`Email: ${email}\nPassword: ${password}`);
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
