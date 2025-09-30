import React, { ReactNode } from "react";
import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";

interface IProps {
  label?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  secureTextEntry?: boolean;
  textStyle?: string;
  textInputStyle?: string;
  containerInputStyle?: string;
  icon?: ReactNode;
  isShowPassword?: boolean;
  error?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (value: string) => void;
  defaultValue?: string | undefined;
}
const MainInput = ({
  label,
  keyboardType,
  secureTextEntry = false,
  textStyle,
  textInputStyle,
  containerInputStyle,
  icon,
  isShowPassword,
  error,
  value,
  onChangeText,
  placeholder,
  defaultValue,
}: IProps) => {
  return (
    <View className={`${containerInputStyle} ${error ? "border-red-500" : ""}`}>
      {label && <Text className={textStyle}>{label}</Text>}
      <View>
        <TextInput
          defaultValue={defaultValue}
          className={textInputStyle}
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry && !isShowPassword}
        ></TextInput>
        {icon && icon}
      </View>

      {error ? <Text className="text-red-500">{error}</Text> : null}
    </View>
  );
};

export default MainInput;
