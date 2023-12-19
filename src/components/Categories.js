import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTranslation } from 'react-i18next';
import i18n from "../../i18n";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import CarouselInstruction from "../Instructions/CarouselInstruction";
import PlayButton from "../Instructions/PlayButton";
import LanguageButton from "../Instructions/LanguageButton";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import coupleCardImage from "../assets/images/test.png";
import familleCardImage from "../assets/images/test1.png";
import amisCardImage from "../assets/images/test2.png";
import line from "../assets/images/lines.png";
import checkFirstVisit from "../../apis"

const Categories = ({ navigation }) => {
  const { t } = useTranslation();
  const [selectedColor, setSelectedColor] = useState(0);
  console.log(selectedColor)
  const [data, setData] = useState(
    [
      { "color": "#04786e", "id": 0, "image": "packs/November2023/Mmni1xrBDrmz7F9xDdF4.png", "name": { "en": "en2", "fr": "fr2" }, "price": "125" },
      { "color": "#9d5e02", "id": 1, "image": "packs/November2023/Mmni1xrBDrmz7F9xDdF4.png", "name": { "en": "en2", "fr": "fr2" }, "price": "125" },
      { "color": "#660460", "id": 2, "image": "packs/November2023/7x7hG23K8ZyWUOeIFJa6.png", "name": { "en": "test pack english", "fr": "test pack french" }, "price": "123" },
      { "color": "#047144", "id": 3, "image": "packs/November2023/7x7hG23K8ZyWUOeIFJa6.png", "name": { "en": "test pack english", "fr": "test pack french" }, "price": "123" }
    ]
  );

  const [Instructions, setInstructions] = useState({ first: false, second: false, third: false });

  let controlInstructionScreens = (number) => {
    number === 1 ? setInstructions({ ...Instructions, first: false, second: true, third: false }) : number === 2 ? setInstructions({ ...Instructions, first: false, second: false, third: true }) : setInstructions({ ...Instructions, first: false, second: false, third: false })
  }
  const progress = useDerivedValue(() => {
    const targetValue =
      selectedColor === 0 ? withTiming(0, { duration: 400 }) :
        selectedColor === 1 ? withTiming(0.5, { duration: 400 }) :
          selectedColor === 2 ? withTiming(1, { duration: 400 }) :
            selectedColor === 3 ? withTiming(1.5, { duration: 400 }) :
              withTiming(2, { duration: 400 })

    return targetValue;
  }, [selectedColor, data]);

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 0.5, 1],
      ["#871B1B", "#9E9407", "#162B63"]
    );
    return { backgroundColor };
  });
  // const rStyle = useAnimatedStyle(() => {
  //   const colorValues = (data).map(item => item.color);

  //   // if (colorValues.length < 2) {
  //   //   // Ensure there are at least two color values
  //   //   colorValues.push("#A73526", "#000");
  //   // }

  //   const backgroundColor = interpolateColor(
  //     progress.value,
  //     [0, 0.5, 1, 1.5, 2],
  //     colorValues
  //   );

  //   return { backgroundColor };
  // });



  const handleButtonPress = (index) => {
    setSelectedColor(index);
  };

  useEffect(() => {
    gameSettings();
  }, []);

  useEffect(() => {
    fetchLanguageFromStorage();
  }, []);

  let gameSettings = async () => {
    try {
      const storedSettings = await AsyncStorage.getItem('SoundSetting');
      if (!storedSettings) {
        await AsyncStorage.setItem("SoundSetting", "true");
        await AsyncStorage.setItem("VibrateSetting", "true");
      }
    } catch (error) {
      console.log("damn")
    }
  };
  useEffect(() => {
    checkFirstVisit('Categories', setInstructions, Instructions)
  }, [])


  const fetchLanguageFromStorage = async () => {
    try {
      const storedLanguage = await AsyncStorage.getItem('language');
      if (storedLanguage) {
        i18n.changeLanguage(storedLanguage);
      }
      else {
        i18n.changeLanguage("en");
        await AsyncStorage.setItem('language', "en")
      }
    } catch (error) {
      console.error('Error fetching language from AsyncStorage:', error);
    }
  };
  useEffect(() => {
    SetData()
  }, [])

  let SetData = async () => {
    const FAMILY = { LEVEL: '1', NAME: 'Surface', };
    const COUPLE = { LEVEL: '1', NAME: 'Surface', };
    const FRIENDS = { LEVEL: '1', NAME: 'Surface', };
    const json1 = JSON.stringify(FAMILY);
    const json2 = JSON.stringify(COUPLE);
    const json3 = JSON.stringify(FRIENDS);
    try {
      await AsyncStorage.setItem('FAMILY', json1);
      await AsyncStorage.setItem('COUPLE', json2);
      await AsyncStorage.setItem('FRIENDS', json3);
    } catch (error) {
      console.error('Error saving data: ', error);
    }

  }



  const YourDataArray = [
    {
      title: "COUPLE",
      imageUrlSource: coupleCardImage,
      background: "#871B1B",
    },
    {
      title: t('FAMILY'),
      imageUrlSource: familleCardImage,
      background: "#9E9407",
    },
    {
      title: t('friends'),
      imageUrlSource: amisCardImage,
      background: "#162B63",
    },
  ];

  const renderItem = ({ item, index }) => {
    return (

      <View style={styles.carouselItem}>
        <TouchableOpacity activeOpacity={1.0} onPress={() => navigation.navigate("Questions", { selectedColor: item.background, index: index })}>
          <Image source={item.imageUrlSource} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={[styles.categoryText, { color: "#F4CFB9", fontFamily: "Poppins-SemiBold" }]}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  // const renderItem = ({ item, index }) => {
  //   return (

  //     <View style={styles.carouselItem}>
  //       <TouchableOpacity activeOpacity={1.0} onPress={() => navigation.navigate("Questions", { selectedColor: item.color, datadata: data })}>
  //         <SvgPack />
  //         <View style={styles.iconContainer}>

  //           <Image source={{
  //             uri: `https://trusting-babbage.41-231-54-163.plesk.page/storage/${item.image}`,
  //           }} style={{ height: 150, width: 150 }} />
  //         </View>
  //         <View style={styles.textContainer}>
  //           <Text style={[styles.categoryText, { color: "#F4CFB9", fontFamily: "Poppins-SemiBold" }]}>{item?.name?.en}</Text>
  //         </View>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };


  const handleCloseInstructions = async () => {
    try {
      await AsyncStorage.setItem('Categories', 'Done');
      controlInstructionScreens(1);
    } catch (error) {
      console.error('Error storing data in AsyncStorage:', error);
    }
  };

  return (
    <>

      <Animated.View style={[styles.container, rStyle]}>
        <ImageBackground
          source={line}
          style={styles.imageBackground}
        >
          <Animated.View style={{ alignItems: "center" }}>
            <Text style={styles.categories}>{t('chooseCategory')}</Text>
          </Animated.View>
          <View style={styles.innerContainer}>
            <Carousel
              data={YourDataArray}
              renderItem={renderItem}
              onSnapToItem={(index) => handleButtonPress(index)}
              sliderWidth={windowWidth}
              itemWidth={windowWidth * 0.76}
              layout={"default"}
            />
            <View style={{ position: "absolute" }}>
              <CarouselInstruction show={Instructions.first} onClose={handleCloseInstructions} />
            </View>
            <View style={{ alignItems: "center" }}>

              <PlayButton navigation={navigation} selectedColor={YourDataArray[selectedColor].background} index={selectedColor} show={Instructions.second} onClose={() => controlInstructionScreens(2)} />
            </View>
          </View>
          <View style={{ alignItems: "baseline" }}>
            <LanguageButton show={Instructions.third} onClose={() => controlInstructionScreens(3)} />
          </View>
        </ImageBackground>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  innerContainer: {
    flex: 1,
    alignItems: "center",

  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",

  },
  carouselItem: {
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: "99%",
    justifyContent: "center",
    alignItems: "center"
  },


  image: {
    width: RFValue(450),
    height: RFValue(450),

    resizeMode: "contain",
    shadowColor: "black",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
  textContainer: {
    position: "absolute",
    bottom: "10%",
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    position: "absolute",
    bottom: "30%",
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryText: {
    fontSize: RFValue(20),
    fontWeight: "500",
  },
  button: {
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
  categories: {
    fontSize: RFValue(27),
    textAlign: "center",
    color: "#F4CFB9",
    paddingTop: windowHeight * 0.05,
    width: "50%",
    fontFamily: "Poppins-Bold"
  },

});

export default Categories;
