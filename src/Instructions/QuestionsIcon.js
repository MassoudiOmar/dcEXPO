import React from "react";
import {
    Text,
    TouchableOpacity,
StatusBar
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTranslation } from 'react-i18next';
import Ionicons from "react-native-vector-icons/Ionicons";
import Tooltip from 'react-native-walkthrough-tooltip';

export default function QuestionsIcon({ navigation, startTime, childData, selectedColor, show, onClose, level,index }) {
    const { t } = useTranslation();
    return (
        <Tooltip
            isVisible={show}
            content={<Text style={{ textAlign: "center", color: 'white', fontFamily: "Poppins-SemiBold" }}>{t('instructionSix')}</Text>}
            placement="bottom"
            topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
            backgroundColor={"#000000ba"}
            useInteractionManager={true}
            onClose={onClose}
            allowChildInteraction={true}
            contentStyle={{ alignItems: "baseline", backgroundColor: "#7E1212" }}

        >
            <TouchableOpacity
                onPress={() => navigation.navigate("Menu", { startTime, childData, selectedColor, level,index })}
            >
                <Ionicons name="menu-outline" size={RFValue(34)} color="#F4CFB9" />
            </TouchableOpacity>
        </Tooltip>
    )
}
