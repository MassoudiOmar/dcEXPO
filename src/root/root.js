import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Categories from "../components/Categories";
import Questions from "../components/Questions";
import Menu from "../components/Menu";
import Results from "../components/results";
import Setting from "../components/Setting";
import Rules from "../components/Rules";
import Avis from "../components/Avis";

const Stack = createStackNavigator();

function Root() {
  const forFade = ({ current, closing }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen
          options={{ headerShown: false, headerLeft: null, cardStyleInterpolator: forFade }}
          name="Categories"
          component={Categories}
        />
        <Stack.Screen
          options={{ headerShown: false, headerLeft: null, cardStyleInterpolator: forFade }}
          name="Questions"
          component={Questions}
        />
        <Stack.Screen
          options={{ headerShown: false, headerLeft: null, cardStyleInterpolator: forFade }}
          name="Menu"
          component={Menu}
        />
        <Stack.Screen
          options={{ headerShown: false, headerLeft: null, cardStyleInterpolator: forFade }}
          name="Results"
          component={Results}
        />
        <Stack.Screen
          options={{ headerShown: false, headerLeft: null, cardStyleInterpolator: forFade }}
          name="Rules"
          component={Rules}
        />
        <Stack.Screen
          options={{ headerShown: false, headerLeft: null, cardStyleInterpolator: forFade }}
          name="Setting"
          component={Setting}
        />
        <Stack.Screen
          options={{ headerShown: false, headerLeft: null, cardStyleInterpolator: forFade }}
          name="Avis"
          component={Avis}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Root;
