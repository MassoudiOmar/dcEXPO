import React, { useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    Animated, Easing,
    StatusBar

} from 'react-native';
import FlipCard from "react-native-flip-card";
import { useTranslation } from 'react-i18next';
import Swiper from 'react-native-deck-swiper';
import Tooltip from 'react-native-walkthrough-tooltip';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const { width: wWidth } = Dimensions.get("window");
const IMAGE_WIDTH = wWidth * 0.8;
const IMAGE_WIDTH1 = wWidth * 0.82;
const aspectRatio = 510 / 360;

const data = [1, 2, 3];

export default function Card({ category, show, controlInstructionScreens, cardIndex }) {
    console.log(category, "zdzdyé")
    const { t } = useTranslation();
    const animations = useRef(data.map(() => new Animated.Value(0))).current;
    useEffect(() => {
        const delay = 500;
        const timeoutId = setTimeout(() => {
            Animated.stagger(300, animations.map((animation, index) => {
                return Animated.spring(animation, {
                    toValue: 1,
                    speed: 10,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                    delay: index * 150,
                });
            })).start();
        }, delay);
        return () => clearTimeout(timeoutId);
    }, [category, data]);

    const imageMapping = {
        0: require('../assets/images/test5.png'),
        1: require('../assets/images/yellowCard.png'),
        2: require('../assets/images/blueCard.png'),
    };

    return (
        <Tooltip
            isVisible={show}
            content={<Text style={{ textAlign: "center", color: "white", fontFamily: "Poppins-SemiBold" }}>{t('instructionFour')}</Text>}
            placement="top"
            // below is for the status bar of react navigation bar
            topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
            backgroundColor={"#000000ba"}
            onClose={() => { controlInstructionScreens() }}
            allowChildInteraction={false}
            accessible={false}
            contentStyle={{ alignItems: "baseline", backgroundColor: "#7E1212" }}

        >
            <Swiper
                containerStyle={{ backgroundColor: 'transparent' }}
                cards={data}
                renderCard={(card, index) => {
                    const rotateAnimation = animations[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [index % 2 === 0 ? -30 : 30, 0],
                    });

                    const slideAnimation = animations[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [index % 2 === 0 ? -wWidth * 1.5 : wWidth * 1.5, 0],
                    });

                    return (
                        <Animated.View
                            key={index}
                            style={[
                                styles.cardo,
                                {
                                    transform: [
                                        {
                                            translateX: slideAnimation,
                                        },
                                        {
                                            rotate: rotateAnimation.interpolate({
                                                inputRange: [-30, 30],
                                                outputRange: ['-30deg', '30deg'],
                                            }),
                                        },
                                    ],
                                },
                            ]}
                        >
                            <FlipCard
                                friction={200}
                                perspective={1000}
                                flipHorizontal={true}
                                flipVertical={false}
                                flip={!false}
                                clickable={true}
                            >
                                <TouchableOpacity activeOpacity={1.0} style={[styles.card, styles.card1]}>
                                    <TouchableOpacity activeOpacity={1.0} style={[styles.card, styles.specialcard]}>
                                    </TouchableOpacity> </TouchableOpacity>
                                <View style={{
                                    elevation: 50, // Android shadow
                                    shadowColor: 'black',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.2, // iOS shadow,
                                    width: IMAGE_WIDTH1 - 2,
                                    borderRadius: 20,
                                    height: IMAGE_WIDTH1 * aspectRatio - 2,
                                    justifyContent: "center", alignItems: "center", backgroundColor: category === 0 ? "#650A11" : category === 1 ? "#9E9407" : "#162B63"
                                }}>

                                    <Image
                                        source={imageMapping[cardIndex]}
                                        style={{
                                            width: IMAGE_WIDTH1,
                                            height: IMAGE_WIDTH1 * aspectRatio,
                                            borderColor: "black",
                                            borderWidth: 0.5,
                                            borderRadius: 20,

                                        }}
                                    />
                                    {index === 0 && (
                                        <View style={{ position: "absolute", top: IMAGE_WIDTH1 * aspectRatio - 150, left: IMAGE_WIDTH1 - 150 }}>
                                            <FontAwesome5 name="hand-point-up" style={styles.icons} />
                                        </View>
                                    )}

                                </View>
                            </FlipCard>
                        </Animated.View>
                    );
                }}
                cardIndex={0}
                stackSize={3}
                stackSeparation={40}
                useViewOverflow={Platform.OS === 'ios'}
                disableTopSwipe={true}
                disableBottomSwipe={true}
                stackScale={5}
            />

        </Tooltip>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardo: {
        alignItems: 'center',
        margin: 0, padding: 0,

    },
    card: {
        width: IMAGE_WIDTH * 1.04,
        height: IMAGE_WIDTH * aspectRatio * 1.025,
        borderRadius: 20,
        elevation: 50, // Android shadow
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2, // iOS shadow

    },
    card1: {
        backgroundColor: "#F4CFB9",
        borderWidth: 1,
        borderColor: "black",
        alignItems: "center",
        elevation: 50, // Android shadow
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2, // iOS shadow

    },
    icons: {
        fontSize: 90,
        color: "white",
    }
});
