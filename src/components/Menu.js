import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { useRoute } from "@react-navigation/native";
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import line from "../assets/images/lines.png";
import FirstItemInMenu from "../Instructions/FirstItemInMenu";
import SecondItemInMenu from "../Instructions/SecondItemInMenu";
import checkFirstVisit from "../../apis"

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Menu = ({ navigation }) => {
  const [Instructions, setInstructions] = useState({ first: false, second: false });

  const route = useRoute();
  const { selectedColor, startTime, childData, level, index } = route.params;
  const { t } = useTranslation();

  useEffect(() => {
    checkFirstVisit('Menu', setInstructions, Instructions)
  }, [])

  let controlInstructionScreens = (number) => {
    number === 1 ? setInstructions({ ...Instructions, first: false, second: true }) : number === 2 ? setInstructions({ ...Instructions, first: false, second: false }) : setInstructions({ ...Instructions, first: false, second: false })
  }
  const handleCloseInstructions = async () => {
    try {
      await AsyncStorage.setItem('Menu', 'Done');
      controlInstructionScreens(1);
    } catch (error) {
      console.error('Error storing data in AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={line}
        style={[styles.imageBackground, { backgroundColor: selectedColor }]}
      >
        <View style={styles.menuItem1}>
          <FirstItemInMenu show={Instructions.first} onClose={handleCloseInstructions} />
        </View>

        <View style={styles.menuItem2}>

          <SecondItemInMenu show={Instructions.second} level={level} onClose={() => controlInstructionScreens(2)} />
        </View>
        <View style={styles.menuItem3}>
          <View style={styles.menuItem3Element} activeOpacity={0.7}>
            <View style={{ flex: 1, justifyContent: "space-around", alignItems: "center" }}>
              <TouchableOpacity onPress={() => navigation.navigate("Setting", { startTime, childData, selectedColor, index })}>

                <Ionicons name="settings-sharp" style={styles.icons} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Rules", { startTime, childData, selectedColor, index })}>

                <Ionicons name="newspaper" style={styles.icons} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Avis", { startTime, childData, selectedColor, index })}>

                <Entypo name="chat" style={styles.icons} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 2, justifyContent: "space-around" }}>
              <TouchableOpacity onPress={() => navigation.navigate("Setting", { startTime, childData, selectedColor, index })}>

                <Text
                  style={{
                    color: "#650A11",
                    fontSize: RFValue(18),
                    fontWeight: 500,
                  }}
                >
                  {t('Parameters')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Rules", { startTime, childData, selectedColor, index })}>

                <Text
                  style={{
                    color: "#650A11",
                    fontSize: RFValue(18),
                    fontWeight: 500,
                  }}
                >
                  {t('GameRules')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Avis", { startTime, childData, selectedColor, index })}>

                <Text
                  style={{
                    color: "#650A11",
                    fontSize: RFValue(18),
                    fontWeight: 500,
                  }}
                >
                  {t('Avis')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.menuItem}>
          <View style={styles.QuitterbuttonContainer}>
            <TouchableOpacity
              onPress={() => navigation.reset({
                routes: [
                  { name: 'Categories' },
                ],
              })}
              style={styles.Quitterbutton}
              activeOpacity={0.7}
            >
              <Text style={styles.QuitterbuttonText}>  {t('LeaveTheGame')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ContinuerbuttonContainer}>
            <TouchableOpacity
              style={styles.Continuerbutton}
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Questions", { selectedColor, index })}
            >
              <Text style={styles.buttonText}>  {t('Continue')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

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
  QuitterbuttonContainer: {
    flex: 1, // Reduce this value to give less space
    justifyContent: "center",
    alignItems: "center",
  },
  Quitterbutton: {
    height: RFValue(40),
    width: windowWidth * 0.65,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#7E1212'
  },
  ContinuerbuttonContainer: {
    flex: 1.5, // Increase this value to give more space
    justifyContent: "flex-start",
    alignItems: "center",
  },
  Continuerbutton: {
    backgroundColor: "#F4CFB9",
    height: RFValue(40),
    width: windowWidth * 0.65,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  QuitterbuttonText: {
    color: "#fff",
    fontSize: RFValue(18),
  },
  buttonText: {
    color: "#650A11",
    fontSize: RFValue(20),
  },

  icons: {
    fontSize: RFValue(27),
    color: "#650A11",
  },
  outerCircle: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 2.5,
    borderColor: '#650A11',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 70,
    height: 70,
    backgroundColor: '#DFB2A5',
    borderRadius: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default Menu;
