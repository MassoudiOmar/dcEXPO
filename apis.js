import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


let url = "https://trusting-babbage.41-231-54-163.plesk.page/api"

const getQuestionsOfCategory = (id) => {
  axios
    .get(
      `https://trusting-babbage.41-231-54-163.plesk.page/api/cards/show/${id}`
    )
    .then((res) => {
      return res.data.question.en;
    })
    .catch((err) => {
      console.log(err, "getQuestionsOfCategory");
    });
};

const getCategories = (setState, state) => {
  axios
    .get(
      `${url}/packs`
    )
    .then((res) => {
      setState(...state, res.data);
    })
    .catch((err) => {
      console.log(err, "getQuestionsOfCategory");
    });
};


const indexPerPack = (id) => {
  axios
    .get(
      `https://trusting-babbage.41-231-54-163.plesk.page/api/cards/${id}`
    )
    .then((res) => {
      return res.data.question.en;
    })
    .catch((err) => {
      console.log(err, "getQuestionsOfCategory");
    });
};


let checkFirstVisit = async (screen, setState, state) => {
  try {
    const checkScreen = await AsyncStorage.getItem(screen);
    if (checkScreen) {
      return
    }
    else {
      setState({ ...state, first: true, second: false, third: false })
    }
  } catch (error) {
    console.error('Error fetching language from AsyncStorage:', error);
  }
}

export default checkFirstVisit;
