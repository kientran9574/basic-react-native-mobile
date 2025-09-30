import { useMeQuery } from "@/src/features/me/hook";
import { router } from "expo-router";

import { useAppContext } from "@/src/context/app.context";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import "../global.css";
const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
// dùng để hiển thị
SplashScreen.preventAutoHideAsync();
const RootPage = () => {
  const meQuery = useMeQuery();
  const { setProfile } = useAppContext();
  useEffect(() => {
    const prepare = async () => {
      try {
        const res = meQuery.data;
        if (res?.data) {
          setProfile(res.data);
          router.replace("/(tabs)");
        } else {
          router.replace("/(auth)/welcome");
        }
      } catch (error) {
        console.log(error);
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, [meQuery.data, setProfile]);
  // if(true) {
  //   return (
  //   <Redirect href="/(tabs)" />
  //   )
  // }
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default RootPage;
