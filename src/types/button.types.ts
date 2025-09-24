import { ReactNode } from "react";
import { ImageSourcePropType } from "react-native";

export interface IButtonProps {
  onPress?: () => void;
  title?: string;
  textStyle?: string;
  containerBtnStyle?: string;
  pressStyle?: string;
  icon?: ReactNode;
  imageIcon?: ImageSourcePropType | undefined;
  imageStyle?: string;
  disabled?: boolean;
  loading?: boolean;
}
