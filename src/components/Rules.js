import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import line from "../assets/images/lines.png";

const Rules = ({ navigation }) => {
  const [appLangue, setAppLangue] = useState('en')
  async function getLanguage() {
    try {
      const languageKey = 'language';
      const language = await AsyncStorage.getItem(languageKey);

      if (language !== null) {
        setAppLangue(language)
      } else {
        setAppLangue('en')
      }
    } catch (error) {
      console.error('Error reading language key from AsyncStorage:', error);
      or
    }
  }
  useEffect(() => {
    getLanguage()
  }, [])
  const route = useRoute();
  const { selectedColor, startTime, childData,index } = route.params;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={line}
        style={[styles.imageBackground, { backgroundColor: selectedColor}]}
      >
        <ScrollView>
          <View style={styles.container1}>
            <Text style={{
              color: "#F4CFB9", fontSize: 16, textAlign: "left", fontFamily: 'Poppins-Regular'
            }}>
              {appLangue === 'fr' ?
                <>
                  <Text style={{ fontFamily: "Poppins-Bold", fontSize: 18 }}>

                    Règles du jeu {'\n'}{'\n'}
                  </Text>
                  <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18 }}>

                    Comment jouer :{'\n'}{'\n'}
                  </Text>
                  1. Le premier joueur tire une carte et lit la question à haute voix.{'\n'}
                  2. Chaque joueur répond à son tour à la question.{'\n'}
                  3. Prenez le temps de discuter des réponses pour approfondir votre
                  compréhension mutuelle.{'\n'} {'\n'}

                  Les joueurs peuvent également alterner tour à tour entre poser les questions et
                  y répondre.{'\n'} {'\n'}
                  Le jeu se termine lorsque vous avez parcouru les trois niveaux ou lorsque vous
                  décidez de conclure la session. Prenez un moment pour réfléchir ensemble sur
                  l'expérience partagée.{'\n'} {'\n'}
                  <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18 }}>

                    Niveaux de Questions{'\n'}
                  </Text>
                  Chaque catégorie contient trois niveaux de profondeur :{'\n'} {'\n'}
                  <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18 }}>
                    ● Niveau 1 : Surface
                  </Text>{'\n'}
                  Questions pour aborder la surface de nos
                  personnalités.{'\n'}
                  <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18 }}>


                    ● Niveau 2 : Coeur
                  </Text>{'\n'}
                  Questions pensées pour dépasser les apparences
                  et découvrir qui vous êtes réellement{'\n'}
                  <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18 }}>

                    ● Niveau 3 : Miroir
                  </Text>{'\n'}
                  Questions conçues pour faire le point sur la
                  conversation et assimiler les découvertes personnelles.{'\n'} {'\n'}
                  <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18 }}>

                    Cartes Spéciales
                  </Text>{'\n'}
                  ● Certaines cartes déclenchent des actions amusantes ou des défis à
                  réaliser ensemble, renforçant votre connexion.{'\n'}{'\n'}
                  <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18 }}>

                    Conseils pour une meilleure expérience :
                  </Text>{'\n'}
                  ● Soyez honnête dans vos réponses pour des conversations
                  authentiques.{'\n'}
                  ● Respectez la parole de chacun et écoutez sans jugement.{'\n'}
                  ● Engagez-vous dans les actions ou les défis proposés avec
                  enthousiasme.{'\n'}
                  ● Utilisez DeepConnect dans un environnement calme et confortable
                  pour une expérience optimale.{'\n'} {'\n'}
                  <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18 }}>

                    Si vous jouez avec un groupe de plus de 2 personnes :
                  </Text>{'\n'}
                  ● Un seul téléphone suffit pour le groupe. Assurez-vous que tout le
                  monde peut voir l'écran confortablement.{'\n'}
                  ● Le téléphone passe de main en main. Le joueur qui tient le téléphone
                  tire une carte et lit la question à haute voix.{'\n'}
                  ● Chaque participant répond à la question dans l'ordre. Encouragez
                  l'écoute active et le respect des tours de parole.{'\n'} {'\n'}
                  <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18 }}>

                    Cartes spéciales et actions de groupe
                  </Text>{'\n'}
                  ● Si une carte spéciale est tirée, engagez le groupe dans l'action ou le
                  défi. Adaptez les instructions pour le nombre de participants si
                  nécessaire.{'\n'} {'\n'}
                  <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18 }}>

                    Avancement
                  </Text>{'\n'}
                  ● Continuez à faire circuler le téléphone et à répondre aux questions.
                  Vous pouvez décider de combien de cartes par niveau vous souhaitez
                  utiliser, selon le temps disponible et l'intérêt du groupe.{'\n'} {'\n'}
                  <Text style={{ fontFamily: "Poppins-SemiBold" }}>

                    Rappelez-vous que le but de DeepConnect est de renforcer les liens et de
                    favoriser les échanges authentiques, donc l'important est de participer de
                    manière ouverte et sincère, que vous jouiez à deux ou en groupe.
                  </Text>
                </> :
                <>

                  <Text style={{ fontFamily: "Poppins-Bold", fontSize: 18 }}>


                    Game Rules
                  </Text>
                  {'\n'}{'\n'}
                  <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18 }}>

                    How to Play:{'\n'}
                  </Text>
                  1. The first player draws a card and reads the question out loud.{'\n'}
                  2. Each player takes turns answering the question.{'\n'}
                  3. Take time to discuss the responses to deepen mutual understanding.{'\n'}{'\n'}
                  Players can also alternate taking turns asking and answering questions.{'\n'}{'\n'}
                  The game ends when you have gone through all three levels or when you
                  decide to conclude the session. Take a moment to reflect together on the
                  shared experience.{'\n'}{'\n'}
                  <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18 }}>

                    Levels of Questions{'\n'}
                  </Text>
                  Each category contains three levels of depth:{'\n'}{'\n'}
                  <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18 }}>

                    ● Level 1: Surface
                  </Text>{'\n'}
                  Questions to touch on the surface of our
                  personalities.{'\n'}
                  <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18 }}>

                    ● Level 2: Heart
                  </Text>{'\n'}
                  Questions designed to go beyond appearances and
                  discover who you really are.{'\n'}
                  <Text style={{ fontFamily: "Poppins-SemiBold" }}>

                    ● Level 3: Mirror
                  </Text>{'\n'}
                  Questions crafted to reflect on the conversation and
                  assimilate personal discoveries.{'\n'}{'\n'}
                  <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18 }}>

                    Special Cards{'\n'}
                  </Text>
                  ● Some cards trigger fun actions or challenges to complete together,
                  strengthening your connection.{'\n'}{'\n'}
                  <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18 }}>

                    Tips for a Better Experience:{'\n'}
                  </Text>
                  ● Be honest in your answers for authentic conversations.{'\n'}
                  ● Respect everyone's speech and listen without judgment.{'\n'}
                  ● Commit enthusiastically to the proposed actions or challenges.{'\n'}
                  ● Use DeepConnect in a quiet and comfortable environment for an
                  optimal experience.{'\n'}{'\n'}
                  <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18 }}>

                    If you are playing with a group of more than 2 people:{'\n'}
                  </Text>
                  ● A single phone is sufficient for the group. Ensure everyone can
                  comfortably see the screen.{'\n'}
                  ● Pass the phone around. The player holding the phone draws a card
                  and reads the question out loud.{'\n'}
                  ● Each participant answers the question in turn. Encourage active
                  listening and respect for speaking turns.{'\n'}{'\n'}
                  <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18 }}>

                    Special Cards and Group Actions{'\n'}
                  </Text>
                  ● If a special card is drawn, get the group involved in the action or
                  challenge. Adjust the instructions for the number of participants if
                  necessary.{'\n'}{'\n'}
                  <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18 }}>

                    Progress{'\n'}
                  </Text>
                  ● Continue to pass the phone around and answer the questions. You can
                  decide how many cards per level to use, depending on the available
                  time and the group's interest.{'\n'}{'\n'}
                  <Text style={{ fontFamily: "Poppins-SemiBold" }}>

                    Remember, the goal of DeepConnect is to strengthen bonds and
                    encourage authentic exchanges, so the important thing is to participate
                    openly and sincerely, whether you are playing in pairs or as a group.
                  </Text>
                </>
              }
            </Text>
            <TouchableOpacity style={styles.goback}>
              <MaterialIcons
                name="arrow-back"
                size={40}
                style={[styles.icons, { color: "#650A11" }]}
                onPress={() => navigation.navigate('Menu', { startTime, childData, selectedColor,index })}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    flex: 1,
    alignItems: "center",
    margin: 25
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: "#562024",
  },
  goback: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4CFB9",
    width: "25%",
    height: "2.5%",
    borderRadius: 40,
    borderWidth: 2,
    marginTop: 10
  }
});

export default Rules;
