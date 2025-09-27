import { persister, queryClient } from "@/src/api/client";
import { DefaultTheme, ThemeProvider, DarkTheme } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Stack } from "expo-router";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
export default function RootLayout() {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "transparent",
    },
  };
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <QueryClientProvider client={queryClient}>
        {/* 
        Dùng component ThemeProvider để chỉnh sửa màu sắc toàn bộ màn hình Stack, Tabs mà không cần phải chỉnh sửa từng nơi
        */}
        <ThemeProvider value={navTheme} >
          <Stack>
            <Stack.Screen 
              name="index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(auth)/sign-up"
              options={{
                headerTitle: "Sign Up",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(auth)/sign-in"
              options={{
                headerTitle: "Sign In",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(auth)/verify-code"
              options={{
                headerTitle: "Verify Code",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(auth)/forgot-password"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>

        <Toast />
      </QueryClientProvider>
    </PersistQueryClientProvider>
  );
}
