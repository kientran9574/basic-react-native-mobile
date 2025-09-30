import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Text, View } from "react-native";
const SearchHome = () => {
  return (
    <View className="bg-blue-500 w-full mb-2 overflow-hidden">
      <Text>Address </Text>
      <View className="w-full h-[38px] bg-slate-200 shadow flex-row items-center p-2 gap-4 border-none ouline-none  rounded-3xl overflow-hidden">
        <Feather name="search" size={18} color="black" />
        <Text>Deal hot hom nay </Text>
      </View>
    </View>
  );
};
export default SearchHome;
