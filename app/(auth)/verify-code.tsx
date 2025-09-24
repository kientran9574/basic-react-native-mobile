import line126 from "@/assets/images/auth/line-126.png";
import line127 from "@/assets/images/auth/line-127.png";
import line128 from "@/assets/images/auth/line-128.png";
import LoadingOverlay from "@/src/components/loading/overlay";
import {
  useResendCodeMutation,
  useVerifyCodeMutation,
} from "@/src/features/auth/hook";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import { Image, Keyboard, Pressable, Text, View } from "react-native";
import OTPTextView from "react-native-otp-textinput";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
const VerifyCode = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [code, setCode] = useState("");
  const otpRef = useRef<OTPTextView>(null);
  const verifyMutation = useVerifyCodeMutation();
  const resendCodeMutation = useResendCodeMutation();
  const { email } = useLocalSearchParams();

  const handleAutoSubmit = useCallback(
    async (code: string) => {
      // tránh gọi khi đang loading
      if (verifyMutation.isPending) return;
      // → code phải 6 số, tránh gọi API khi chưa đủ
      if (code.length !== 6 || !/^\d{6}$/.test(code)) return;
      try {
        setIsSubmit(true);
        Keyboard.dismiss();
        const res = await verifyMutation.mutateAsync({ code, email } as {
          code: number | string;
          email: string;
        });
        if (res.data) {
          otpRef.current?.clear();
          setIsSubmit(false);
          Toast.show({
            type: "success",
            text1: "Success",
            text2: Array.isArray(res.data)
              ? res?.data?.message[0]
              : res.message,
            text1Style: {
              color: "grren",
              fontWeight: 700,
              fontSize: 14,
            },
            text2Style: {
              color: "black",
              fontWeight: 500,
              fontSize: 10,
            },
          });
          router.replace("/(auth)/sign-in");
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: Array.isArray(res.data)
              ? res?.data?.message[0]
              : res.message,
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
          text2: "internal server error",
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
    },
    [email, verifyMutation]
  );
  const onCodeChange = useCallback(
    (code: string) => {
      setCode(code);
      if (code.length === 6 && /^\d{6}$/.test(code)) {
        //void giúp fire-and-forget (bỏ đi giá trị trả về or kết quả (Promise) sẽ không được dùng nữa), không block UI
        void handleAutoSubmit(code);
      }
    },
    [handleAutoSubmit]
  );
  const handleResendCode = async () => {
    if (resendCodeMutation.isPending) return;
    console.log(email);
    try {
      const res = await resendCodeMutation.mutateAsync({ email });
      if (res.data) {
        otpRef.current?.clear();
        Toast.show({
          type: "success",
          text1: "Success",
          text2: Array.isArray(res.data) ? res?.data?.message[0] : res.message,
          text1Style: {
            color: "green",
            fontWeight: 700,
            fontSize: 14,
          },
          text2Style: {
            color: "black",
            fontWeight: 500,
            fontSize: 10,
          },
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: Array.isArray(res.data) ? res?.data?.message[0] : res.message,
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
        text2: "Internal Server Error",
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
  };
  // useEffect(() => {
  //   // tránh gọi khi đang loading
  //   if (verifyMutation.isPending) return;
  //   // → code phải 6 số, tránh gọi API khi chưa đủ
  //   if (code.length !== 6 || !/^\d{6}$/.test(code)) return;
  //   handleAutoSubmit();
  // }, [code, handleAutoSubmit, verifyMutation.isPending]);
  return (
    <>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 relative px-7">
          {/* Ảnh trang trí: không nhận touch + đẩy ra phía dưới nội dung */}
          <Image source={line126} className="absolute top-1 left-0 z-0" />
          <Image source={line127} className="absolute top-0 left-0 z-0" />
          <Image source={line128} className="absolute top-0 right-0 z-0" />

          {/* Lớp nội dung: nâng z-index để nằm trên ảnh */}
          <View className="mt-[180px]">
            <Text className="font-bold text-[36.5px]">Vefification Code</Text>
            <Text className="mt-[7px] font-normal text-sm text-[#9796A1] w-[289px] h-[38px]">
              Please type the verification code sent to prelookstudio@gmail.com
            </Text>
            <View className="mt-[31px]">
              <OTPTextView
                ref={otpRef}
                handleTextChange={onCodeChange}
                autoFocus
                inputCount={6}
                inputCellLength={1}
                tintColor={"#FE724C"}
                className="border !border-b-[1px] rounded-[10px] border-[#EEEEEE] !text-[#FE724C]"
              ></OTPTextView>
            </View>
            <View className="flex-row items-center justify-center mt-8">
              <Text className="font-medium text-base text-[#5B5B5E]">
                I don’t recevie a code!
              </Text>
              <View className="ml-2">
                <Pressable
                  className="active:opacity-80"
                  onPress={handleResendCode}
                >
                  <Text className="font-medium text-base text-[#FE724C] underline">
                    Please resend
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
      {isSubmit && <LoadingOverlay></LoadingOverlay>}
    </>
  );
};

export default VerifyCode;
