import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ImageBackground
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../../i18n";
import { useRoute } from "@react-navigation/native";
import line from "../assets/images/lines.png";

const Setting = ({ navigation }) => {
    const [isIconsVisible, setIconsVisible] = useState(true);
    const [isIconsVisible1, setIconsVisible1] = useState(true);
    const [isLanguageVisible, setLanguageVisible] = useState("");

    const route = useRoute();
    const { childData, startTime, selectedColor,index } = route.params;
    useEffect(() => {
        async function getSoundSetting() {
            try {
                const serializedValue = await AsyncStorage.getItem("SoundSetting");
                if (serializedValue !== null) {
                    // Value exists in AsyncStorage, parse it and set the state
                    const parsedValue = JSON.parse(serializedValue);
                    setIconsVisible(parsedValue);
                } else {
                    setIconsVisible(true);

                }
            } catch (error) {
                console.error("Error retrieving SoundSetting:", error);
            }
        }

        async function getVibrateSetting() {
            try {
                const serializedValue = await AsyncStorage.getItem("VibrateSetting");
                if (serializedValue !== null) {
                    // Value exists in AsyncStorage, parse it and set the state
                    const parsedValue = JSON.parse(serializedValue);
                    setIconsVisible1(parsedValue);
                } else {

                    setIconsVisible1(true);
                }
            } catch (error) {
                console.error("Error retrieving VibrateSetting:", error);
            }
        }

        getSoundSetting();
        getVibrateSetting();
    }, []);

    let SoundSetting = async () => {
        const serializedObject = JSON.stringify(!isIconsVisible); // Toggle the value
        try {
            await AsyncStorage.setItem("SoundSetting", serializedObject);
            setIconsVisible(!isIconsVisible);

        } catch (error) {
            console.error("Error storing SoundSetting:", error);
        }
    };

    let VibrateSetting = async () => {
        const serializedObject = JSON.stringify(!isIconsVisible1); // Toggle the value
        try {
            await AsyncStorage.setItem("VibrateSetting", serializedObject);
            setIconsVisible1(!isIconsVisible1);

        } catch (error) {
            console.error("Error storing VibrateSetting:", error);
        }
    };
    useEffect(() => {
        fetchLanguageFromStorage();
    }, []);

    const fetchLanguageFromStorage = async () => {
        try {
            const storedLanguage = await AsyncStorage.getItem('language');
            if (storedLanguage) {
                i18n.changeLanguage(storedLanguage);
                setLanguageVisible(storedLanguage)

            }
            else {
                i18n.changeLanguage("en");
            }
        } catch (error) {
            console.error('Error fetching language from AsyncStorage:', error);
        }
    };
    const ChangeLanguageFromStorage = async () => {

        try {
            const storedLanguage = await AsyncStorage.getItem('language');
            if (storedLanguage) {
                const newLanguage = storedLanguage === "fr" ? "en" : "fr";
                await AsyncStorage.setItem('language', newLanguage);
                i18n.changeLanguage(newLanguage);
                setLanguageVisible(newLanguage)
            } else {
                await AsyncStorage.setItem('language', "en");
                i18n.changeLanguage("en");
                setLanguageVisible("en")
            }
        } catch (error) {
            console.error('Error fetching/changing language from AsyncStorage:', error);
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={line}
                style={[styles.imageBackground, { backgroundColor: selectedColor}]}
            >
                <View style={styles.container1}>

                    <View style={styles.innerContainer}>
                        <View style={styles.iconsContainer}>
                            <View>
                                {isIconsVisible ? (
                                    <MaterialIcons
                                        name="music-note"
                                        size={45}
                                        onPress={SoundSetting}
                                    />
                                ) : (
                                    <MaterialIcons
                                        name="music-off"
                                        size={45}
                                        style={styles.icons}
                                        onPress={SoundSetting}
                                    />
                                )}
                            </View>
                            <View>
                                {isIconsVisible1 ? (
                                    <MaterialCommunityIcons
                                        name="vibrate"
                                        size={45}
                                        style={styles.icons}
                                        onPress={VibrateSetting}
                                    />
                                ) : (
                                    <MaterialCommunityIcons
                                        name="vibrate-off"
                                        size={45}
                                        style={styles.icons}
                                        onPress={VibrateSetting}
                                    />
                                )}
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={ChangeLanguageFromStorage}
                            style={styles.languageButton}
                        >
                            <Text style={styles.languageText}>
                                Langue: {isLanguageVisible == "fr" ? "Français" : "English"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.goback}>
                        <MaterialIcons
                            name="arrow-back"
                            size={45}
                            style={[styles.icons, { color: "#650A11" }]}
                            onPress={() => navigation.navigate('Menu', { startTime, childData, selectedColor,index })}
                        />
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#650A11",
    },
    container1: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    imageBackground: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        backgroundColor: "#562024",
    },
    innerContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F4CFB9",
        width: "80%",
        height: "30%",
        borderRadius: 30,
        borderWidth: 2
    },
    iconsContainer: {
        flexDirection: "row",
        width: "80%",
        justifyContent: "space-around",
        flex: 1,
        alignItems: "center",
        borderWidth: 1,
        borderWidth: 2,
        borderColor: "#650A11",
        borderRadius: 20,
        margin: 20

    },

    languageButton: {
        flex: 1,
        justifyContent: "center",
    },
    languageText: {
        fontSize: 25,
        borderBottomWidth: 1,
        borderBottomColor: "#000",
    },
    goback: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F4CFB9",
        width: "30%",
        height: "8%",
        borderRadius: 40,
        borderWidth: 2,
        marginTop: 10
    }
});

export default Setting;
