import APP_COLORS from "@/src/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Pressable, Text, View } from "react-native";
const StickyOrder = () => {
  return (
    <View className="absolute bottom-0 flex-row w-full z-20 items-center justify-center">
      <View className="absolute left-10 top-2 size-4 rounded-full bg-[#FE724C] items-center justify-center">
        <Text className="text-white">10</Text>
      </View>
      <Pressable onPress={() => alert("hehehe")}>
        <Feather
          name="shopping-cart"
          size={24}
          color={`${APP_COLORS.ORANGE}`}
        />
      </Pressable>
      <View className="">
        <Text className="text-3xl text-[#FE724C]">155.000đ</Text>
        <Pressable className="bg-[#FE724C] px-5 py-2">
          <Text className="text-center text-white">Giao hàng</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default StickyOrder;
