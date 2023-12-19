import React from 'react'
import Tooltip from 'react-native-walkthrough-tooltip';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    StatusBar

} from "react-native";
import { useTranslation } from 'react-i18next';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { RFValue } from "react-native-responsive-fontsize";
const wWidth = Dimensions.get("window").width;
const IMAGE_WIDTH = wWidth * 0.8;
const aspectRatio = 510 / 368;

export default function nextButton({ showTwo, onPress, onClose }) {
    const { t } = useTranslation();

    return (
        <Tooltip
            isVisible={showTwo}
            content={<Text style={{ textAlign: "center", color: 'white', fontFamily: "Poppins-SemiBold" }}>{t('instructionFive')}</Text>}
            placement="top"
            // below is for the status bar of react navigation bar
            topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
            allowChildInteraction={false}
            backgroundColor={"#000000ba"}
            onClose={onClose}
            contentStyle={{ alignItems: "baseline", backgroundColor: "#7E1212" }}
        >
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={onPress}
            >
                <Text style={styles.buttonText}>
                    {t('next')}
                </Text>
            </TouchableOpacity>
            <View style={{ position: "absolute", left: 180, bottom: -20 }}>
                {showTwo && <FontAwesome5 name="hand-point-up" style={styles.icons} />}
            </View>
        </Tooltip>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f2f2f2',
    },
    content: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'flex-start',

    },
    card: {
        width: IMAGE_WIDTH,
        height: IMAGE_WIDTH * aspectRatio,
        borderRadius: 20,
        ...Platform.OS === 'android'
            ? { elevation: 20, shadowColor: 'black' }
            : {
                shadowColor: 'red',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
            }
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonContainer: {
        flex: 1.5,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#F4CFB9",
        height: RFValue(40),
        width: wWidth * 0.6,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        flexDirection: "row",
    },
    buttonText: {
        color: "#650A11",
        fontSize: RFValue(20),
        fontFamily: 'Poppins-SemiBold'

    },
    icons: {
        fontSize: 50,
        color: "white",
    }
});

