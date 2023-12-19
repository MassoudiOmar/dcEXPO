import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    Vibration,
    Animated, Easing,
    Button
} from 'react-native';
import FlipCard from "react-native-flip-card";
import { useTranslation } from 'react-i18next';
import { RFValue } from "react-native-responsive-fontsize";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import CardInstruction from '../Instructions/Card';
import onShare from '../helpers/Share';
import NextButton from '../Instructions/NextButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { flipcardSound, unloadflipcardSound } from '../helpers/sound';
import { shuffleSound, unloadshuffleSound } from '../helpers/SoundI';

import Swiper from 'react-native-deck-swiper';

const { width: wWidth, height } = Dimensions.get("window");
const IMAGE_WIDTH = wWidth * 0.8;
const IMAGE_WIDTH1 = wWidth * 0.82;
const aspectRatio = 510 / 360;
const BORDER_RADIUS = 25;

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const Tarot = ({ navigation, sendDataToParent, show, category, cardIndex, level, showTwo, controlInstructionScreens, closeButton }) => {
    const { t } = useTranslation();
    const [isFlipped, setisFlipped] = useState(false)
    const deckRef = useRef();
    const animations = useRef(data.map(() => new Animated.Value(0))).current;
    const [numbers, setnumbers] = useState([]);
    useEffect(() => {
        setnumbers(prevNumbers => {
            const randomNumbers = getRandomNumbers();
            return randomNumbers;
        });
    }, [data]);

    function getRandomNumbers() {
        const numbers = Array.from({ length: 15 }, (_, index) => index + 1);
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        return numbers;
    }
    const swipeRight = () => {
        if (deckRef.current) {
            if (deckRef.current._reactInternals && deckRef.current._reactInternals.memoizedState) {
                const isEvenSecondCardIndex = deckRef.current._reactInternals.memoizedState.secondCardIndex % 2 === 0;
                const swipeFunction = isEvenSecondCardIndex ? deckRef.current.swipeRight : deckRef.current.swipeLeft;
                performSwipe(swipeFunction);
            } else {
                console.log("Deck state not available");
            }
        } else {
            console.log("Deck reference not available");
        }
    };

    const performSwipe = (swipeFunction) => {
        swipeFunction();
        setisFlipped(false);
        sendDataToParent();
    };



    useEffect(() => {
        const delay = 550;

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
            playSoundIfEnabled("shuffleSound")
            vibrateIfEnabled()
        }, delay);
        return () => clearTimeout(timeoutId);
    }, [category, data]);

    async function playSoundIfEnabled(son) {
        let playflipCardSound, playShuffleSound;

        console.log(son, "eded");

        if (son === 'flipcard') {
            playflipCardSound = async () => {
                const sound = await flipcardSound();
                setTimeout(() => {
                    unloadflipcardSound(sound);
                }, 5000);
            };
        } else {
            playShuffleSound = async () => {
                const sound = await shuffleSound();
                // Example: Unload the sound after 5 seconds
                setTimeout(() => {
                    unloadshuffleSound(sound);
                }, 5000);
            };
        }

        try {
            const soundSetting = await AsyncStorage.getItem('SoundSetting');
            if (soundSetting !== null) {
                const parsedSetting = JSON.parse(soundSetting);
                if (parsedSetting) {
                    if (son === 'flipcard') {
                        playflipCardSound();
                    } else {
                        playShuffleSound();
                    }
                } else {
                    console.log('Sound setting is disabled');
                }
            } else {
                console.log('Sound setting not found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error reading SoundSetting from AsyncStorage:', error);
        }
    }



    async function vibrateIfEnabled() {
        try {
            const vibrateSetting = await AsyncStorage.getItem('VibrateSetting');
            if (vibrateSetting !== null) {
                const parsedSetting = JSON.parse(vibrateSetting);
                if (parsedSetting) {
                    if (Platform.OS === "ios") {
                        const interval = setInterval(() => Vibration.vibrate(), 1000);
                        setTimeout(() => clearInterval(interval), 1300);
                    } else {

                        Vibration.vibrate(1300);
                    }
                } else {
                    console.log('Vibrate setting is disabled');
                }
            } else {
                console.log('Vibrate setting not found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error reading VibrateSetting from AsyncStorage:', error);
        }
    }

    const imageMapping = {
        0: require('../assets/images/test5.png'),
        1: require('../assets/images/yellowCard.png'),
        2: require('../assets/images/blueCard.png'),
    };


    return (
        <View style={styles.container}>

            <View style={{ flex: 6, bottom: '8%' }}>
                {
                    show ? <CardInstruction show={show} category={category} controlInstructionScreens={controlInstructionScreens} cardIndex={cardIndex} />
                        : <Swiper
                            containerStyle={{ backgroundColor: 'transparent' }}
                            ref={deckRef}
                            cards={data}
                            disableLeftSwipe={!isFlipped}
                            disableRightSwipe={!isFlipped}
                            onSwiped={() => { setisFlipped(false) }}
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
                                        <View style={{
                                            backgroundColor: 'transparent', width: IMAGE_WIDTH * 1.02,
                                            height: IMAGE_WIDTH * aspectRatio * 1.025,
                                            borderRadius: BORDER_RADIUS,
                                        }}>

                                            <FlipCard
                                                flipHorizontal={true}
                                                flipVertical={false}

                                                flip={!false}
                                                onFlipStart={() => {
                                                    playSoundIfEnabled("flipcard");
                                                    setTimeout(() => {
                                                        setisFlipped(true);
                                                    }, 400);
                                                }}
                                            >
                                                <TouchableOpacity activeOpacity={1.0} style={[styles.card, styles.card1]}>
                                                    <View style={{ flex: 2, justifyContent: "flex-end", marginBottom: '10%' }}>
                                                        <Text style={{
                                                            textAlign: "left", fontSize: 20, paddingHorizontal: 25, color: "#650A11", fontWeight: 500, fontFamily: "Poppins-SemiBold"
                                                        }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry Q:{numbers.length ? numbers?.[index] : Math.floor(Math.random() * data.length)}.</Text>
                                                    </View>
                                                    <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", width: "100%" }}>
                                                        {index !== data.length - 1 ? <TouchableOpacity onPress={onShare}
                                                            style={{ justifyContent: "flex-end", width: '30%', height: "30%", alignItems: "center", marginBottom: "10%" }}>
                                                            <EvilIcons
                                                                name="share-apple"
                                                                size={RFValue(30)}
                                                                color="#877374"
                                                                style={{ marginBottom: '10%', fontWeight: 600 }}
                                                            />
                                                        </TouchableOpacity> :
                                                            <TouchableOpacity activeOpacity={1.0} style={[styles.card, styles.specialcard]}>

                                                                <View style={{ flex: 2, justifyContent: "flex-end", justifyContent: "space-between", marginBottom: '10%' }}>
                                                                    <Text style={{
                                                                        textAlign: "center", fontSize: 22, padding: 15, color: "#F4CFB9", fontFamily: 'Poppins-Bold'

                                                                    }}>Carte spéciale</Text>
                                                                    <Text style={{
                                                                        textAlign: "left", fontSize: 20, paddingHorizontal: 25, color: "#F4CFB9", fontFamily: "Poppins-SemiBold"
                                                                    }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                                                                </View>
                                                                <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", width: "100%" }}>
                                                                    <TouchableOpacity onPress={onShare}
                                                                        style={{ justifyContent: "flex-end", width: '30%', height: "30%", alignItems: "center", marginBottom: "10%" }}>
                                                                        <EvilIcons
                                                                            name="share-apple"
                                                                            size={RFValue(30)}
                                                                            color="#877374"
                                                                            style={{ marginBottom: '10%', fontWeight: 500 }}
                                                                        />
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </TouchableOpacity>
                                                        }
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{
                                                    elevation: 50, // Android shadow
                                                    shadowColor: 'black',
                                                    shadowOffset: { width: 0, height: 2 },
                                                    shadowOpacity: 0.2, // iOS shadow,
                                                    width: IMAGE_WIDTH1 - 2,
                                                    borderRadius: BORDER_RADIUS,
                                                    height: IMAGE_WIDTH1 * aspectRatio - 2,
                                                    justifyContent: "center", alignItems: "center", backgroundColor: category,
                                                    zIndex: 10
                                                }}>
                                                    <Image source={imageMapping[cardIndex]} style={{
                                                        width: IMAGE_WIDTH1,
                                                        height: IMAGE_WIDTH1 * aspectRatio,
                                                        borderRadius: BORDER_RADIUS,
                                                        borderWidth: 0.4,
                                                        borderColor: 'black'

                                                    }} />

                                                </View>
                                            </FlipCard>
                                        </View>

                                    </Animated.View>
                                );
                            }}
                            onSwipedLeft={(index) => sendDataToParent()}
                            onSwipedRight={(index) => sendDataToParent()}
                            onSwipedAll={() => { navigation.navigate('Results', { category: cardIndex, selectedColor: category }) }}
                            cardIndex={0}
                            stackSize={height / 1.67 < wWidth ? 2 : 3}
                            stackSeparation={40}
                            useViewOverflow={Platform.OS === 'ios'}
                            disableTopSwipe={true}
                            disableBottomSwipe={true}
                            stackScale={5}
                            infinite={level.LEVEL > 2 ? true : false}

                        />

                }
            </View>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {
                    !isFlipped ?
                        null
                        :
                        <NextButton showTwo={showTwo} onPress={swipeRight} onClose={closeButton} />
                }
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardo: {
        alignItems: 'center',


    },
    card: {
        width: IMAGE_WIDTH * 1.02,
        height: IMAGE_WIDTH * aspectRatio * 1.025,
        borderRadius: BORDER_RADIUS,
        elevation: 50, // Android shadow
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2, // iOS shadow

    },
    card1: {
        backgroundColor: "#F4CFB9",
        borderWidth: 0.5,
        borderColor: "black",
        alignItems: "center",
        elevation: 50, // Android shadow
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2, // iOS shadow

    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonContainer: {
        flex: 1.5,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#F4CFB9",
        height: RFValue(40),
        width: wWidth * 0.6,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        flexDirection: "row",
    },
    specialcard: {
        backgroundColor: "black",
        borderWidth: 2,
        borderColor: "#F4CFB9",
        alignItems: "center",
        elevation: 50,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,

    }
});

export default Tarot;
