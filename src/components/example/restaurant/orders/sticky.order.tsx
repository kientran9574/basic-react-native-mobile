import APP_COLORS from "@/src/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Pressable, Text, View } from "react-native";
const StickyOrder = () => {
  return (
    <View className="absolute bottom-0 flex-row w-full z-20">
      <View className="bg-slate-50 w-full flex-row items-center justify-between py-2">
        <View className="absolute left-[38px] top-1 size-6 rounded-full bg-[#FE724C] items-center justify-center">
          <Text className="text-white text-sm font-extrabold">10</Text>
        </View>
        <Pressable onPress={() => alert("hehehe")} className="ml-3 mt-2">
          <Feather
            name="shopping-cart"
            size={30}
            color={`${APP_COLORS.ORANGE}`}
          />
        </Pressable>
        <View className="flex-row items-center justify-center gap-3">
          <Text className="text-2xl text-[#FE724C]">155.000đ</Text>
          <Pressable className="bg-[#FE724C] px-6 py-3" onPress={() => alert("eheheh")}>
            <Text className="text-center text-white">Giao hàng</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default StickyOrder;
