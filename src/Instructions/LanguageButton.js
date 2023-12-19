import React from "react";
import {
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    StatusBar

} from "react-native";

import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { useTranslation } from 'react-i18next';
import Tooltip from 'react-native-walkthrough-tooltip';
import i18n from "../../i18n";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LanguageButton({ show, onClose }) {
    const { t } = useTranslation();


    const ChangeLanguageFromStorage = async () => {
        try {
            const storedLanguage = await AsyncStorage.getItem('language');
            if (storedLanguage) {
                const newLanguage = storedLanguage === "fr" ? "en" : "fr";
                await AsyncStorage.setItem('language', newLanguage); // Save the new language
                i18n.changeLanguage(newLanguage);
            } else {
                await AsyncStorage.setItem('language', "en");
                i18n.changeLanguage("en");
            }
        } catch (error) {
            console.error('Error fetching/changing language from AsyncStorage:', error);
        }
    };

    return (
        <Tooltip
            isVisible={show}
            content={<Text style={{ textAlign: 'center', color: 'white', fontFamily: "Poppins-SemiBold" }}>{t('instructionThree')}</Text>}
            placement="top"
            // below is for the status bar of react navigation bar
            topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
            useInteractionManager={!true}
            backgroundColor={"#000000ba"}
            withOverlay={!false}
            skipAndroidStatusBar={true}
            useReactNativeModal={true}
            onClose={onClose}
            contentStyle={{ alignItems: "baseline", backgroundColor: "#7E1212" }}

        >
            <TouchableOpacity onPress={ChangeLanguageFromStorage}
                style={styles.languageContainer}>
                <Image
                    source={{
                        uri: i18n.language === 'en' ? "https://img.freepik.com/premium-vector/great-britain-flag-flag-england-vector-icon-united-kingdom-flag-great-britain-10-eps_800531-104.jpg" : "https://cdn.britannica.com/82/682-004-F0B47FCB/Flag-France.jpg",
                    }}
                    style={styles.flagImage}
                />
                <Text style={styles.languageText}>{t('lange')}</Text>
            </TouchableOpacity>
        </Tooltip>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    innerContainer: {
        flex: 1,
        alignItems: "center",

    },
    imageBackground: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",

    },
    carouselItem: {
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        height: "99%",

    },


    image: {
        width: RFValue(450),
        height: RFValue(450),

        resizeMode: "contain",
        shadowColor: "black",
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.7,
        shadowRadius: 10,
    },
    textContainer: {
        position: "absolute",
        bottom: "10%",
        left: 0,
        right: 0,
        alignItems: "center",
        justifyContent: "center",
    },
    categoryText: {
        fontSize: RFValue(20),
        fontWeight: "500",
    },
    button: {
        backgroundColor: "#F4CFB9",
        height: RFValue(40),
        width: windowWidth * 0.7,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(100),
        marginBottom: RFValue(20),
        marginTop: RFValue(20),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: RFValue(3),
        },
        shadowOpacity: 0.27,
        shadowRadius: RFValue(4.65),
    },
    categories: {
        fontSize: RFValue(27),
        textAlign: "center",
        color: "#F4CFB9",
        paddingTop: windowHeight * 0.05,
        width: "50%",
        fontFamily: "Poppins-Bold"
    },
    buttonText: {
        color: "#650A11",
        fontSize: RFValue(20),
        fontFamily: "Poppins-SemiBold"
    },
    languageContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "left",
        marginLeft: RFValue(20),
        marginBottom: RFValue(20),
        height: RFValue(30),
    },
    flagImage: {
        width: RFValue(25),
        height: RFValue(25),
        borderRadius: RFValue(10),
        borderWidth: RFValue(3),
        borderColor: "#F4CFB9",
        resizeMode: "contain"
    },

    languageText: {
        marginLeft: RFValue(10),
        fontSize: RFValue(20),
        color: "#F4CFB9",
        fontFamily: "Poppins-Regular"
    },
});

