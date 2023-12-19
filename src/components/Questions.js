import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  Vibration,
  BackHandler, Platform
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTranslation } from 'react-i18next';
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import Tarot from './Tarot';
import { useRoute } from '@react-navigation/native';
import line from "../assets/images/lines.png";
import felicitations from "../assets/images/felicitations.png";
import QuestionsIcon from "../Instructions/QuestionsIcon";
import AsyncStorage from '@react-native-async-storage/async-storage';
import checkFirstVisit from "../../apis"
import { useFocusEffect } from '@react-navigation/native';

const Questions = ({ navigation }) => {
  const { t } = useTranslation();
  const [Level, setLevel] = useState({});
  const [childData, setChildData] = useState(0);
  const [startTime, setStartTime] = useState();
  const route = useRoute();
  const { selectedColor, index } = route.params;
  const [Instructions, setInstructions] = useState({ first: false, second: false, third: false });
  let controlInstructionScreens = (number) => {
    number === 1 ? setInstructions({ ...Instructions, first: false, second: true, third: false }) : number === 2 ? setInstructions({ ...Instructions, first: false, second: false, third: true }) : setInstructions({ ...Instructions, first: false, second: false, third: false })
  }

  useFocusEffect(
    React.useCallback(() => {
      const handleBackPress = () => {
        navigation.reset({
          routes: [
            { name: 'Categories' },
          ],
        })
        return true;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

      return () => {
        backHandler.remove();
      };
    }, [navigation])
  );

  const receiveDataFromChild = () => {
    setChildData(childData + 1);
    childData === 13 ? Platform.OS === "ios" ? (setTimeout(() => clearInterval(setInterval(() => Vibration.vibrate(), 1000)), 1000)) : (Vibration.vibrate(1200)) : null
  };

  let checkProgress = async () => {
    try {
      let LevelName = index === 0 ? "COUPLE" : index === 1 ? "FAMILY" : "FRIENDS"
      let check1 = await AsyncStorage.getItem(LevelName);
      const parsedCheck1 = JSON.parse(check1);
      setLevel(parsedCheck1)
    } catch (error) {
      console.error('Error retrieving object:', error);
    }
  }
  useEffect(() => {
    setStartTime(new Date().getMinutes() + ":" + new Date().getSeconds())
  }, [index])

  useEffect(() => {
    checkProgress()
  }, [])

  useEffect(() => {
    checkFirstVisit('Questions', setInstructions, Instructions)
  }, [])

  const handleCloseInstructions = async () => {
    try {
      await AsyncStorage.setItem('Questions', 'Done');
      controlInstructionScreens(1);
    } catch (error) {
      console.error('Error storing data in AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={childData == 14 ? felicitations : line}
        style={[styles.imageBackground, { backgroundColor: selectedColor }]}
      >
        <View style={{ flex: 1, justifyContent: "flex-end", marginLeft: "9%" }}>
          <View style={{ alignItems: "baseline" }}>
            <QuestionsIcon onClose={() => controlInstructionScreens(3)} show={Instructions.third} index={index} navigation={navigation} selectedColor={selectedColor} childData={childData} startTime={startTime} level={Level} />
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Text
            style={{
              textAlign: "center",
              color: "#F4CFB9",
              fontSize: 17,
              fontWeight: 400,
              fontFamily: 'Poppins-Regular'

            }}
          >
            {t('Level')} {Level.LEVEL} : {t(Level.NAME)}
          </Text>
        </View>
        <View style={styles.cardContainer}>
          <Tarot show={Instructions.first} showTwo={Instructions.second} category={selectedColor} cardIndex={index} navigation={navigation} sendDataToParent={receiveDataFromChild} level={Level} childData={childData} controlInstructionScreens={handleCloseInstructions} closeButton={() => controlInstructionScreens(2)} />
        </View>

      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  cardContainer: {
    flex: windowHeight < 650 ? 17 : 8,
  },
  card: {
    width: RFValue(230),
    height: RFValue(300),
  },
});

export default Questions;
