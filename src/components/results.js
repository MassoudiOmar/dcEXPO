import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  BackHandler
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTranslation } from 'react-i18next';
import { useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


const Results = ({ navigation }) => {
  const { t } = useTranslation();
  const route = useRoute();
  const { category, selectedColor } = route.params;
  console.log(category, "categoy:index")
  const [level, setLevel] = useState()

  let checkLevel = async () => {
    try {
      let LevelName = category === 0 ? "COUPLE" : category === 1 ? "FAMILY" : "FRIENDS"
      const storedObject = await AsyncStorage.getItem(LevelName);
      let objectToStore = JSON.parse(storedObject);
      setLevel(objectToStore.LEVEL)

    } catch (error) {
      console.error('Error retrieving or updating object:', error);
    }
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
  useEffect(() => {
    checkLevel()
  }, [category])

  let addProgress = async () => {
    try {
      let LevelName = category === 0 ? "COUPLE" : category === 1 ? "FAMILY" : "FRIENDS"
      console.log(LevelName, "LevelName")
      const storedObject = await AsyncStorage.getItem(LevelName);
      if (storedObject !== null) {
        let objectToStore = JSON.parse(storedObject);
        console.log(objectToStore, "object")
        if (objectToStore.LEVEL === '1') {
          objectToStore.LEVEL = '2';
          objectToStore.NAME = 'Cœur';
        } else if (objectToStore.LEVEL === '2') {
          objectToStore.LEVEL = '3';
          objectToStore.NAME = 'Miroir';
        } else {
          console.log('Unsupported level.');
          return;
        }
        const updatedObject = JSON.stringify(objectToStore);
        console.log(updatedObject, "updatedobject")
        await AsyncStorage.setItem(LevelName, updatedObject);
        navigation.reset({
          routes: [
            { name: 'Questions', params: { previousRouteName: 'Results', selectedColor: selectedColor, index: category } },
          ],
        });
      } else {
        console.log('Object not found.');
      }
    } catch (error) {
      console.error('Error retrieving or updating object:', error);
    }
  }




  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/felicitations.png")}

        style={styles.imageBackground}
      >
        <View style={styles.innerContainer}>
          <View>
            <TouchableOpacity
              style={styles.menuItem1Element}
              activeOpacity={0.7}
            >
              <View style={styles.menuItem1InnerText}>
                <Text
                  style={{
                    color: "#53090F",
                    fontSize: RFValue(25),
                    fontWeight: 800,
                    fontFamily: 'Poppins-Bold'

                  }}
                >
                  {t('Congratulations')} !
                </Text>
                <Text
                  style={{
                    width: "100%",
                    padding: 10,
                    color: "#650A11",
                    fontWeight: 400,
                    textAlign: "center",
                    fontSize: RFValue(20),
                    fontFamily: 'Poppins-Regular'

                  }}
                >
                  {t('youAnswered')} 15 questions
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {
            level == 3 ?
              <View>
                <TouchableOpacity
                  style={styles.menuItem2Element}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuItem2InnerText}>
                    <TouchableOpacity onPress={() => {
                      navigation.reset({
                        routes: [
                          { name: 'Questions', params: { previousRouteName: 'Results', selectedColor: selectedColor, index: category } },
                        ],
                      });
                    }} style={{ flexDirection: "row", alignItems: "center" }}>
                      <Text
                        style={{
                          color: "#F4CFB9",
                          fontWeight: 500,
                          textAlign: "center",
                          fontSize: RFValue(15),
                          fontFamily: 'Poppins-Bold'
                        }}
                      >
                        {t('replay')}</Text>
                    </TouchableOpacity >
                  </View>
                </TouchableOpacity>
              </View>
              :
              (<>
                <View style={{ width: "100%", justifyContent: "center", alignItems: "center", height: "40%" }}>

                  <TouchableOpacity style={{
                    width: "80%", justifyContent: "center", alignItems: "center", backgroundColor: "#540106b8", borderRadius: 20, shadowColor: '#540106eb',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 50
                  }}>

                    <Text
                      style={{
                        width: "80%",
                        padding: 10,
                        color: "white",
                        fontWeight: 500,
                        textAlign: "center",
                        fontSize: RFValue(24),
                        fontFamily: 'Poppins-Bold',


                      }}
                    >
                      {t('nextlevel')}</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity
                    style={styles.menuItem2Element}
                    activeOpacity={0.7}
                  >
                    <View style={styles.menuItem2InnerText}>
                      <TouchableOpacity onPress={() => {
                        navigation.reset({
                          routes: [
                            { name: 'Questions', params: { previousRouteName: 'Results', selectedColor: selectedColor, index: category } },
                          ],
                        });
                      }} style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text
                          style={{
                            color: "#F4CFB9",
                            fontWeight: 500,
                            textAlign: "center",
                            fontSize: RFValue(15),
                            fontFamily: 'Poppins-Bold'
                          }}
                        >
                          {t('noNextLevel')}</Text>
                      </TouchableOpacity >
                    </View>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.menuItem3Element}
                    activeOpacity={0.7}
                    onPress={addProgress}
                  >
                    <View style={styles.menuItem3InnerText}>
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text
                          style={{
                            color: "#53090F",
                            fontWeight: 500,
                            textAlign: "center",
                            fontSize: RFValue(15),
                            fontFamily: 'Poppins-Bold'

                          }}
                        >
                          {t('moveToTheNextLevel')}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </>
              )
          }
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: "#562024",
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  menuItem1Element: {
    top: 0,
    left: 0,
    padding: 10,
    backgroundColor: "#F4CFB9",
    width: RFValue(300),
    height: RFValue(120),
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 20,
  },
  menuItem1InnerText: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 20,
    flex: 1,
  },

  menuItem2Element: {
    top: 0,
    left: 0,
    backgroundColor: "#650A11",
    width: RFValue(300),
    height: RFValue(40),
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderColor: "#F4CFB9",
    borderWidth: 2,
    borderRadius: 20,
    marginVertical: 5

  },
  menuItem2InnerText: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,

  },
  menuItem3Element: {
    top: 0,
    left: 0,
    backgroundColor: "#F4CFB9",
    width: RFValue(300),
    height: RFValue(40),
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 20,
    marginVertical: 5
  },
  menuItem3InnerText: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 30,
    flex: 1,
  },
});

export default Results;
