import { Vibration } from 'react-native';


const startVibration = () => {
    Vibration.vibrate([1000], { interval: 1000 }); // Vibrate for 1 second every 1 second
};

const stopVibration = () => {
    Vibration.cancel(); 
};

export default startVibration