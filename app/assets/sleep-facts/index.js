import { Text } from "react-native";

export default function SleepFacts({ styles }) {
    return (
        <Text style={styles}>
            {facts[Math.floor(Math.random() * facts.length)]}
        </Text>
    );
}

var facts = [
    "Sleeping less than 6 hours a night can increase your risk of heart disease by 48%.",
    "The average adult takes 14 minutes to fall asleep.",
    "Pandas sleep 10-16 hours a day.",
    "Pandas don't hibernate because they can't stop eating.",
    "A work out a day keeps the mean panda away.",
    "Getting sunlight in the morning can help you sleep better at night.",
    "Sleeping in on the weekends isn't good for you.",
    "Pandas sleep in on the weekends anyway.",
];
