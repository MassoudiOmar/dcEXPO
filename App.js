import 'react-native-gesture-handler';
import React, { useEffect, useCallback } from "react"
import { StyleSheet, SafeAreaView } from "react-native";
import Root from "./src/root/root";
import './i18n';
import { registerRootComponent } from 'expo';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Font } from 'expo';

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [isLoaded] = useFonts({
    "Poppins-Regular": require("./src/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./src/assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./src/assets/fonts/Poppins-Bold.ttf"),
  });

  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync(); //hide the splashscreen
    }
  }, [isLoaded]);
  if (!isLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container} onLayout={handleOnLayout}>
      <Root />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black"
  },
});
registerRootComponent(App);
export default App;

