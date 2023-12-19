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
const windowWidth = Dimensions.get("window").width;

export default function PlayButton({ show, onClose, navigation, selectedColor,index }) {
    const { t } = useTranslation();

    return (
        <Tooltip
            isVisible={show}
            content={<Text style={{ textAlign: "center", color: 'white', fontFamily: "Poppins-SemiBold" }}>{t('instructionTwo')}</Text>}
            placement="top"
            // below is for the status bar of react navigation bar
            topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
            useInteractionManager={true}
            allowChildInteraction={false}
            backgroundColor={"#000000ba"}
            onClose={onClose}
            contentStyle={{ alignItems: "baseline", backgroundColor: "#7E1212" }}
        >
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Questions", { selectedColor,index })}
            >
                <Text style={styles.buttonText}>{t('play')}</Text>
            </TouchableOpacity>
            <View style={{ position: "absolute", left: 200, bottom: -20 }}>
                {show && <FontAwesome5 name="hand-point-up" style={styles.icons} />}

            </View>
        </Tooltip>
    )
}

const styles = StyleSheet.create({
    buttonText: {
        color: "#650A11",
        fontSize: RFValue(20),
        fontFamily: "Poppins-SemiBold"
    }, button: {
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
    icons: {
        fontSize: 50,
        color: "white",
    }
})