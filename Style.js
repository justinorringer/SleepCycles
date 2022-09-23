import tw from "twrnc";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    page: [tw`h-full w-full`],
    gradient: [tw`w-full h-full`],
    sectionContainer: [
        tw`bg-slate-900 rounded-lg p-3 text-lg mb-1 opacity-85 w-95 border-solid border-white border`,
    ],
    sectionContainerNoBG: [tw`rounded-lg p-3 text-lg mb-1 w-95`],
    loginPage: [tw`bg-indigo-900 h-full items-center justify-center`],
    innerView: [tw`w-full h-full items-center my-2`],
    text: [tw`text-white text-base`],
    heading: [tw`text-white text-2xl py-4`],
    subheading: [tw`text-white text-lg`],
    errorText: [tw`text-red-500 text-xl mb-2`],
    input: [tw`bg-white w-full rounded mb-3 p-2 text-lg`],
    alarmContainer: [
        tw`bg-black rounded-lg p-3 text-lg mb-1 opacity-60 w-95 border-solid border-2 border-gray-700`,
    ],
    alarmInnerContainer: [
        {
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
        },
    ],
    alarmTitle: [tw`text-white text-xl`],
    alarmSubtitle: [tw`text-white text-sm`],
    featureImage: [tw`h-50 w-60 mt-12`],
    featureImageContainer: [tw`w-full h-60 items-center`],
    bottomAlignedContainer: [tw``],
});
