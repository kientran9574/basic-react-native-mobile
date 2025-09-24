import line126 from "@/assets/images/auth/line-126.png";
import line127 from "@/assets/images/auth/line-127.png";
import line128 from "@/assets/images/auth/line-128.png";
import MainButton from "@/src/components/button/MainButton";
import SocialButton from "@/src/components/button/SocialButton";
import MainInput from "@/src/components/input/share.input";
import { useSignUpMutation } from "@/src/features/auth/hook";
import { ReigsterBody, reigsterSchema } from "@/src/schema/auth";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
const GoogleIcon = require("@/assets/images/google-icon.png");
const SignUp = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingRight: 4,
      paddingLeft: 4,
    },
    welcomHeading: {
      flex: 0.6,
      flexDirection: "column",
      justifyContent: "center",
      paddingTop: 160,
    },
    textWelcom: {
      color: "black",
      fontWeight: 700,
      fontFamily: "Roboto",
      fontSize: 53,
    },
    textFood: {
      color: "#fc3b13",
      fontWeight: 700,
      fontFamily: "Roboto",
      fontSize: 50,
    },
    textDes: {
      color: "#30384F",
      fontWeight: 400,
      fontFamily: "Roboto",
      marginTop: 19,
      fontSize: 18,
      width: 266,
      height: 54,
    },
    welcomBottom: {
      flex: 0.4,
      marginTop: 53,
    },
    welcomBottomSign: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 18,
    },
    welcomBottomLine: {
      width: 89,
      borderWidth: 1,
      borderColor: "gray",
      opacity: 0.4,
    },
  });
  const [isShowPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ReigsterBody>({
    resolver: zodResolver(reigsterSchema),
    defaultValues: { name: "", email: "", password: "" },
    // on validate realtime
    mode: "onChange",
  });
  const signInMutation = useSignUpMutation();
  const onSubmit = async (values: ReigsterBody) => {
    if (signInMutation.isPending) {
      Toast.show({
        type: "info",
        text1: "Wating",
        text2: "Please wating...",
      });
      return;
    }
    try {
      const result = await signInMutation.mutateAsync(values);
      if (result.data) {
        router.replace({
          pathname: "/(auth)/verify-code",
          params: {email: values.email}
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: Array.isArray(result.message)
            ? result.message[0]
            : result.message,
          text1Style: {
            color: "red",
            fontWeight: 700,
            fontSize: 14,
          },
          text2Style: {
            color: "black",
            fontWeight: 500,
            fontSize: 10,
          },
        });
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: JSON.stringify(error),
      });
    }
  };
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-7 relative">
        <Image source={line126} className="absolute top-1 left-0 "></Image>
        <Image source={line127} className="absolute top-0 left-0"></Image>
        <Image source={line128} className="absolute top-0 right-0"></Image>
        <View className="mt-[130px]">
          <View className="-mt-[30px]">
            <Text className="font-semibold text-[36px] ">Sign Up</Text>
          </View>
          {/* Full name */}
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <MainInput
                containerInputStyle="flex gap-2 mt-8"
                label="Full name"
                value={value}
                onChangeText={onChange}
                placeholder="Your full name"
                error={errors.name?.message}
                textStyle="text-gray-600 font-normal text-base"
                textInputStyle="border border-gray-300 rounded-[10px] px-5 py-5 focus:border-[#FE724C] transition-colors duration-700"
              ></MainInput>
            )}
          />
          {/* Email*/}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <MainInput
                containerInputStyle="flex gap-2 mt-7"
                label="Email"
                value={value}
                onChangeText={onChange}
                error={errors.email?.message}
                keyboardType="email-address"
                placeholder="you@example.com"
                textStyle="text-gray-600 font-normal text-base"
                textInputStyle="border border-gray-300 rounded-[10px] p-4 focus:border-[#FE724C] transition-colors duration-700"
              ></MainInput>
            )}
          />
          {/* Password */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <MainInput
                containerInputStyle="flex gap-2 mt-7"
                label="Password"
                value={value}
                onChangeText={onChange}
                placeholder="••••••"
                error={errors.password?.message}
                secureTextEntry={true}
                textStyle="text-gray-600 font-normal text-base relative "
                icon={
                  <FontAwesome5
                    name={isShowPassword ? "eye" : "eye-slash"}
                    size={16}
                    color="black"
                 
                    className="absolute right-4 top-5"
                    onPress={() => setShowPassword(!isShowPassword)}
                  />
                }
                isShowPassword={isShowPassword}
                textInputStyle="border border-gray-300 rounded-[10px] p-4 focus:border-[#FE724C] transition-colors duration-700"
              ></MainInput>
            )}
          />
          <MainButton
            onPress={handleSubmit(onSubmit)}
            containerBtnStyle="mt-10 w-[248px] h-[60px] mx-auto"
            pressStyle="py-6 px-4 rounded-[29px] bg-[#FE724C] active:opacity-60 w-full h-full"
            title="SIGN UP"
            textStyle="text-white text-center text-lg font-bold"
            disabled={isSubmitting}
          ></MainButton>
          <View className="flex-row items-center justify-center mt-8">
            <Text className="text-lg text-black font-semibold">
              Already have an account?
            </Text>
            <View className="ml-2">
              <Link href={"/(auth)/sign-in"}>
                <Text className="text-[#FE724C] font-bold text-lg">Login</Text>
              </Link>
            </View>
          </View>
          <View style={styles.welcomBottomSign} className="mt-[50px]">
            <View style={styles.welcomBottomLine}></View>
            <Text
              style={{
                color: "gray",
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              Sign in with
            </Text>
            <View style={styles.welcomBottomLine}></View>
          </View>
          <SocialButton
            imageIcon={GoogleIcon}
            icon={<Entypo name="facebook" size={24} color="#1877F2" />}
            containerBtnStyle="flex-row items-center justify-center gap-12 mt-6"
            pressStyle="py-4 px-2 w-[134px] h-[54px] justify-center bg-slate-300 rounded-[27.5px] flex-row gap-2 items-center active:opacity-55"
            textStyle="text-black font-semibold uppercase"
            imageStyle="size-6"
          ></SocialButton>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default SignUp;
