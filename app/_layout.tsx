import { persister, queryClient } from "@/src/api/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Stack } from "expo-router";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
export default function RootLayout() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <QueryClientProvider client={queryClient}>
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
          <Stack.Screen name="+not-found" />
        </Stack>
        <Toast />
      </QueryClientProvider>
    </PersistQueryClientProvider>
  );
}
