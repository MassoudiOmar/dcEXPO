import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    TextInput,
    ImageBackground,
    ScrollViewComponent
} from "react-native";
import Stars from "react-native-stars";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import line from "../assets/images/lines.png";

import { useRoute } from "@react-navigation/native";

const Avis = ({ navigation }) => {
    const { t } = useTranslation();

    const route = useRoute();
    const { selectedColor, startTime, childData ,index} = route.params;

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <ImageBackground
                    source={line}
                    style={[
                        styles.imageBackground,
                        {
                            backgroundColor:
                                selectedColor
                        },
                    ]}
                >
                    <View style={styles.container1}>
                        <Text
                            style={{
                                color: "#F4CFB9",
                                fontSize: 20,
                                margin: 5,
                                fontWeight: 600,
                            }}
                        >
                            DeepConnect
                        </Text>
                        <View style={styles.innerContainer}>
                            <View style={{ width: "90%" }}>
                                <Text
                                    style={{
                                        color: "#650A11",
                                        fontSize: 25,
                                        fontWeight: 800,
                                    }}
                                >
                                    {t("Help")}
                                </Text>
                            </View>
                            <View style={{ width: "90%" }}>
                                <TextInput
                                    placeholder={t("Placeholderone")}
                                    placeholderTextColor={"#650A11"}
                                    style={styles.input}
                                    underlineColorAndroid="transparent"
                                />
                                <TextInput
                                    placeholder={t("Placeholdertwo")}
                                    placeholderTextColor={"#650A11"}
                                    style={styles.input}
                                    underlineColorAndroid="transparent"
                                />
                                <TextInput
                                    placeholder={`${t("Placeholderthreepartone")}\n${t(
                                        "Placeholderthreeparttwo"
                                    )}`}
                                    placeholderTextColor={"#650A11"}
                                    style={styles.textInput}
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                            <Stars
                                rating={5}
                                count={5}
                                half={!true}
                                fullStar={
                                    <Icon name={"star"} style={[styles.myStarStyle]} />
                                }
                                emptyStar={
                                    <Icon
                                        name={"star-outline"}
                                        style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                                    />
                                }
                                halfStar={
                                    <Icon name={"star-half"} style={[styles.myStarStyle]} />
                                }
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("Menu", {
                                    startTime,
                                    childData,
                                    selectedColor,
                                    index
                                })
                            }
                            style={[styles.goback, { backgroundColor: "#650A11" }]}
                        >
                            <Text
                                style={{ color: "#F4CFB9", fontWeight: 500, fontSize: 22 }}
                            >
                                {t("Remind")}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.goback}>
                            <Text style={{ color: "#650A11", fontWeight: 600, fontSize: 22 }}>
                                {t("Done")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#650A11",
    },
    container1: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imageBackground: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        backgroundColor: "#562024",
    },
    scrollViewContent: {
        flex: 1
    },
    input: {
        width: "100%",
        borderBottomColor: "#650A11",
        borderBottomWidth: 1.5,
        fontSize: 16,
        marginVertical: 7,
    },
    textInput: {
        width: "100%",
        height: 80,
        borderBottomColor: "#650A11",
        borderBottomWidth: 1.5,
        fontSize: 16,
        marginVertical: 7,
    },
    innerContainer: {
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#F4CFB9",
        width: "80%",
        height: 500,
        borderRadius: 30,
        borderWidth: 2,
    },
    goback: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F4CFB9",
        width: "80%",
        height: 50,
        borderRadius: 20,
        borderWidth: 1,
        marginTop: 10,
    },
    myStarStyle: {
        color: "#650A11",
        fontSize: 55,
    },
    myEmptyStarStyle: {
        color: "#650A11",
    },
});
export default Avis;
