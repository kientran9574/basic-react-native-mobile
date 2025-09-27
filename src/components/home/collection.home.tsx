import React from "react";
import { Text, View } from "react-native";

interface IProps {
  name?: string;
  api?: string;
}
const CollectionHome = ({ name }: IProps) => {
  return (
    <View className="w-full h-[250px] border border-green-500 mb-4 py-3 pl-2">
      <Text>{name}</Text>
    </View>
  );
};

export default CollectionHome;
