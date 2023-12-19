import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
const windowWidth = Dimensions.get("window").width;
import { useTranslation } from 'react-i18next';
import Tooltip from 'react-native-walkthrough-tooltip';

import coupleCardImage from "../assets/images/test.png";
import familleCardImage from "../assets/images/test1.png";
import amisCardImage from "../assets/images/test2.png";

export default function CarouselInstruction({ show, onClose }) {
  const { t } = useTranslation();

  const YourDataArray = [
    {
      title: "COUPLE",
      imageUrlSource: coupleCardImage,
      background: "#A73526",
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
        <TouchableOpacity activeOpacity={1.0}>
          <Image source={item.imageUrlSource} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={[styles.categoryText, { color: "#F4CFB9", fontFamily: "Poppins-SemiBold" }]}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    show && (
      <Tooltip
        isVisible={show}
        content={<Text style={{ textAlign: "center", color: "white", fontFamily: "Poppins-SemiBold" }}>{t('instructionOne')}</Text>}
        placement="top"
       
        topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
        backgroundColor={"#000000ba"}
        useInteractionManager={true}
        onClose={onClose}
        contentStyle={{ backgroundColor: "#7E1212", alignItems: "center", justifyContent: "center" }}
        allowChildInteraction={true}
      >
        <Carousel
          data={YourDataArray}
          renderItem={renderItem}
          sliderWidth={windowWidth}
          itemWidth={windowWidth * 0.76}
          layout={"default"}
        />
        {/* <View style={{ position: "absolute", left: 250, top: 300 }}>
          <MaterialIcons name="swipe-left" style={styles.icons} />
        </View> */}
      </Tooltip>
    )
  );

}


const styles = StyleSheet.create({


  carouselItem: {
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: "99%",

  },


  image: {
    width: RFValue(450),
    height: RFValue(455),

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
  categoryText: {
    fontSize: RFValue(20),
    fontWeight: "500",
  },
  icons: {
    fontSize: 80,
    color: "white"
  }
});


