import APP_COLORS from "@/src/constants/Colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Pressable, Text, View } from "react-native";
interface IProps {
  menuItem: IMenuItem;
}
const ItemOrder = ({ menuItem }: IProps) => {
  return (
    <View className="items-center justify-center">
      <Pressable
        className={`size-6 bg-[${APP_COLORS.GREY}] items-center justify-center`}
      >
        <MaterialIcons name="remove" size={24} color="white" />
      </Pressable>
      <View className="mx-2">
        <Text>ItemOrder</Text>
      </View>
      <Pressable
        className={`size-6 bg-[${APP_COLORS.ORANGE}] items-center justify-center`}
      >
        <FontAwesome6 name="add" size={16} color={`white`} />
      </Pressable>
    </View>
  );
};

export default ItemOrder;
