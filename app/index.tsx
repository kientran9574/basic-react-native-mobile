import bg from "@/assets/images/auth/welcome-background.png";
import MainButton from "@/src/components/button/MainButton";
import SocialButton from "@/src/components/button/SocialButton";
import Entypo from "@expo/vector-icons/Entypo";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import "../global.css";
const GoogleIcon = require("../assets/images/google-icon.png");
const Welcom = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingRight: 4,
      paddingLeft: 4,
    },
    welcomHeading: {
      flex: 0.6,
      flexDirection: "column",
      justifyContent: "center",
      paddingTop: 160,
    },
    textWelcom: {
      color: "black",
      fontWeight: 700,
      fontFamily: "Roboto",
      fontSize: 53,
    },
    textFood: {
      color: "#fc3b13",
      fontWeight: 700,
      fontFamily: "Roboto",
      fontSize: 50,
    },
    textDes: {
      color: "#30384F",
      fontWeight: 400,
      fontFamily: "Roboto",
      marginTop: 19,
      fontSize: 18,
      width: 266,
      height: 54,
    },
    welcomBottom: {
      flex: 0.4,
      marginTop: 53,
    },
    welcomBottomSign: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 18,
    },
    welcomBottomLine: {
      width: 89,
      borderWidth: 1,
      borderColor: "gray",
      opacity: 0.4,
    },
  });
  // if(true) {
  //   return (
  //   <Redirect href="/(auth)/sign-in" />
  //   )
  // }
  return (
    <ImageBackground source={bg} className="flex-1">
      <LinearGradient
        colors={["#494D6300", "#191B2F"]}
        locations={[0, 1]}
        className="flex-1"
      >
        <View style={styles.container}>
          <View style={styles.welcomHeading}>
            <Text style={styles.textWelcom}>Welcome to</Text>
            <Text style={styles.textFood}>FoodKing</Text>
            <Text style={styles.textDes}>
              Your favourite foods delivered fast at your door.
            </Text>
          </View>
          <View style={styles.welcomBottom}>
            <View style={styles.welcomBottomSign}>
              <View style={styles.welcomBottomLine}></View>
              <Text
                style={{
                  color: "white",
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                Sign in with
              </Text>
              <View style={styles.welcomBottomLine}></View>
            </View>
            <SocialButton
              imageIcon={GoogleIcon}
              icon={<Entypo name="facebook" size={24} color="#1877F2" />}
              containerBtnStyle="flex-row items-center justify-center gap-12 mt-8"
              pressStyle="py-4 px-2 w-[134px] h-[54px] justify-center bg-white rounded-[27.5px] flex-row gap-2 items-center active:opacity-55"
              textStyle="text-black font-semibold uppercase"
              imageStyle="size-6"
            ></SocialButton>
            <MainButton
              containerBtnStyle="flex-row items-center justify-center mt-6"
              pressStyle="w-[315px] h-[54px] py-4 px-2 rounded-[27.5px] border border-[#FFFFFF] bg-[#535463]  active:opacity-55"
              textStyle="text-center text-white text-lg font-extrabold font-bold"
              title="Start with your email"
            ></MainButton>
            <View className="flex-row items-center justify-center mt-6">
              <Text className="text-base leading-[10px] text-white font-bold">
                Already have an account?
              </Text>
              <View className="ml-2">
                <Link href={"/(auth)/sign-up"}>
                  <Text className="text-white font-bold">Sign In</Text>
                </Link>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default Welcom;
