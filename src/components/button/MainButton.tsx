import { IButtonProps } from "@/src/types/button.types";
import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

const MainButton = ({
  containerBtnStyle,
  textStyle,
  title,
  pressStyle,
  icon,
  disabled,
  loading,
  onPress,
}: IButtonProps) => {
  return (
    <View className={containerBtnStyle}>
      <Pressable
        className={`${pressStyle} ${loading ? "opacity-80 pointer-events-none" : "opacity-100"}`}
        disabled={disabled}
        onPress={onPress}
      >
        <View className="flex-row items-center justify-center gap-2">
          {loading && <ActivityIndicator />}
          {icon}
          <Text className={textStyle}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default MainButton;
