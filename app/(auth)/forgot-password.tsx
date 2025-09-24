import line126 from "@/assets/images/auth/line-126.png";
import line127 from "@/assets/images/auth/line-127.png";
import line128 from "@/assets/images/auth/line-128.png";
import React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const ForgotPasswordPage = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-7 relative">
        <Image source={line126} className="absolute top-1 left-0 "></Image>
        <Image source={line127} className="absolute top-0 left-0"></Image>
        <Image source={line128} className="absolute top-0 right-0"></Image>
        <View className="mt-16">
          <Text>Forgot pasword</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordPage;
