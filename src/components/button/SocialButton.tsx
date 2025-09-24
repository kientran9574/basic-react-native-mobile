import { IButtonProps } from "@/src/types/button.types";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

const SocialButton = ({
  containerBtnStyle,
  textStyle,
  title,
  pressStyle,
  icon,
  imageIcon,
  imageStyle,
}: IButtonProps) => {
  return (
    <View className={containerBtnStyle}>
      <Pressable className={pressStyle}>
        {icon}
        <Text className={textStyle}>FACEBOOK</Text>
      </Pressable>
      <Pressable className={pressStyle}>
        <Image source={imageIcon} className={imageStyle} />
        <Text className="text-black font-semibold uppercase">GOOGLE</Text>
      </Pressable>
    </View>
  );
};

export default SocialButton;
