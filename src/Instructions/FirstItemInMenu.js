import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    StatusBar
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useRoute } from "@react-navigation/native";
import calculateTimeDifference from "../helpers/calculTime"
import { useTranslation } from 'react-i18next';
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import Tooltip from 'react-native-walkthrough-tooltip';

export default function FirstItemInMenu({ navigation, show, onClose }) {
    const route = useRoute();
    const dataReceived = route.params;
    const startTime = dataReceived.startTime
    const childData = dataReceived.childData
    const { t } = useTranslation();

    return (
        <Tooltip
            isVisible={show}
            content={<Text style={{ textAlign: "left", color: 'white', fontFamily: "Poppins-SemiBold" }}>{t('instructionSeven')} {'\n'}{'\n'}{t('instructionSevenOne')}{'\n'}{t('instructionSevenTwo')}</Text>}
            placement="bottom"
            // below is for the status bar of react navigation bar
            topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
            backgroundColor={"#000000ba"}
            useInteractionManager={true}
            onClose={onClose}
            contentStyle={{ alignItems: "baseline", backgroundColor: "#7E1212", marginLeft: -8.5 }}

        >
            <View style={styles.menuItem1Element}>

                <View style={styles.menuItem1InnerText}>
                    <View style={{ flexDirection: "row" }}>
                        <Text
                            style={{
                                color: "#650A11",
                                fontSize: RFValue(25),
                                fontWeight: 500,
                                marginRight: 10,
                                fontFamily: 'Poppins-SemiBold'
                            }}
                        >
                            {t('Goals')}
                        </Text>

                    </View>
                    <Text
                        style={{
                            color: "#650A11",
                            fontSize: RFValue(20),
                            fontFamily: 'Poppins-Bold'

                        }}
                    >
                        {calculateTimeDifference(
                            startTime,
                            new Date().getMinutes() + ":" + new Date().getSeconds()
                        )}
                        / 20:00
                    </Text>

                    <View style={{ color: "#650A11", fontSize: RFValue(17), flexDirection: "row", justifyContent: "center" }}>
                        <Text
                            style={{
                                color: "#650A11",
                                fontSize: RFValue(17),
                                fontWeight: 500,
                                fontFamily: 'Poppins-SemiBold'

                            }}
                        >
                            {t('RemainingQuestions')} :
                        </Text>
                        <Text style={{ color: "#650A11", fontSize: RFValue(17), marginLeft: 10 }}>

                           {childData} { childData < 15 ? "/" + 15 : null}
                        </Text>
                    </View>
                </View>
            </View>
        </Tooltip>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    menuItem1: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    menuItem2: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    menuItem3: {
        flex: 0.8,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    menuItem: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    imageBackground: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        backgroundColor: "#650A11",
    },
    text: {
        color: "white",
        fontSize: 18,
    },
    buttonContainer: {
        flex: 2, // This will take up 20% of the available space
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#F4CFB9",
        height: windowHeight * 0.2,
        width: windowWidth * 0.85,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
    buttonText: {
        color: "#650A11",
        fontSize: windowWidth * 0.05,
    },
    menuItem1Element: {
        top: 0,
        left: 0,
        padding: 10,
        backgroundColor: "#F4CFB9",
        width: RFValue(300),
        height: RFValue(140),
        borderColor: "black",
        borderWidth: 0.5,
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    menuItem2Element: {
        padding: 10,
        backgroundColor: "#F4CFB9",
        width: RFValue(300),
        height: RFValue(170),
        borderRadius: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        borderColor: "black",
        borderWidth: 0.5,
        borderRadius: 20,
    },
    menuItem3Element: {
        padding: 10,
        backgroundColor: "#F4CFB9",
        width: RFValue(300),
        height: RFValue(130),
        borderRadius: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        borderColor: "black",
        borderWidth: 0.5,
        borderRadius: 20,
    },
    menuItem1InnerText: {
        textAlign: "center",
        borderColor: "#650A11",
        borderWidth: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderRadius: 20,
        flex: 1,
        padding: 10
    },
    menuItem2InnerText: {
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderRadius: 20,
        flex: 1,
        padding: 20
    },

    QuitterbuttonContainer: {
        flex: 1, // Reduce this value to give less space
        justifyContent: "center",
        alignItems: "center",
    },
    Quitterbutton: {
        height: RFValue(40),
        width: windowWidth * 0.5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#F4CFB9",
    },
    ContinuerbuttonContainer: {
        flex: 1.5, // Increase this value to give more space
        justifyContent: "flex-start",
        alignItems: "center",
    },
    Continuerbutton: {
        backgroundColor: "#F4CFB9",
        height: RFValue(40),
        width: windowWidth * 0.5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
    },
    QuitterbuttonText: {
        color: "#F4CFB9",
        fontSize: RFValue(18),
    },
    buttonText: {
        color: "#650A11",
        fontSize: RFValue(20),
    },
    flagImage: {
        width: RFValue(50),
        height: RFValue(50),
        borderRadius: RFValue(100),
        borderWidth: RFValue(1),
        borderColor: "#650A11",
    },
    icons: {
        fontSize: RFValue(27),
        color: "#650A11",
    },
    outerCircle: {
        width: 80, // Adjust the size of the outer circle as needed
        height: 80, // Adjust the size of the outer circle as needed
        borderRadius: 100, // Half of the width and height to create a circle
        borderWidth: 2.5,
        borderColor: '#650A11',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        width: 70, // Adjust the size of the inner circle as needed
        height: 70, // Adjust the size of the inner circle as needed
        backgroundColor: '#DFB2A5',
        borderRadius: 50, // Half of the width and height to create a circle
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    outerCircle1: {
        width: 80, // Adjust the size of the outer circle as needed
        height: 80, // Adjust the size of the outer circle as needed
        borderRadius: 100, // Half of the width and height to create a circle
        borderWidth: 2.5,
        borderColor: '#DFB2A5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle1: {
        width: 70, // Adjust the size of the inner circle as needed
        height: 70, // Adjust the size of the inner circle as needed
        backgroundColor: '#650A11',
        borderRadius: 50, // Half of the width and height to create a circle
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    outerCircle2: {
        width: 80, // Adjust the size of the outer circle as needed
        height: 80, // Adjust the size of the outer circle as needed
        borderRadius: 40, // Half of the width and height to create a circle
        borderWidth: 2.5,
        borderColor: '#650A11', // Set the border color to transparent to hide the solid border
        borderStyle: 'dashed', // Use dashed style for the border
        justifyContent: 'center',
        alignItems: 'center',

    },
    innerCircle2: {
        width: 70, // Adjust the size of the inner circle as needed
        height: 70, // Adjust the size of the inner circle as needed
        backgroundColor: '#650A11',
        borderRadius: 50, // Half of the width and height to create a circle
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
