import MainInput from "@/src/components/input/share.input";
import { useAppContext } from "@/src/context/app.context";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  SafeAreaView,
  Text,
  View,
} from "react-native";

const AccountPage = () => {
  const { profile } = useAppContext();
  const backend = "localhost:8080/"
  return (
    <SafeAreaView className="flex-1 mt-12">
      <View className="flex-1 flex  justify-center items-stretch p-4">
        <View className="mx-auto flex items-center">
          <View className="rounded-full w-[90px] h-[90px] flex items-center justify-center bg-[#FFC5294D]">
            <Image
              source={profile?.user.avatar as ImageSourcePropType | undefined}
              width={120}
              height={123}
              className="w-full h-full"
            ></Image>
          </View>
          <Text className="text-center text-[20px] font-semibold">
            {profile?.user.name || "username"}
          </Text>
        </View>
        <MainInput
          value={profile?.user.name || ""}
          label="Full name:"
          placeholder="Your full name"
          textStyle="text-gray-600 font-normal text-base"
          textInputStyle="border border-gray-300 rounded-[10px] p-4 focus:border-[#FE724C] transition-colors duration-700"
        ></MainInput>
        <MainInput
          value={profile?.user.email || ""}
          label="Email:"
          containerInputStyle="my-4"
          placeholder="Your email"
          textStyle="text-gray-600 font-normal text-base"
          textInputStyle="border border-gray-300 rounded-[10px] p-4 focus:border-[#FE724C] transition-colors duration-700"
        ></MainInput>
        <MainInput
          value={profile?.user.phone || ""}
          label="Phone number:"
          placeholder="Your phone number"
          textStyle="text-gray-600 font-normal text-base"
          textInputStyle="border border-gray-300 rounded-[10px] p-4 focus:border-[#FE724C] transition-colors duration-700"
        ></MainInput>
      </View>
    </SafeAreaView>
  );
};

export default AccountPage;
