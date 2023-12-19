// File: flipcard.js
import * as React from 'react';
import { Audio } from 'expo-av';

export async function shuffleSound() {
    try {
        const { sound } = await Audio.Sound.createAsync(
            require('../assets/soundEffect/shuffling2-85600.mp3')
        );

        await sound.playAsync();

        return sound; // Return the sound object for external use
    } catch (error) {
        console.error('Error loading or playing sound', error);
        return null;
    }
}

export function unloadshuffleSound(sound) {
    if (sound) {
        sound.unloadAsync();
    }
}
