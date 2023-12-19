import React from 'react';
import { Share } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const ShareComponent = async (message) => {
    try {
        await Share.share({ message });
    } catch (error) {
        console.error('Error sharing:', error.message);
        alert('Error sharing: ' + error.message);
    }
};

const onShare = async () => {
    try {
        const storedLanguage = await AsyncStorage.getItem('language');
        if (storedLanguage) {
            const message = storedLanguage !== "en"
                ? "Je viens de trouver une pépite ! ✨ DeepConnect: l'application qui réinvente notre façon de communiquer. Voulez-vous essayer? Voici le lien:  https://drive.google.com/file/d/1Wjibv0C0Vu5tSJ4TOstFinRyFWBn-dxl/view?usp=sharing 🌟"
                : "I just found a gem! ✨ DeepConnect: the app that's reinventing the way we communicate. Wanna give it a try? Here's the link: https://drive.google.com/file/d/1Wjibv0C0Vu5tSJ4TOstFinRyFWBn-dxl/view?usp=sharing 🌟";
            await ShareComponent(message);
        } else {
            console.warn('Language not found in AsyncStorage');
        }
    } catch (error) {
        console.error('Error fetching language from AsyncStorage:', error.message);
        alert('Error fetching language: ' + error.message);
    }
};

export default onShare;
